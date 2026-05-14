"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fbfbfd] px-6">
      <div className="w-full max-w-[420px]">
        <h1 className="text-[40px] font-semibold tracking-tight text-[#1d1d1f] text-center mb-2">
          로그인
        </h1>
        <p className="text-[17px] text-[#86868b] text-center mb-12">
          공시 알람을 받아보세요
        </p>

        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-white border border-[#d2d2d7] rounded-xl px-4 py-3.5 text-[17px] text-[#1d1d1f] placeholder:text-[#86868b] focus:outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/20 transition"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-white border border-[#d2d2d7] rounded-xl px-4 py-3.5 text-[17px] text-[#1d1d1f] placeholder:text-[#86868b] focus:outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/20 transition"
          />

          {error && (
            <p className="text-[13px] text-[#bf4800] bg-[#fff4e5] px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-[17px] font-medium py-3.5 rounded-xl transition disabled:opacity-50"
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <p className="text-center text-[14px] text-[#86868b] mt-8">
          계정이 없으신가요?{" "}
          <a href="/signup" className="text-[#0071e3] hover:underline">
            회원가입
          </a>
        </p>
      </div>
    </div>
  );
}
