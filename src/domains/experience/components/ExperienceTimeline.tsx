"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award, BookOpen, Star } from "lucide-react";

// 과거 → 현재 순서 (위가 과거, 아래가 현재)
const ACTIVITIES = [
    {
        id: 5,
        title: "Mobicom LAB.",
        org: "Hanbat National University",
        date: "2025.02 ~ 현재",
        desc: "국립한밭대학교 Mobicom 연구실 소속",
        icon: <GraduationCap className="w-5 h-5" />,
        badge: null,
    },
    {
        id: 4,
        title: "크래프톤 정글 웹개발 집중캠프",
        org: "Krafton Jungle",
        date: "2025.08.11 ~ 2025.08.22",
        desc: "웹 개발 집중 캠프 참여 및 팀 프로젝트 수행",
        icon: <Star className="w-5 h-5" />,
        badge: null,
    },
    {
        id: 3,
        title: "소중한 SW특강: 네이버클라우드 실무 2기 (Associate)",
        org: "NAVER Cloud",
        date: "2025.11.03 ~ 2025.11.14",
        desc: "네이버클라우드 플랫폼 Associate 교육 과정 수료",
        icon: <BookOpen className="w-5 h-5" />,
        badge: null,
    },
    {
        id: 2,
        title: "소중한 SW특강: 네이버클라우드 실무 3기 (Professional)",
        org: "NAVER Cloud",
        date: "2026.01.12 ~ 2026.01.23",
        desc: "네이버클라우드 플랫폼 Professional 교육 과정 수료",
        icon: <BookOpen className="w-5 h-5" />,
        badge: null,
    },
    {
        id: 1,
        title: "CloudSquare 인턴십",
        org: "CloudSquare",
        date: "2026.01.26 ~ 2026.02.27",
        desc: "MSP 클라우드 엔지니어 현장실습",
        icon: <Briefcase className="w-5 h-5" />,
        badge: null,
    },
];

const CERTIFICATIONS = [
    {
        title: "NAVER Cloud Platform Certified Associate",
        org: "NAVER Cloud",
        date: "2025.11.27",
    },
    {
        title: "NAVER Cloud Platform Certified Professional",
        org: "NAVER Cloud",
        date: "2026.01.30",
    },
];

export function ExperienceTimeline() {
    return (
        <section id="experience" className="py-24 px-6 md:px-20 bg-[#0A0A0A] relative border-t border-slate-900 flex flex-col items-center">
            <div className="max-w-4xl w-full">
                {/* 제목 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 border-b border-slate-900 pb-6"
                >
                    <h2 className="text-3xl font-bold tracking-[0.2em] uppercase">Experience</h2>
                </motion.div>

                {/* 타임라인: 과거(위) → 현재(아래) */}
                <div className="space-y-8 mb-20 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-800">
                    {ACTIVITIES.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative flex items-start gap-6 group"
                        >
                            {/* 아이콘 도트 */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-slate-800 bg-slate-900 text-slate-400 shadow shrink-0 z-10 group-hover:border-slate-600 group-hover:text-slate-200 transition-all">
                                {exp.icon}
                            </div>

                            {/* 콘텐츠 */}
                            <div className="flex-1 pb-2">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <span className="text-xs font-mono text-slate-500">{exp.date}</span>
                                    {exp.badge && (
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                                            {exp.badge}
                                        </span>
                                    )}
                                </div>
                                <h3 className="font-bold text-lg text-white group-hover:text-slate-200 transition-colors mb-1">
                                    {exp.title}
                                </h3>
                                <div className="text-sm text-slate-400 font-medium mb-1">{exp.org}</div>
                                <p className="text-slate-500 text-sm leading-relaxed">{exp.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* 자격증 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-300">
                        <Award className="w-5 h-5 text-slate-400" /> Certifications
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {CERTIFICATIONS.map((cert, i) => (
                            <div
                                key={i}
                                className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-600 transition-colors"
                            >
                                <div className="text-xs font-mono text-slate-500 mb-1">{cert.date}</div>
                                <div className="font-semibold text-sm text-white mb-1">{cert.title}</div>
                                <div className="text-xs text-slate-500">{cert.org}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
