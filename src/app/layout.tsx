import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "YUNIVERSE | 강윤서 포트폴리오",
  description:
    "국립한밭대학교 컴퓨터공학과 강윤서의 포트폴리오입니다. 클라우드, 인프라, 개발 프로젝트를 소개합니다.",
  keywords: ["강윤서", "포트폴리오", "클라우드", "인프라", "컴퓨터공학", "한밭대학교"],
  authors: [{ name: "강윤서 (Yunseo Kang)" }],
  openGraph: {
    title: "YUNIVERSE | 강윤서 포트폴리오",
    description:
      "국립한밭대학교 컴퓨터공학과 강윤서의 포트폴리오입니다. 클라우드, 인프라, 개발 프로젝트를 소개합니다.",
    url: "https://yuniverse.dev",
    siteName: "YUNIVERSE",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YUNIVERSE | 강윤서 포트폴리오",
    description:
      "국립한밭대학교 컴퓨터공학과 강윤서의 포트폴리오입니다. 클라우드, 인프라, 개발 프로젝트를 소개합니다.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className="bg-[#0A0A0A] text-slate-50 relative min-h-screen overflow-x-hidden">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
