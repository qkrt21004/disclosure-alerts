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

  async function handleSearch(q: string) {
    setSearch(q);
    if (q.length < 1) { setSearchResults([]); return; }
    const { data } = await supabase
      .from("companies")
      .select("id, ticker, name, country")
      .or(`ticker.ilike.%${q}%,name.ilike.%${q}%`)
      .limit(10);
    setSearchResults(data ?? []);
  }

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

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-600">로딩 중...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">📋 공시 알람</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{email}</span>
          <button onClick={handleLogout} className="text-sm text-red-500 hover:underline">
            로그아웃
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="종목 검색 (예: AAPL, Apple)"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchResults.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border rounded-lg mt-1 shadow-lg">
              {searchResults.map((c) => (
                <li
                  key={c.id}
                  onClick={() => subscribe(c)}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex justify-between"
                >
                  <span className="font-medium text-gray-900">{c.ticker}</span>
                  <span className="text-gray-500 text-sm">{c.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <h2 className="text-lg font-semibold mb-4 text-gray-900">
          팔로우 중 ({subscriptions.length}개)
        </h2>
        {subscriptions.length === 0 ? (
          <p className="text-gray-400 text-center py-12">
            위에서 종목을 검색해 팔로우하세요
          </p>
        ) : (
          <ul className="space-y-2">
            {subscriptions.map((s) => (
              <li
                key={s.company_id}
                className="bg-white rounded-lg border px-4 py-3 flex justify-between items-center"
              >
                <div>
                  <span className="font-medium text-gray-900">{s.companies.ticker}</span>
                  <span className="text-gray-500 text-sm ml-2">{s.companies.name}</span>
                </div>
                <button
                  onClick={() => unsubscribe(s.company_id)}
                  className="text-red-400 hover:text-red-600 text-sm"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
