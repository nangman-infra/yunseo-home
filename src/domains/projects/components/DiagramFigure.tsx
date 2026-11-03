"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Maximize2, X } from "lucide-react";

import type { Diagram } from "@/domains/projects/data/caseStudies";

export function DiagramFigure({ diagram }: Readonly<{ diagram: Diagram }>) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [isOpen]);

    return (
        <figure className="my-6">
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label={`${diagram.caption} 크게 보기`}
                className="group relative block w-full overflow-hidden rounded-xl border border-slate-800 bg-white cursor-zoom-in"
            >
                <Image
                    src={diagram.src}
                    alt={diagram.alt}
                    width={diagram.width}
                    height={diagram.height}
                    unoptimized
                    className="w-full h-auto"
                />
                <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3 h-3" /> 크게 보기
                </span>
            </button>
            <figcaption className="mt-2 text-xs text-slate-500 font-mono">{diagram.caption}</figcaption>

            {isOpen && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={diagram.caption}
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
                    onClick={() => setIsOpen(false)}
                >
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        aria-label="닫기"
                        className="absolute top-4 right-4 rounded-full bg-slate-800 p-2 text-slate-200 hover:bg-slate-700"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <Image
                        src={diagram.src}
                        alt={diagram.alt}
                        width={diagram.width}
                        height={diagram.height}
                        unoptimized
                        className="max-h-full w-auto max-w-full rounded-lg bg-white object-contain"
                    />
                </div>
            )}
        </figure>
    );
}
