"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie-consent-v1";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(STORAGE_KEY)) {
      setShow(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="max-w-[680px] mx-auto bg-white border border-[#d2d2d7] rounded-2xl shadow-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-[13px] leading-[1.5] text-[#424245] flex-1">
          본 서비스는 로그인 세션 유지를 위한 필수 쿠키만 사용합니다.{" "}
          <a href="/privacy" className="text-[#0071e3] hover:underline whitespace-nowrap">
            개인정보처리방침
          </a>
        </p>
        <button
          onClick={accept}
          className="w-full sm:w-auto bg-[#0071e3] hover:bg-[#0077ed] text-white text-[13px] font-medium px-5 py-2 rounded-full transition whitespace-nowrap"
        >
          확인
        </button>
      </div>
    </div>
  );
}
