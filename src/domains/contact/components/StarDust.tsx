"use client";

import { useEffect, useRef } from "react";

export type Dust = {
    x: number;
    y: number;
    vy: number;
    tail: number;
    width: number;
    peak: number;
    hue: string;
    age: number;
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

export function gutterWidth(width: number) {
    return Math.max(MIN_GUTTER, (width - CONTENT_WIDTH) / 2 - 16);
}

// 좌우 여백 바닥에서 태어나 곧게 위로 떠오르는 입자 하나. 페이드 인/아웃 시간을 입자마다 다르게 준다.
export function createDust(width: number, height: number, random: Random = cryptoRandom): Dust {
    const gutter = Math.min(gutterWidth(width), width / 2);
    const onLeft = random() < 0.5;
    const offset = random() * gutter;
    const vy = between(random, 30, 110);
    const life = between(random, 0.45, 0.95) * (height / vy);
    return {
        x: onLeft ? offset : width - offset,
        y: height + between(random, 0, 40),
        vy,
        tail: between(random, 18, 80),
        width: between(random, 0.6, 1.8),
        peak: between(random, 0.35, 0.95),
        hue: HUES[Math.floor(random() * HUES.length)],
        age: 0,
        life,
        fadeIn: life * between(random, 0.08, 0.35),
        fadeOut: life * between(random, 0.2, 0.55),
    };
}

export function dustAlpha(dust: Dust) {
    if (dust.age <= 0 || dust.age >= dust.life) return 0;
    const fadeIn = Math.min(1, dust.age / dust.fadeIn);
    const fadeOut = Math.min(1, (dust.life - dust.age) / dust.fadeOut);
    return dust.peak * Math.min(fadeIn, fadeOut);
}

export function stepDust(dust: Dust, dt: number) {
    dust.age += dt;
    dust.y -= dust.vy * dt;
    return dust.age < dust.life;
}

function drawDust(ctx: CanvasRenderingContext2D, dust: Dust) {
    const alpha = dustAlpha(dust);
    if (alpha <= 0) return;

    // 꼬리: 머리(현재 투명도) → 아래쪽 끝(0)으로 그라데이션
    const tailY = dust.y + dust.tail;
    const gradient = ctx.createLinearGradient(dust.x, dust.y, dust.x, tailY);
    gradient.addColorStop(0, `rgba(${dust.hue}, ${alpha})`);
    gradient.addColorStop(1, `rgba(${dust.hue}, 0)`);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = dust.width;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(dust.x, dust.y);
    ctx.lineTo(dust.x, tailY);
    ctx.stroke();

    ctx.fillStyle = `rgba(${dust.hue}, ${alpha})`;
    ctx.shadowColor = `rgba(${dust.hue}, ${alpha})`;
    ctx.shadowBlur = dust.width * 6;
    ctx.beginPath();
    ctx.arc(dust.x, dust.y, dust.width, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
}

export function StarDust() {
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
        let visible = true;
        let dusts: Dust[] = [];

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

            const target = Math.min(40, Math.round((gutterWidth(width) * 2) / 18));
            if (dusts.length < target && cryptoRandom() < 0.35) dusts.push(createDust(width, height));

            ctx.clearRect(0, 0, width, height);
            dusts = dusts.filter((dust) => stepDust(dust, dt));
            dusts.forEach((dust) => drawDust(ctx, dust));

            frame = visible ? requestAnimationFrame(tick) : 0;
        };

        const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible && !frame) {
                last = 0;
                frame = requestAnimationFrame(tick);
            }
        });

        resize();
        globalThis.addEventListener("resize", resize);
        observer.observe(canvas);
        frame = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
            globalThis.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[75vh] w-full [mask-image:linear-gradient(to_top,black_35%,transparent)]"
        />
    );
}
