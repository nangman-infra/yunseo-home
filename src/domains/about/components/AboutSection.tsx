"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Briefcase, FlaskConical, GraduationCap } from "lucide-react";

import { inView, scatter, speck } from "@/components/motion/scatter";
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

                <motion.div {...inView} variants={scatter} className="mb-16">
                    <motion.p variants={speck} className="text-sm font-mono uppercase tracking-widest text-slate-400 mb-3">
                        Cloud · Infra Engineer
                    </motion.p>
                    <motion.p variants={speck} className="text-4xl md:text-5xl font-bold text-white mb-5">
                        강윤서
                    </motion.p>
                    <motion.p variants={speck} className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl break-keep">
                        장애 상황까지 설계에 담아, 멈추지 않는 인프라를 만듭니다.
                    </motion.p>
                </motion.div>

                <motion.ul {...inView} variants={scatter} className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mb-20">
                    {PROFILE.map(({ icon: Icon, period, title, desc }) => (
                        <motion.li key={title} variants={speck}>
                            <Icon className="w-5 h-5 text-slate-500 mb-4" aria-hidden />
                            <div className="text-xs font-mono text-slate-500 mb-1.5">{period}</div>
                            <div className="text-base font-semibold text-white leading-snug">{title}</div>
                            <div className="text-sm text-slate-400 leading-snug mt-1 break-keep">{desc}</div>
                        </motion.li>
                    ))}
                </motion.ul>

                <div className="grid md:grid-cols-2 gap-x-16 gap-y-16">
                    <div>
                        <h3 className="text-sm font-mono uppercase tracking-widest text-slate-500 mb-6">Skills</h3>
                        <motion.dl {...inView} variants={scatter} className="space-y-5">
                            {SKILLS.map((group) => (
                                <motion.div key={group.label} variants={speck}>
                                    <dt className="text-xs text-slate-500 mb-1.5">{group.label}</dt>
                                    <dd className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-200">
                                        {group.items.map((item) => (
                                            <span key={item}>{item}</span>
                                        ))}
                                    </dd>
                                </motion.div>
                            ))}
                        </motion.dl>
                    </div>

                    <div>
                        <h3 className="text-sm font-mono uppercase tracking-widest text-slate-500 mb-6">Awards</h3>
                        <motion.ul {...inView} variants={scatter}>
                            {AWARDS.map((item) => (
                                <motion.li
                                    key={`${item.date}-${item.title}`}
                                    variants={speck}
                                    className="flex items-end justify-between gap-3 py-3.5 border-b border-slate-800/70 first:pt-0 last:border-b-0"
                                >
                                    <div>
                                        <div className="text-xs font-mono text-slate-500 mb-0.5">{item.date}</div>
                                        <div className="text-sm text-slate-200 leading-snug break-keep">{item.title}</div>
                                    </div>
                                    <div className="shrink-0">
                                        <AwardBadge award={item.award} />
                                    </div>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
