"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, School } from "lucide-react";

function GitHubBrandIcon({ className }: Readonly<{ className?: string }>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
            <path d="M12 2C6.48 2 2 6.58 2 12.22C2 16.73 4.87 20.55 8.84 21.9C9.34 21.99 9.52 21.68 9.52 21.42C9.52 21.19 9.51 20.43 9.5 19.42C6.73 20.04 6.14 18.2 6.14 18.2C5.68 16.99 5.03 16.66 5.03 16.66C4.12 16.02 5.1 16.03 5.1 16.03C6.11 16.1 6.65 17.09 6.65 17.09C7.55 18.68 9.02 18.22 9.59 17.95C9.68 17.29 9.94 16.84 10.23 16.58C8.02 16.32 5.7 15.45 5.7 11.55C5.7 10.44 6.09 9.53 6.73 8.81C6.62 8.55 6.28 7.49 6.83 6.06C6.83 6.06 7.67 5.79 9.49 7.06C10.29 6.83 11.15 6.72 12 6.72C12.85 6.72 13.71 6.83 14.51 7.06C16.33 5.79 17.17 6.06 17.17 6.06C17.72 7.49 17.38 8.55 17.27 8.81C17.91 9.53 18.3 10.44 18.3 11.55C18.3 15.46 15.98 16.31 13.76 16.57C14.13 16.9 14.46 17.55 14.46 18.56C14.46 20 14.45 21.12 14.45 21.42C14.45 21.68 14.63 22 15.14 21.9C19.11 20.55 22 16.73 22 12.22C22 6.58 17.52 2 12 2Z" />
        </svg>
    );
}

function LinkedInBrandIcon({ className }: Readonly<{ className?: string }>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
            <path d="M6.94 8.5H3.56V19.5H6.94V8.5ZM5.25 3C4.17 3 3.5 3.72 3.5 4.67C3.5 5.6 4.15 6.33 5.2 6.33H5.22C6.33 6.33 7 5.6 7 4.67C6.98 3.72 6.33 3 5.25 3ZM20.5 13.14C20.5 9.74 18.69 8.17 16.28 8.17C14.33 8.17 13.46 9.24 12.97 9.99V8.5H9.59C9.64 9.49 9.59 19.5 9.59 19.5H12.97V13.36C12.97 13.03 12.99 12.7 13.09 12.47C13.34 11.82 13.91 11.14 14.88 11.14C16.15 11.14 16.66 12.11 16.66 13.53V19.5H20.03V13.14H20.5Z" />
        </svg>
    );
}

export function ContactForm() {
    return (
        <section id="contact" className="pt-16 pb-8 px-6 md:px-20 bg-[#0A0A0A] border-t border-slate-900 flex flex-col items-center">
            <div className="max-w-5xl w-full flex flex-col md:flex-row justify-between items-center gap-8">

                {/* Left side: Branding / Location */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center md:items-start gap-1"
                >
                    <h2 className="text-xl font-bold tracking-[0.2em] text-slate-100 mb-2 uppercase">YUNSEO KANG</h2>
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-mono mb-1">
                        <School className="w-3.5 h-3.5" /> Hanbat National University · Computer Engineering
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
                        <MapPin className="w-3.5 h-3.5" /> Daejeon, South Korea
                    </div>
                </motion.div>

                {/* Right side: Sleek Social Links (Icons only, elegant hover) */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-4"
                >
                    <a href="https://github.com/yxxunseo" target="_blank" rel="noopener noreferrer"
                        className="p-3 group relative rounded-full hover:bg-slate-800 transition-all duration-300" aria-label="GitHub">
                        <GitHubBrandIcon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                    </a>
                    <a href="https://www.linkedin.com/in/%EC%9C%A4%EC%84%9C-%EA%B0%95-0006253a9/" target="_blank" rel="noopener noreferrer"
                        className="p-3 group relative rounded-full hover:bg-slate-800 transition-all duration-300" aria-label="LinkedIn">
                        <LinkedInBrandIcon className="w-5 h-5 text-slate-400 group-hover:text-[#0A66C2] transition-colors" />
                    </a>
                    <a href="mailto:osope@naver.com"
                        className="p-3 group relative rounded-full hover:bg-slate-800 transition-all duration-300" aria-label="Email">
                        <Mail className="w-5 h-5 text-slate-400 group-hover:text-teal-400 transition-colors" />
                    </a>
                </motion.div>
            </div>

            {/* Copyright */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-full max-w-5xl mt-12 pt-6 border-t border-slate-900/50 flex flex-col md:flex-row justify-center items-center gap-4 text-xs text-slate-600 font-mono"
            >
                <p>© {new Date().getFullYear()} Yunseo Kang. All rights reserved.</p>
            </motion.div>
        </section>
    );
}
