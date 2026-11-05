import type { Variants } from "framer-motion";

// 항목이 하나씩 흩뿌려지듯 나타나게
export const scatter: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
};

export const speck: Variants = {
    hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } },
};

export const inView = { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-60px" } } as const;
