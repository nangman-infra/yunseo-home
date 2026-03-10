"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Github, Linkedin, School } from "lucide-react";

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
                        <Github className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                    </a>
                    <a href="https://www.linkedin.com/in/%EC%9C%A4%EC%84%9C-%EA%B0%95-0006253a9/" target="_blank" rel="noopener noreferrer"
                        className="p-3 group relative rounded-full hover:bg-slate-800 transition-all duration-300" aria-label="LinkedIn">
                        <Linkedin className="w-5 h-5 text-slate-400 group-hover:text-[#0A66C2] transition-colors" />
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
