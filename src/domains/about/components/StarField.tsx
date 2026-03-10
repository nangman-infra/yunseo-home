"use client";

import { useEffect, useRef } from "react";

// Inject keyframe styles exactly once
function injectStyles() {
    if (document.getElementById("starfield-styles")) return;
    const style = document.createElement("style");
    style.id = "starfield-styles";
    style.textContent = `
        @keyframes twinkle-glow {
            0%   { opacity: 0.5;  transform: scale(0.95); }
            100% { opacity: 0.9;  transform: scale(1.1); }
        }
        @keyframes star-spin {
            0%   { opacity: 0.45; transform: scale(0.95) rotate(0deg); }
            100% { opacity: 0.9;  transform: scale(1.15) rotate(15deg); }
        }
        .star-dot {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            animation: twinkle-glow var(--dur) ease-in-out var(--delay) infinite alternate;
        }
        .star-4pt {
            position: absolute;
            pointer-events: none;
            /* 4-pointed diamond/cross star shape */
            clip-path: polygon(50% 0%, 55% 42%, 100% 50%, 55% 58%, 50% 100%, 45% 58%, 0% 50%, 45% 42%);
            animation: star-spin var(--dur) ease-in-out var(--delay) infinite alternate;
        }
    `;
    document.head.appendChild(style);
}

export function StarField() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        injectStyles();

        const fragment = document.createDocumentFragment();

        // --- Type 1: Glowing dots (70) ---
        for (let i = 0; i < 70; i++) {
            const el = document.createElement("div");
            el.className = "star-dot";

            const size = Math.random() * 2.2 + 0.5;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const dur = (Math.random() * 5 + 6).toFixed(2) + "s";  // 6s ~ 11s (slow)
            const delay = (Math.random() * 10).toFixed(2) + "s";    // spread over 10s

            // Color: mostly white, some faint blue/cyan
            const hue = Math.random() < 0.25 ? `190, 220, 255` : `255, 255, 255`;
            const glowSize = (size * 3).toFixed(1);
            const glowSize2 = (size * 6).toFixed(1);

            el.style.cssText = `
                left: ${x}%;
                top: ${y}%;
                width: ${size}px;
                height: ${size}px;
                background: rgb(${hue});
                box-shadow:
                    0 0 ${glowSize}px 1px rgba(${hue}, 0.9),
                    0 0 ${glowSize2}px 2px rgba(${hue}, 0.4);
                --dur: ${dur};
                --delay: ${delay};
            `;
            fragment.appendChild(el);
        }

        // --- Type 2: 4-pointed stars (12 total) ---
        for (let i = 0; i < 12; i++) {
            const el = document.createElement("div");
            el.className = "star-4pt";

            const size = Math.random() * 6 + 4; // 4px ~ 10px
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const dur = (Math.random() * 5 + 7).toFixed(2) + "s";  // 7s ~ 12s (very slow)
            const delay = (Math.random() * 10).toFixed(2) + "s";
            const hue = Math.random() < 0.3 ? `190, 230, 255` : `255, 255, 255`;

            el.style.cssText = `
                left: ${x}%;
                top: ${y}%;
                width: ${size}px;
                height: ${size}px;
                background: rgba(${hue}, 0.85);
                filter: drop-shadow(0 0 ${(size * 0.6).toFixed(1)}px rgba(${hue}, 0.8));
                --dur: ${dur};
                --delay: ${delay};
            `;
            fragment.appendChild(el);
        }

        container.appendChild(fragment);

        return () => {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        />
    );
}
