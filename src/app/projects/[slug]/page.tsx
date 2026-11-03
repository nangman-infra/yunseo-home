import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyView } from "@/domains/projects/components/CaseStudyView";
import { CASE_STUDIES, getCaseStudy } from "@/domains/projects/data/caseStudies";

type Props = Readonly<{ params: Promise<{ slug: string }> }>;

export const dynamicParams = false;

export function generateStaticParams() {
    return CASE_STUDIES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const study = getCaseStudy((await params).slug);
    if (!study) return {};
    return {
        title: `${study.title} | YUNIVERSE`,
        description: study.subtitle,
    };
}

export default async function CaseStudyPage({ params }: Props) {
    const study = getCaseStudy((await params).slug);
    if (!study) notFound();
    return <CaseStudyView study={study} />;
}
