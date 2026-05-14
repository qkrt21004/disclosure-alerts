import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "공시 알람 | 한 곳에서 받는 미국·한국 공시",
  description: "팔로우한 기업의 공시를 이메일로. SEC EDGAR, DART 공시 한 곳에서.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <div className="flex-1">{children}</div>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
