"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface BlogPost {
    title: string;
    pubDate: string;
    link: string;
    description: string;
}

export function BlogFeed() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRss = async () => {
            try {
                const response = await fetch("/api/rss");
                const xmlText = await response.text();

                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, "text/xml");
                const items = xmlDoc.querySelectorAll("item");

                const parsedPosts: BlogPost[] = [];
                items.forEach((item, index) => {
                    if (index >= 4) return;
                    parsedPosts.push({
                        title: item.querySelector("title")?.textContent || "No title",
                        link: item.querySelector("link")?.textContent || "#",
                        pubDate: item.querySelector("pubDate")?.textContent || new Date().toISOString(),
                        description: item.querySelector("description")?.textContent || "",
                    });
                });

                setPosts(parsedPosts);
            } catch (error) {
                console.error("Failed to fetch or parse RSS:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRss();
    }, []);

    const stripHtml = (htmlContent: string) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlContent;
        let text = tempDiv.textContent || tempDiv.innerText || "";
        text = text.replace(/\s+/g, " ").trim();
        return text.length > 110 ? text.substring(0, 110) + "..." : text;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <section id="blog" className="py-24 px-6 md:px-20 bg-black relative min-h-[80vh]">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 border-b border-slate-900 pb-8"
                >
                    <h2 className="text-3xl font-bold tracking-[0.2em] uppercase">Blog</h2>
                </motion.div>

                <div className="space-y-4 flex flex-col items-start">
                    {loading ? (
                        <div className="w-full text-center text-slate-500 font-mono py-10 animate-pulse">
                            Fetching latest logs...
                        </div>
                    ) : posts.length > 0 ? (
                        posts.map((post, index) => (
                            <motion.a
                                key={index}
                                href={post.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.12 }}
                                whileHover={{ x: 8 }}
                                className="group block bg-slate-900/40 border border-slate-800 hover:border-blue-500/50 p-6 rounded-2xl w-full transition-all backdrop-blur-md"
                            >
                                <div className="text-xs text-blue-400/80 mb-2 font-mono tracking-widest">
                                    {formatDate(post.pubDate)}
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-slate-100 group-hover:text-amber-300 transition-colors flex items-center gap-2">
                                    {post.title}
                                    <ArrowRight className="w-5 h-5 text-transparent -translate-x-2 group-hover:text-amber-300 group-hover:translate-x-0 transition-all shrink-0" />
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{stripHtml(post.description)}</p>
                            </motion.a>
                        ))
                    ) : (
                        <div className="w-full text-center text-slate-500 font-mono py-10">No logs found.</div>
                    )}
                </div>
            </div>

            {/* 장식 요소 */}
            <div className="absolute top-1/4 -left-20 w-64 h-64 bg-slate-900 rounded-full blur-[100px] opacity-50" />
        </section>
    );
}
