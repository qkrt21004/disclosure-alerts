export default function Footer() {
  return (
    <footer className="border-t border-[#d2d2d7]/50 bg-[#fbfbfd]">
      <div className="max-w-[980px] mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-[12px] text-[#86868b]">
        <p>© 2026 공시 알람. All rights reserved.</p>
        <div className="flex gap-5">
          <a href="/privacy" className="hover:text-[#1d1d1f] transition">개인정보처리방침</a>
          <a href="/terms" className="hover:text-[#1d1d1f] transition">이용약관</a>
        </div>
      </div>
    </footer>
  );
}
