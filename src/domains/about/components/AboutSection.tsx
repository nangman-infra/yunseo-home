"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Briefcase, FlaskConical, GraduationCap } from "lucide-react";

import { AwardBadge } from "@/domains/projects/components/AwardBadge";

const PROFILE = [
    {
        icon: GraduationCap,
        period: "2024 ~ 재학 중",
        title: "국립한밭대학교",
        desc: "컴퓨터공학과 3학년",
    },
    {
        icon: FlaskConical,
        period: "2025.02 ~ 현재",
        title: "MOBICOM 연구실",
        desc: "모바일컴퓨팅 연구실 학부연구생",
    },
    {
        icon: Briefcase,
        period: "2026.01 ~ 2026.02",
        title: "클라우드스퀘어",
        desc: "MSP 클라우드 엔지니어 인턴",
    },
    {
        icon: BadgeCheck,
        period: "2025.11 · 2026.01",
        title: "NCP Certified",
        desc: "Associate · Professional 취득",
    },
];

const SKILLS = [
    { label: "NCP", items: ["VPC", "Load Balancer", "Auto Scaling", "Object Storage", "Global CDN", "Cloud Insight"] },
    { label: "GCP", items: ["VPC", "GKE"] },
    { label: "IaC · CI/CD", items: ["Terraform", "GitHub Actions", "Docker"] },
    { label: "운영 · 모니터링", items: ["Kubernetes (NKS, GKE)", "Grafana", "Prometheus"] },
    { label: "개발", items: ["Python", "TypeScript", "React", "React Native", "SwiftUI"] },
];

const AWARDS = [
    { date: "2026.09", title: "2026 공공데이터 활용 공모전 (국가철도공단)", award: "대상" },
    { date: "2025.12", title: "2025 유성 데이터 기반 실증 리빙랩", award: "최우수상" },
    { date: "2025.09", title: "공공데이터 활용 공모전 (소상공인시장진흥공단)", award: "대상" },
    { date: "2025.08", title: "크래프톤 정글 웹개발 집중캠프", award: "3등" },
    { date: "2025.05", title: "2025 SW/AI 경진대회", award: "우수상" },
];

export function AboutSection() {
    return (
        <section id="about" className="py-24 px-6 md:px-20 bg-[#0A0A0A] border-t border-slate-800">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-12 border-b border-slate-800 pb-6"
                >
                    <h2 className="text-3xl font-bold tracking-[0.2em] uppercase">About</h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7 }}
                    className="mb-10"
                >
                    <p className="text-sm font-mono uppercase tracking-widest text-slate-400 mb-3">
                        Cloud · Infra Engineer
                    </p>
                    <p className="text-4xl md:text-5xl font-bold text-white mb-5">강윤서</p>
                    <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl break-keep">
                        장애 상황까지 설계에 담아, 멈추지 않는 인프라를 만듭니다.
                    </p>
                </motion.div>

                <motion.ul
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="grid sm:grid-cols-2 gap-4 mb-6"
                >
                    {PROFILE.map(({ icon: Icon, period, title, desc }) => (
                        <li
                            key={title}
                            className="flex items-start gap-4 p-5 rounded-2xl bg-[#1c1c1e] border border-[#2a2a2a]"
                        >
                            <span className="shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-slate-800 text-slate-200">
                                <Icon className="w-5 h-5" aria-hidden />
                            </span>
                            <div className="min-w-0">
                                <div className="text-xs font-mono text-slate-400 mb-1">{period}</div>
                                <div className="text-base font-semibold text-white leading-snug">{title}</div>
                                <div className="text-sm text-slate-400 leading-snug mt-0.5">{desc}</div>
                            </div>
                        </li>
                    ))}
                </motion.ul>

                <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6 }}
                        className="p-6 rounded-2xl bg-[#1c1c1e] border border-[#2a2a2a]"
                    >
                        <h3 className="text-sm font-mono uppercase tracking-widest text-slate-400 mb-5">Skills</h3>
                        <dl className="space-y-4">
                            {SKILLS.map((group) => (
                                <div key={group.label}>
                                    <dt className="text-xs text-slate-400 mb-1.5">{group.label}</dt>
                                    <dd className="flex flex-wrap gap-1.5">
                                        {group.items.map((item) => (
                                            <span
                                                key={item}
                                                className="text-xs px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-200 border border-slate-700"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="p-6 rounded-2xl bg-[#1c1c1e] border border-[#2a2a2a]"
                    >
                        <h3 className="text-sm font-mono uppercase tracking-widest text-slate-400 mb-5">Awards</h3>
                        <ul className="space-y-4">
                            {AWARDS.map((item) => (
                                <li key={`${item.date}-${item.title}`} className="flex items-start justify-between gap-3">
                                    <div>
                                        <div className="text-xs font-mono text-slate-400 mb-0.5">{item.date}</div>
                                        <div className="text-sm text-slate-200 leading-snug">{item.title}</div>
                                    </div>
                                    <div className="shrink-0">
                                        <AwardBadge award={item.award} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
