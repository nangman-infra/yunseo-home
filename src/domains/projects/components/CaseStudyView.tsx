"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import { inView, scatter, speck } from "@/components/motion/scatter";
import { DiagramFigure } from "@/domains/projects/components/DiagramFigure";
import type { CaseStudy } from "@/domains/projects/data/caseStudies";

function SectionTitle({ index, title }: Readonly<{ index: number; title: string }>) {
    return (
        <div className="flex items-baseline gap-4 mb-6">
            <span className="text-sm font-mono text-slate-600">{String(index + 1).padStart(2, "0")}</span>
            <h2 className="text-2xl font-bold break-keep">{title}</h2>
        </div>
    );
}

export function CaseStudyView({ study }: Readonly<{ study: CaseStudy }>) {
    const meta = [study.period, study.org, study.team].filter(Boolean).join(" · ");

    return (
        <article className="pt-28 pb-24 px-6 md:px-20 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/#projects"
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-12"
                >
                    <ArrowLeft className="w-4 h-4" /> 프로젝트 목록
                </Link>

                {/* 헤더 */}
                <motion.header {...inView} variants={scatter} className="mb-12">
                    <motion.p variants={speck} className="text-xs font-mono text-slate-500 mb-4">
                        {meta}
                    </motion.p>
                    <motion.h1 variants={speck} className="text-3xl md:text-5xl font-bold leading-tight mb-5 break-keep">
                        {study.title}
                    </motion.h1>
                    <motion.p variants={speck} className="text-lg text-slate-400 leading-relaxed max-w-3xl break-keep">
                        {study.subtitle}
                    </motion.p>
                </motion.header>

                {/* 핵심 수치 */}
                <motion.ul
                    {...inView}
                    variants={scatter}
                    className="flex flex-wrap gap-x-10 gap-y-3 pb-12 mb-14 border-b border-slate-800"
                >
                    {study.highlights.map((item) => (
                        <motion.li key={item} variants={speck} className="text-sm font-mono text-slate-300">
                            {item}
                        </motion.li>
                    ))}
                </motion.ul>

                {/* 스택 */}
                <section className="mb-20">
                    <h2 className="text-sm font-mono uppercase tracking-widest text-slate-500 mb-5">Stack</h2>
                    <motion.dl {...inView} variants={scatter} className="grid md:grid-cols-3 gap-x-10 gap-y-4">
                        {study.stack.map((group) => (
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
                </section>

                {/* 본문 섹션 */}
                <div className="space-y-20">
                    <section>
                        <SectionTitle index={0} title="내 역할" />
                        <motion.dl {...inView} variants={scatter} className="space-y-6">
                            {study.role.map(({ label, detail }) => (
                                <motion.div
                                    key={label}
                                    variants={speck}
                                    className="grid md:grid-cols-[10rem_1fr] gap-x-6 gap-y-1 pl-4 border-l-2 border-slate-700"
                                >
                                    <dt className="font-semibold text-white break-keep">{label}</dt>
                                    <dd className="text-slate-300 leading-relaxed break-keep">{detail}</dd>
                                </motion.div>
                            ))}
                        </motion.dl>
                    </section>

                    {study.sections.map((section, index) => (
                        <section key={section.title}>
                            <SectionTitle index={index + 1} title={section.title} />
                            {section.diagrams?.map((diagram) => (
                                <DiagramFigure key={diagram.src} diagram={diagram} />
                            ))}
                            <motion.ul {...inView} variants={scatter} className="space-y-4 text-slate-300 leading-relaxed">
                                {section.items.map((item) => (
                                    <motion.li key={item} variants={speck} className="flex gap-3 break-keep">
                                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-slate-500" />
                                        <span>{item}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </section>
                    ))}
                </div>
            </div>
        </article>
    );
}
