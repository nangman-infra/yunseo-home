"use client";

import { motion } from "framer-motion";

const PROJECTS = [
    {
        id: 1,
        title: "Legal Guide",
        period: "2025.05 ~ 2025.06",
        description: "AI 기반 외국인 노동자 권리 보호 및 계약서 지원 플랫폼",
        org: "2025 소중한 SW/AI 경진대회",
        award: "우수상",
    },
    {
        id: 2,
        title: "기억살림",
        period: "2025.05",
        description: "초로기 치매 환자를 위한 인지 보조 서비스 기획(아이디어 기안서)",
        org: "Hyundai Autoever",
        award: null,
    },
    {
        id: 3,
        title: "Timemate",
        period: "2025.08.11 ~ 2025.08.22",
        description: "개인 시간표 통합 시각화 기반 그룹 일정 관리 플랫폼",
        org: "Krafton Jungle",
        award: "3등",
    },
    {
        id: 4,
        title: "Medigo",
        period: "2025.09 ~ 2025.10",
        description: "이동 약자를 위한 병원 이동 및 진료 동행 서비스 플랫폼",
        org: "2025 소중한 오픈소스 활용 SW경진대회",
        award: null,
    },
    {
        id: 5,
        title: "IEUM",
        period: "2025.09 ~ 2025.12",
        description: "보행자 위험 요소를 고려한 안전 경로 추천 지도 애플리케이션",
        org: "오픈소스SW프로그래밍",
        award: null,
    },
    {
        id: 6,
        title: "InTheLab",
        period: "2025.09 ~ 2025.12",
        description: "Bluetooth Beacon 기반 연구실 출입 및 출석 관리 시스템",
        org: "마이크로프로세서",
        award: null,
    },
    {
        id: 7,
        title: "온결",
        period: "2025.03 ~ 2025.12",
        description: "종량제 봉투 지급 효율화를 위한 유성구청 리빙랩 프로젝트",
        org: "2025 유성 데이터 기반 실증 리빙랩",
        award: "최우수상",
    },
    {
        id: 8,
        title: "소담",
        period: "2025.07 ~ 2025.09",
        description: "소상공인시장진흥공단 공공데이터 기반 상권 분석 및 전략 수립 지원 플랫폼",
        org: "공공데이터 활용 공모전(소상공인시장진흥공단)",
        award: "대상",
    },
];

// 모든 수상 배지 동일 스타일
function AwardBadge({ award }: { award: string }) {
    return (
        <span className="absolute top-4 right-4 text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-mono">
            {award}
        </span>
    );
}

export function ProjectDisplay() {
    return (
        <section
            id="projects"
            className="py-24 px-6 md:px-20 bg-[#0A0A0A] relative min-h-screen border-t border-slate-800"
        >
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 border-b border-slate-800 pb-6"
                >
                    <h2 className="text-3xl font-bold tracking-[0.2em] uppercase">Projects</h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PROJECTS.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.08 }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            className="group relative p-6 rounded-2xl bg-[#1c1c1e] border border-[#2a2a2a] hover:border-[#3a3a3a] transition-all flex flex-col justify-between"
                        >
                            {/* 수상 배지 */}
                            {project.award && <AwardBadge award={project.award} />}

                            <div>
                                <div className="mb-4">
                                    <span className="text-xs font-mono text-slate-500">{project.period}</span>
                                </div>
                                <h3 className="text-lg font-bold mb-2 group-hover:text-amber-300 transition-colors pr-12">
                                    {project.title}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>
                            </div>
                            <div className="mt-2">
                                <span className="text-xs text-slate-500 font-mono">{project.org}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
