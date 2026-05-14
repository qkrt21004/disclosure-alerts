"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Company = {
  id: number;
  ticker: string;
  name: string;
  country: string;
};

type Subscription = {
  company_id: number;
  companies: Company;
};

export default function DashboardPage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [email, setEmail] = useState("");
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setEmail(user.email ?? "");

      const { data } = await supabase
        .from("subscriptions")
        .select("company_id, companies(id, ticker, name, country)")
        .eq("user_id", user.id);
      setSubscriptions((data as unknown as Subscription[]) ?? []);
      setLoading(false);
    }
    load();
  }, [router, supabase]);

  useEffect(() => {
    if (search.length < 1) { setSearchResults([]); return; }
    const t = setTimeout(async () => {
      const { data } = await supabase.rpc("search_companies", { q: search });
      setSearchResults((data as Company[]) ?? []);
    }, 200);
    return () => clearTimeout(t);
  }, [search, supabase]);

  async function subscribe(company: Company) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("subscriptions").upsert({
      user_id: user.id,
      company_id: company.id,
    });
    setSubscriptions((prev) => [...prev, { company_id: company.id, companies: company }]);
    setSearch("");
    setSearchResults([]);
  }

  async function unsubscribe(companyId: number) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("subscriptions")
      .delete()
      .eq("user_id", user.id)
      .eq("company_id", companyId);
    setSubscriptions((prev) => prev.filter((s) => s.company_id !== companyId));
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fbfbfd]">
        <div className="text-[#86868b] text-[15px]">로딩 중...</div>
      </div>
    );
  }

  const isFollowing = (id: number) => subscriptions.some(s => s.company_id === id);

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      {/* Top nav */}
      <header className="sticky top-0 z-20 bg-[#fbfbfd]/80 backdrop-blur-xl border-b border-[#d2d2d7]/50">
        <div className="max-w-[980px] mx-auto px-6 h-12 flex justify-between items-center">
          <h1 className="text-[17px] font-semibold tracking-tight text-[#1d1d1f]">
            공시 알람
          </h1>
          <div className="flex items-center gap-5 text-[13px]">
            <span className="text-[#86868b]">{email}</span>
            <button
              onClick={handleLogout}
              className="text-[#0071e3] hover:underline"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[680px] mx-auto px-6 pt-16 pb-24">
        {/* Hero */}
        <div className="text-center mb-12">
          <h2 className="text-[48px] leading-[1.08] font-semibold tracking-tight text-[#1d1d1f] mb-3">
            팔로우할 기업을<br />검색해보세요
          </h2>
          <p className="text-[19px] text-[#86868b]">
            10,000개 이상의 미국 상장사 공시를 한 곳에서.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-12">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86868b]"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="종목 검색 (예: AAPL, Apple)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-[#d2d2d7] rounded-2xl pl-12 pr-4 py-4 text-[17px] text-[#1d1d1f] placeholder:text-[#86868b] focus:outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/20 transition shadow-sm"
            />
          </div>
          {searchResults.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-[#d2d2d7] rounded-2xl mt-2 shadow-xl overflow-hidden">
              {searchResults.map((c) => {
                const following = isFollowing(c.id);
                return (
                  <li
                    key={c.id}
                    onClick={() => !following && subscribe(c)}
                    className={`px-5 py-3.5 border-b border-[#f2f2f3] last:border-0 flex justify-between items-center ${
                      following ? "opacity-50 cursor-default" : "cursor-pointer hover:bg-[#f5f5f7]"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-[15px] font-semibold text-[#1d1d1f]">{c.ticker}</div>
                      <div className="text-[13px] text-[#86868b] truncate">{c.name}</div>
                    </div>
                    {following ? (
                      <span className="text-[12px] text-[#86868b] ml-3">팔로우 중</span>
                    ) : (
                      <span className="text-[13px] text-[#0071e3] font-medium ml-3">+ 팔로우</span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Following list */}
        <section>
          <div className="flex items-baseline justify-between mb-4">
            <h3 className="text-[22px] font-semibold tracking-tight text-[#1d1d1f]">
              팔로우 중
            </h3>
            <span className="text-[13px] text-[#86868b]">
              {subscriptions.length}개
            </span>
          </div>

          {subscriptions.length === 0 ? (
            <div className="bg-white border border-[#d2d2d7] rounded-2xl py-16 text-center">
              <p className="text-[15px] text-[#86868b]">
                위에서 종목을 검색해 팔로우하세요
              </p>
            </div>
          ) : (
            <ul className="bg-white border border-[#d2d2d7] rounded-2xl overflow-hidden">
              {subscriptions.map((s) => (
                <li
                  key={s.company_id}
                  className="px-5 py-4 border-b border-[#f2f2f3] last:border-0 flex justify-between items-center group"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-[15px] font-semibold text-[#1d1d1f]">{s.companies.ticker}</div>
                    <div className="text-[13px] text-[#86868b] truncate">{s.companies.name}</div>
                  </div>
                  <button
                    onClick={() => unsubscribe(s.company_id)}
                    className="text-[13px] text-[#86868b] hover:text-[#bf4800] ml-3 opacity-0 group-hover:opacity-100 transition"
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
