export default function PrivacyPage() {
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
          개인정보처리방침
        </h1>
        <p className="text-[14px] text-[#86868b] mb-12">
          시행일: 2026년 5월 15일
        </p>

        <div className="space-y-10 text-[15px] leading-[1.7] text-[#1d1d1f]">
          <section>
            <h2 className="text-[20px] font-semibold mb-3">1. 수집하는 개인정보 항목</h2>
            <p className="text-[#424245]">
              본 서비스는 공시 알람 제공을 위해 다음의 최소한의 개인정보를 수집합니다:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1 text-[#424245]">
              <li>필수 항목: 이메일 주소, 비밀번호(암호화 저장)</li>
              <li>자동 수집: 접속 IP, 쿠키, 기기 정보</li>
              <li>이용 기록: 팔로우한 기업 목록, 수신한 알람 기록</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-3">2. 수집 및 이용 목적</h2>
            <ul className="list-disc pl-6 space-y-1 text-[#424245]">
              <li>회원 인증 및 계정 관리</li>
              <li>구독한 기업의 공시 알람 이메일 발송</li>
              <li>서비스 개선 및 통계 분석</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-3">3. 보유 및 이용 기간</h2>
            <p className="text-[#424245]">
              회원 탈퇴 시 즉시 파기됩니다. 단, 관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-3">4. 제3자 제공 및 처리 위탁</h2>
            <p className="text-[#424245] mb-3">
              본 서비스는 개인정보를 제3자에게 제공하지 않으며, 다음 업체에 처리 업무를 위탁하고 있습니다:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-[#424245]">
              <li>Supabase Inc. (미국): 회원 인증 및 데이터베이스</li>
              <li>Vercel Inc. (미국): 웹사이트 호스팅</li>
              <li>Resend (미국): 알람 이메일 발송</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-3">5. 정보주체의 권리</h2>
            <p className="text-[#424245]">
              이용자는 언제든지 자신의 개인정보를 조회, 수정, 삭제할 수 있으며, 회원 탈퇴를 통해 모든 개인정보의 파기를 요청할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-3">6. 쿠키 사용</h2>
            <p className="text-[#424245]">
              본 서비스는 로그인 세션 유지를 위해 필수 쿠키만 사용합니다. 광고나 트래킹 목적의 쿠키는 사용하지 않습니다. 브라우저 설정에서 쿠키를 거부할 수 있으나, 이 경우 로그인 기능이 제한될 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-3">7. 안전성 확보 조치</h2>
            <p className="text-[#424245]">
              비밀번호는 단방향 암호화하여 저장하며, 모든 통신은 HTTPS로 암호화됩니다. 데이터베이스 접근은 Row-Level Security를 통해 본인 정보만 접근 가능합니다.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-3">8. 개인정보 보호책임자</h2>
            <p className="text-[#424245]">
              개인정보 관련 문의: <a href="mailto:contact@disclosure-alerts.app" className="text-[#0071e3] hover:underline">contact@disclosure-alerts.app</a>
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-3">9. 방침 변경</h2>
            <p className="text-[#424245]">
              본 방침이 변경될 경우 변경 사항을 웹사이트에 공지합니다.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
