export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <header className="sticky top-0 z-20 bg-[#fbfbfd]/80 backdrop-blur-xl border-b border-[#d2d2d7]/50">
        <div className="max-w-[980px] mx-auto px-6 h-12 flex justify-between items-center">
          <a href="/" className="text-[17px] font-semibold tracking-tight text-[#1d1d1f]">
            공시 알람
          </a>
          <a href="/" className="text-[13px] text-[#0071e3] hover:underline">홈</a>
        </div>
      </header>

      <main className="max-w-[760px] mx-auto px-6 py-16">
        <h1 className="text-[40px] font-semibold tracking-tight text-[#1d1d1f] mb-2">
          이용약관
        </h1>
        <p className="text-[14px] text-[#86868b] mb-12">
          시행일: 2026년 5월 15일
        </p>

        <div className="space-y-10 text-[15px] leading-[1.7] text-[#1d1d1f]">
          <section>
            <h2 className="text-[20px] font-semibold mb-3">제1조 (목적)</h2>
            <p className="text-[#424245]">
              본 약관은 공시 알람 서비스(이하 &quot;서비스&quot;)의 이용 조건 및 절차, 이용자와 운영자의 권리·의무·책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-3">제2조 (서비스 내용)</h2>
            <p className="text-[#424245]">
              본 서비스는 미국 SEC EDGAR, 한국 DART 등 공개된 공시 정보를 집계하여 이용자가 팔로우한 기업의 공시를 이메일로 알려주는 서비스입니다. 본 서비스는 투자 자문 또는 추천을 제공하지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-3">제3조 (회원가입 및 계정)</h2>
            <p className="text-[#424245]">
              회원가입은 이메일 주소로 진행되며, 1인 1계정을 원칙으로 합니다. 계정 정보의 관리 책임은 이용자 본인에게 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-3">제4조 (서비스 이용)</h2>
            <ul className="list-disc pl-6 space-y-1 text-[#424245]">
              <li>본 서비스는 무료로 제공되며, 향후 유료 기능이 추가될 수 있습니다.</li>
              <li>운영자는 시스템 점검, 장애 등의 사유로 서비스를 일시 중단할 수 있습니다.</li>
              <li>이용자는 본 서비스를 통해 얻은 정보를 무단으로 재배포할 수 없습니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-3">제5조 (면책)</h2>
            <p className="text-[#424245]">
              본 서비스가 제공하는 공시 정보는 공개된 원문을 기반으로 하되, 정확성·완전성·적시성을 보장하지 않습니다. 본 서비스 이용으로 발생한 투자 손실에 대해 운영자는 책임지지 않습니다. 실제 투자 결정 시 원문 공시를 직접 확인하시기 바랍니다.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-3">제6조 (회원 탈퇴)</h2>
            <p className="text-[#424245]">
              이용자는 언제든지 서비스 내에서 회원 탈퇴를 요청할 수 있으며, 탈퇴 시 모든 개인정보가 즉시 파기됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-3">제7조 (약관 변경)</h2>
            <p className="text-[#424245]">
              본 약관이 변경될 경우 변경 사항을 웹사이트에 공지하며, 변경 후 서비스 이용 시 변경된 약관에 동의한 것으로 간주합니다.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
