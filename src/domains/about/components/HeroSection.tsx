"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { InteractiveGlobe } from "./InteractiveGlobe";
import { StarField } from "./StarField";

export function HeroSection() {
    return (
        <section id="about" className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-blue-950 to-black" />

            {/* Twinkling Star Field */}
            <StarField />

            {/* Giant Background Globe */}
            <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
                <InteractiveGlobe />
            </div>

            {/* 메인 텍스트 */}
            <div className="z-10 text-center flex flex-col items-center max-w-2xl px-4 mt-8">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6"
                >
                    Welcome to <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-300">
                        YUNIVERSE
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl mx-auto mb-10"
                >
                    국립한밭대학교 컴퓨터공학과에 재학 중인 강윤서입니다.<br />
                    클라우드와 인프라에 대해 관심을 갖고 공부하고 있습니다.
                </motion.p>
            </div>

            {/* Scroll Down 화살표 */}
            <motion.a
                href="#projects"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors group cursor-pointer"
            >
                <span className="text-xs tracking-widest uppercase font-mono">Scroll Down</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ChevronDown className="w-5 h-5 group-hover:text-amber-400 transition-colors" />
                </motion.div>
            </motion.a>
        </section>
    );
}
