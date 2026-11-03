"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Blog", href: "/#blog" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // 레이아웃의 Navbar는 페이지를 옮겨도 다시 마운트되지 않으므로 경로가 바뀔 때마다 섹션을 다시 찾는다
    const sectionIds = NAV_ITEMS.map(({ href }) => href.slice(2));

    const update = () => {
      setScrolled(window.scrollY > 20);

      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

      if (sections.length === 0) {
        setActiveSection(pathname.startsWith("/projects") ? "projects" : "");
        return;
      }

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      const line = window.innerHeight * 0.4;
      let current = "";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      }
      setActiveSection(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 transition-all duration-300 ${scrolled
            ? "bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/30"
            : "bg-transparent"
          }`}
      >
        {/* 로고 */}
        <div className="text-xl font-bold tracking-widest uppercase flex items-center gap-2">
          <Globe className="w-5 h-5 text-white" />
          <Link href="/" onClick={() => setIsOpen(false)}>
            YUNIVERSE
          </Link>
        </div>

        {/* 데스크탑 메뉴 */}
        <ul className="hidden md:flex gap-8 text-sm font-medium">
          {NAV_ITEMS.map(({ label, href }) => {
            const isActive = activeSection === href.slice(2);
            return (
              <li key={href} className="relative">
                <Link
                  href={href}
                  className={`transition-colors duration-200 ${isActive ? "text-amber-400" : "text-slate-300 hover:text-white"
                    }`}
                >
                  {label}
                </Link>
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-amber-400 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* 모바일 햄버거 버튼 */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </motion.nav>

      {/* 모바일 드롭다운 메뉴 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-[64px] left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-b border-white/10"
          >
            <ul className="flex flex-col px-6 py-4 gap-1">
              {NAV_ITEMS.map(({ label, href }, index) => {
                const isActive = activeSection === href.slice(2);
                return (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 py-3 text-base font-medium border-b border-white/5 last:border-none transition-colors ${isActive ? "text-amber-400" : "text-slate-300 hover:text-white"
                        }`}
                    >
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      )}
                      {label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
