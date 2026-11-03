import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { DiagramFigure } from "@/domains/projects/components/DiagramFigure";
import type { CaseStudy } from "@/domains/projects/data/caseStudies";

export function CaseStudyView({ study }: Readonly<{ study: CaseStudy }>) {
    return (
        <article className="pt-28 pb-24 px-6 md:px-20 bg-[#0A0A0A] min-h-screen">
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/#projects"
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-10"
                >
                    <ArrowLeft className="w-4 h-4" /> 프로젝트 목록
                </Link>

                {/* 헤더 */}
                <header className="border-b border-slate-800 pb-8 mb-10">
                    <div className="flex flex-wrap items-center gap-2 mb-3 text-xs font-mono text-slate-500">
                        <span>{study.period}</span>
                        <span>·</span>
                        <span>{study.org}</span>
                        {study.team && (
                            <>
                                <span>·</span>
                                <span>{study.team}</span>
                            </>
                        )}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">{study.title}</h1>
                    <p className="text-slate-400 leading-relaxed">{study.subtitle}</p>
                </header>

                {/* 역할 · 스택 */}
                <div className="grid md:grid-cols-2 gap-6 mb-14">
                    <section className="p-6 rounded-2xl bg-[#1c1c1e] border border-[#2a2a2a]">
                        <h2 className="text-sm font-mono uppercase tracking-widest text-slate-400 mb-4">My Role</h2>
                        <ul className="space-y-2 text-sm text-slate-300">
                            {study.role.map((item) => (
                                <li key={item} className="flex gap-2">
                                    <span className="text-slate-600">—</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section className="p-6 rounded-2xl bg-[#1c1c1e] border border-[#2a2a2a]">
                        <h2 className="text-sm font-mono uppercase tracking-widest text-slate-400 mb-4">Stack</h2>
                        <dl className="space-y-3">
                            {study.stack.map((group) => (
                                <div key={group.label}>
                                    <dt className="text-xs text-slate-500 mb-1">{group.label}</dt>
                                    <dd className="flex flex-wrap gap-1.5">
                                        {group.items.map((item) => (
                                            <span
                                                key={item}
                                                className="text-xs px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </section>
                </div>

                {/* 본문 섹션 */}
                <div className="space-y-14">
                    {study.sections.map((section) => (
                        <section key={section.title}>
                            <h2 className="text-xl font-bold mb-4">{section.title}</h2>
                            {section.diagrams?.map((diagram) => (
                                <DiagramFigure key={diagram.src} diagram={diagram} />
                            ))}
                            <ul className="space-y-3 text-slate-300 leading-relaxed">
                                {section.items.map((item) => (
                                    <li key={item} className="flex gap-3">
                                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-slate-500" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>
            </div>
        </article>
    );
}
