"use client";

import { useEffect, useRef } from "react";

// 위치는 모두 문서 기준 좌표(px). 화면에 그릴 때만 스크롤만큼 뺀다.
export type Dust = {
    x: number;
    y: number;
    vy: number;
    tail: number;
    width: number;
    peak: number;
    hue: string;
    age: number;
    start: number;
    life: number;
    fadeIn: number;
    fadeOut: number;
};

type Random = () => number;

function cryptoRandom() {
    const values = new Uint32Array(1);
    globalThis.crypto.getRandomValues(values);
    return values[0] / (0xffffffff + 1);
}

function between(random: Random, min: number, max: number) {
    return min + random() * (max - min);
}

const HUES = ["255, 255, 255", "190, 220, 255", "255, 236, 200"];

// 가운데 콘텐츠(max-w-5xl) 바깥의 좌우 여백 폭
const CONTENT_WIDTH = 1024;
const MIN_GUTTER = 24;
// 맨 위(About 시작점) 근처에서 서서히 사라지는 구간
const TOP_FADE = 260;

export function gutterWidth(width: number) {
    return Math.max(MIN_GUTTER, (width - CONTENT_WIDTH) / 2 - 16);
}

// 한 화면 높이에 동시에 보이는 별 수
export function dustPerScreen(width: number) {
    return Math.min(8, Math.max(2, Math.round((gutterWidth(width) * 2) / 55)));
}

// 페이지 맨 아래(bottom)에서 태어나 About 시작점(top)을 향해 곧게 떠오르는 입자 하나.
// 페이드 인/아웃 시간을 입자마다 다르게 준다.
export function createDust(width: number, top: number, bottom: number, random: Random = cryptoRandom): Dust {
    const gutter = Math.min(gutterWidth(width), width / 2);
    const onLeft = random() < 0.5;
    const offset = random() * gutter;
    const vy = between(random, 70, 190);
    const life = between(random, 0.55, 1) * (Math.max(bottom - top, 1) / vy);
    return {
        x: onLeft ? offset : width - offset,
        y: bottom + between(random, 0, 40),
        vy,
        tail: between(random, 18, 80),
        width: between(random, 0.6, 1.8),
        peak: between(random, 0.35, 0.9),
        hue: HUES[Math.floor(random() * HUES.length)],
        age: 0,
        start: 0,
        life,
        fadeIn: Math.min(4, life * between(random, 0.04, 0.2)),
        fadeOut: Math.min(6, life * between(random, 0.1, 0.35)),
    };
}

// 처음 열었을 때 바닥에만 몰려 있지 않도록, 이미 날아가던 중인 상태에서 시작한다.
export function seedDust(dust: Dust, random: Random = cryptoRandom) {
    dust.age = random() * dust.life * 0.9;
    dust.start = dust.age;
    dust.y -= dust.vy * dust.age;
    return dust;
}

export function dustAlpha(dust: Dust) {
    if (dust.age <= dust.start || dust.age >= dust.life) return 0;
    const fadeIn = Math.min(1, (dust.age - dust.start) / dust.fadeIn);
    const fadeOut = Math.min(1, (dust.life - dust.age) / dust.fadeOut);
    return dust.peak * Math.min(fadeIn, fadeOut);
}

export function topFade(y: number, top: number) {
    return Math.min(1, Math.max(0, (y - top) / TOP_FADE));
}

export function stepDust(dust: Dust, dt: number, top: number) {
    dust.age += dt;
    dust.y -= dust.vy * dt;
    return dust.age < dust.life && dust.y > top;
}

function drawDust(ctx: CanvasRenderingContext2D, dust: Dust, top: number, scrollY: number) {
    const alpha = dustAlpha(dust) * topFade(dust.y, top);
    if (alpha <= 0) return;

    const y = dust.y - scrollY;
    // 꼬리: 머리(현재 투명도) → 아래쪽 끝(0)으로 그라데이션
    const tailY = y + dust.tail;
    const gradient = ctx.createLinearGradient(dust.x, y, dust.x, tailY);
    gradient.addColorStop(0, `rgba(${dust.hue}, ${alpha})`);
    gradient.addColorStop(1, `rgba(${dust.hue}, 0)`);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = dust.width;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(dust.x, y);
    ctx.lineTo(dust.x, tailY);
    ctx.stroke();

    ctx.fillStyle = `rgba(${dust.hue}, ${alpha})`;
    ctx.shadowColor = `rgba(${dust.hue}, ${alpha})`;
    ctx.shadowBlur = dust.width * 6;
    ctx.beginPath();
    ctx.arc(dust.x, y, dust.width, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
}

// topId 섹션 시작점부터 페이지 맨 아래까지, 좌우 여백에서 별이 떠오른다.
export function StarDust({ topId = "about" }: Readonly<{ topId?: string }>) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;
        if (globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

        let width = 0;
        let height = 0;
        let frame = 0;
        let last = 0;
        let warming = true;
        let dusts: Dust[] = [];

        const region = () => {
            const anchor = document.getElementById(topId);
            const top = anchor ? anchor.getBoundingClientRect().top + globalThis.scrollY : 0;
            return { top, bottom: document.documentElement.scrollHeight };
        };

        const resize = () => {
            const ratio = globalThis.devicePixelRatio || 1;
            width = canvas.clientWidth;
            height = canvas.clientHeight;
            canvas.width = width * ratio;
            canvas.height = height * ratio;
            ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        };

        const tick = (now: number) => {
            const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
            last = now;

            const { top, bottom } = region();
            const screens = Math.max(bottom - top, 0) / Math.max(height, 1);
            const target = Math.round(dustPerScreen(width) * screens);
            if (dusts.length < target) {
                const dust = createDust(width, top, bottom);
                dusts.push(warming ? seedDust(dust) : dust);
            } else {
                warming = false;
            }

            ctx.clearRect(0, 0, width, height);
            dusts = dusts.filter((dust) => stepDust(dust, dt, top));
            const scrollY = globalThis.scrollY;
            dusts.forEach((dust) => {
                const y = dust.y - scrollY;
                if (y > -dust.tail && y < height + dust.tail) drawDust(ctx, dust, top, scrollY);
            });

            frame = requestAnimationFrame(tick);
        };

        resize();
        globalThis.addEventListener("resize", resize);
        frame = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(frame);
            globalThis.removeEventListener("resize", resize);
        };
    }, [topId]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-30 h-screen w-full"
        />
    );
}
