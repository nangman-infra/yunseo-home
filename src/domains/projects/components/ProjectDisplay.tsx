"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { CASE_STUDIES, type CaseStudy } from "@/domains/projects/data/caseStudies";
import { PROJECTS, type Project } from "@/domains/projects/data/projects";

function FeaturedItem({ study, index }: Readonly<{ study: CaseStudy; index: number }>) {
    const thumbnail = study.sections.flatMap((section) => section.diagrams ?? [])[0];
    const flipped = index % 2 === 1;

    return (
        <motion.li
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
        >
            <Link href={`/projects/${study.slug}`} className="group grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {thumbnail && (
                    <div className={`overflow-hidden rounded-xl bg-white aspect-[16/10] ${flipped ? "md:order-2" : ""}`}>
                        <Image
                            src={thumbnail.src}
                            alt={thumbnail.alt}
                            width={thumbnail.width}
                            height={thumbnail.height}
                            unoptimized
                            className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition duration-500"
                        />
                    </div>
                )}
                <div>
                    <div className="text-5xl font-bold font-mono text-slate-800 mb-4">
                        {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="text-xs font-mono text-slate-500 mb-2">
                        {study.period} · {study.org}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 break-keep group-hover:text-slate-300 transition-colors">
                        {study.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4 break-keep">{study.subtitle}</p>
                    <p className="text-sm text-slate-400 leading-relaxed mb-5 pl-3 border-l-2 border-slate-700 break-keep">
                        {study.roleSummary}
                    </p>
                    <p className="text-xs font-mono text-slate-500 mb-5">{study.highlights.join("  ·  ")}</p>
                    <span className="inline-flex items-center gap-1 text-sm text-slate-300 group-hover:text-white transition-colors">
                        자세히 보기
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                </div>
            </Link>
        </motion.li>
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
            className="py-24 px-6 md:px-20 relative min-h-screen border-t border-slate-800/60"
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

                <h3 className="text-sm font-mono uppercase tracking-widest text-slate-500 mb-10">Featured</h3>
                <ul className="space-y-24 mb-28">
                    {CASE_STUDIES.map((study, index) => (
                        <FeaturedItem key={study.slug} study={study} index={index} />
                    ))}
                </ul>

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
