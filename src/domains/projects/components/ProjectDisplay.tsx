"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { CASE_STUDIES, type CaseStudy } from "@/domains/projects/data/caseStudies";
import { PROJECTS, type Project } from "@/domains/projects/data/projects";

function FeaturedCard({ study, index }: Readonly<{ study: CaseStudy; index: number }>) {
    const thumbnail = study.sections.flatMap((section) => section.diagrams ?? [])[0];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            <Link
                href={`/projects/${study.slug}`}
                className="group grid md:grid-cols-[2fr_3fr] gap-6 p-5 rounded-2xl bg-[#1c1c1e] border border-[#2a2a2a] hover:border-[#4a4a4a] transition-colors"
            >
                {thumbnail && (
                    <div className="overflow-hidden rounded-xl bg-white border border-slate-800 aspect-[16/10]">
                        <Image
                            src={thumbnail.src}
                            alt={thumbnail.alt}
                            width={thumbnail.width}
                            height={thumbnail.height}
                            unoptimized
                            className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                        />
                    </div>
                )}
                <div className="flex flex-col">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-mono text-slate-400">{study.period}</span>
                        <span className="text-xs text-slate-500">· {study.org}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 flex items-start gap-1 group-hover:text-slate-300 transition-colors">
                        {study.title}
                        <ArrowUpRight className="w-4 h-4 mt-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-3">{study.subtitle}</p>
                    <p className="text-sm text-slate-300 mb-4">
                        <span className="text-xs font-mono text-slate-500 mr-2">ROLE</span>
                        {study.role[0]}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-1.5">
                        {study.highlights.map((item) => (
                            <span
                                key={item}
                                className="text-xs px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

function ProjectRow({ project, index }: Readonly<{ project: Project; index: number }>) {
    return (
        <motion.li
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: Math.min(index, 4) * 0.05 }}
            className="group grid md:grid-cols-[9rem_1fr] gap-x-8 gap-y-1 py-7 border-b border-slate-800/80 last:border-b-0"
        >
            <div className="text-xs font-mono text-slate-500 md:pt-1.5">{project.period}</div>
            <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <h4 className="text-lg font-bold text-white group-hover:text-slate-300 transition-colors">
                        {project.title}
                    </h4>
                </div>
                <div className="text-xs text-slate-500 mt-1">{project.org}</div>
                <p className="text-sm text-slate-300 leading-relaxed mt-3">{project.description}</p>
                {project.role && (
                    <p className="text-sm text-slate-400 leading-relaxed mt-2 pl-3 border-l-2 border-slate-700">
                        {project.role}
                    </p>
                )}
                {project.stack && (
                    <p className="text-xs font-mono text-slate-500 mt-3">{project.stack.join(" · ")}</p>
                )}
            </div>
        </motion.li>
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

                <h3 className="text-sm font-mono uppercase tracking-widest text-slate-500 mb-6">Featured</h3>
                <div className="space-y-6 mb-20">
                    {CASE_STUDIES.map((study, index) => (
                        <FeaturedCard key={study.slug} study={study} index={index} />
                    ))}
                </div>

                <h3 className="text-sm font-mono uppercase tracking-widest text-slate-500 mb-6">Other Projects</h3>
                <ul className="border-t border-slate-800">
                    {PROJECTS.map((project, index) => (
                        <ProjectRow key={project.title} project={project} index={index} />
                    ))}
                </ul>
            </div>
        </section>
    );
}
