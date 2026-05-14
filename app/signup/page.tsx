"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [supabase] = useState(() => createClient());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setDone(true);
    }
  }

  if (done) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fbfbfd] px-6">
        <div className="w-full max-w-[420px] text-center">
          <div className="w-16 h-16 rounded-full bg-[#0071e3]/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-[#0071e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-[32px] font-semibold tracking-tight text-[#1d1d1f] mb-3">
            가입 완료
          </h1>
          <p className="text-[17px] text-[#86868b]">
            <span className="text-[#1d1d1f]">{email}</span>로<br />
            로그인할 수 있습니다.
          </p>
          <a
            href="/login"
            className="inline-block mt-8 bg-[#0071e3] hover:bg-[#0077ed] text-white text-[17px] font-medium px-8 py-3.5 rounded-xl transition"
          >
            로그인하기
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fbfbfd] px-6">
      <div className="w-full max-w-[420px]">
        <h1 className="text-[40px] font-semibold tracking-tight text-[#1d1d1f] text-center mb-2">
          회원가입
        </h1>
        <p className="text-[17px] text-[#86868b] text-center mb-12">
          몇 초면 시작할 수 있어요
        </p>

        <form onSubmit={handleSignup} className="space-y-3">
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
            placeholder="비밀번호 (6자 이상)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
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
            {loading ? "가입 중..." : "회원가입"}
          </button>
        </form>

        <p className="text-center text-[14px] text-[#86868b] mt-8">
          이미 계정이 있으신가요?{" "}
          <a href="/login" className="text-[#0071e3] hover:underline">
            로그인
          </a>
        </p>
      </div>
    </div>
  );
}
