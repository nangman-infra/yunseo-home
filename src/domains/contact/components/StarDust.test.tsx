import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  createDust,
  dustAlpha,
  dustPerScreen,
  gutterWidth,
  seedDust,
  stepDust,
  StarDust,
  topFade,
} from "@/domains/contact/components/StarDust";

const sequence = (...values: number[]) => {
  let i = 0;
  return () => values[i++ % values.length];
};

const TOP = 1000;
const BOTTOM = 6000;

describe("star dust particles", () => {
  it("spawns at the page bottom and rises straight up", () => {
    const dust = createDust(1500, TOP, BOTTOM, sequence(0.5));

    expect(dust.y).toBeGreaterThanOrEqual(BOTTOM);
    expect(dust.vy).toBeGreaterThan(0);

    const startX = dust.x;
    const startY = dust.y;
    expect(stepDust(dust, 0.5, TOP)).toBe(true);
    expect(dust.y).toBeLessThan(startY);
    expect(dust.x).toBe(startX);
  });

  it("spawns only in the left and right gutters, never over the content", () => {
    const width = 1500;
    const gutter = gutterWidth(width);
    const left = createDust(width, TOP, BOTTOM, sequence(0.2, 0.9, 0.5));
    const right = createDust(width, TOP, BOTTOM, sequence(0.8, 0.9, 0.5));

    expect(left.x).toBeLessThanOrEqual(gutter);
    expect(right.x).toBeGreaterThanOrEqual(width - gutter);
    expect(gutterWidth(390)).toBe(24);
  });

  it("keeps only a few stars per screen", () => {
    expect(dustPerScreen(1500)).toBeLessThanOrEqual(8);
    expect(dustPerScreen(390)).toBe(2);
  });

  it("gives each particle its own fade-in and fade-out timing", () => {
    const fast = createDust(1500, 5000, BOTTOM, sequence(0.1));
    const slow = createDust(1500, 5000, BOTTOM, sequence(0.9));

    expect(fast.fadeIn / fast.life).not.toBeCloseTo(slow.fadeIn / slow.life);
    expect(fast.fadeOut / fast.life).not.toBeCloseTo(slow.fadeOut / slow.life);
  });

  it("fades in, holds its peak, then fades out", () => {
    const dust = createDust(1500, TOP, BOTTOM, sequence(0.5));

    expect(dustAlpha(dust)).toBe(0);
    dust.age = dust.fadeIn / 2;
    expect(dustAlpha(dust)).toBeCloseTo(dust.peak / 2);
    dust.age = dust.fadeIn;
    expect(dustAlpha(dust)).toBeCloseTo(dust.peak);
    dust.age = dust.life - dust.fadeOut / 2;
    expect(dustAlpha(dust)).toBeCloseTo(dust.peak / 2);
    dust.age = dust.life;
    expect(dustAlpha(dust)).toBe(0);
  });

  it("seeds a star mid-flight that still fades in from zero", () => {
    const dust = seedDust(createDust(1500, TOP, BOTTOM, sequence(0.5)), sequence(0.5));

    expect(dust.y).toBeLessThan(BOTTOM);
    expect(dust.y).toBeGreaterThan(TOP);
    expect(dustAlpha(dust)).toBe(0);
    dust.age += dust.fadeIn;
    expect(dustAlpha(dust)).toBeCloseTo(dust.peak);
  });

  it("fades out near the About section and stops there", () => {
    expect(topFade(TOP, TOP)).toBe(0);
    expect(topFade(TOP + 130, TOP)).toBeCloseTo(0.5);
    expect(topFade(TOP + 1000, TOP)).toBe(1);

    const dust = createDust(1500, TOP, BOTTOM, sequence(0.5));
    dust.y = TOP + 1;
    expect(stepDust(dust, 0.1, TOP)).toBe(false);
  });

  it("expires once its life is over", () => {
    const dust = createDust(1500, TOP, BOTTOM, sequence(0.5));
    expect(stepDust(dust, dust.life + 1, TOP)).toBe(false);
  });
});

describe("star dust canvas", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    document.getElementById("about")?.remove();
  });

  it("renders a decorative canvas even without a 2d context", () => {
    const { container } = render(<StarDust />);
    const canvas = container.querySelector("canvas");

    expect(canvas).toHaveAttribute("aria-hidden", "true");
  });

  it("draws stars in view and cleans up on unmount", () => {
    const about = document.createElement("section");
    about.id = "about";
    about.getBoundingClientRect = () => ({ top: 0 }) as DOMRect;
    document.body.appendChild(about);
    Object.defineProperty(document.documentElement, "scrollHeight", { value: 1200, configurable: true });

    const gradient = { addColorStop: vi.fn() };
    const ctx = {
      setTransform: vi.fn(),
      clearRect: vi.fn(),
      createLinearGradient: vi.fn(() => gradient),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      stroke: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
    };
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(ctx as never);
    vi.spyOn(HTMLCanvasElement.prototype, "clientWidth", "get").mockReturnValue(1500);
    vi.spyOn(HTMLCanvasElement.prototype, "clientHeight", "get").mockReturnValue(800);
    vi.stubGlobal("crypto", {
      getRandomValues: (values: Uint32Array) => {
        values[0] = 0x80000000;
        return values;
      },
    });

    const frames: FrameRequestCallback[] = [];
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => frames.push(cb));
    const cancel = vi.fn();
    vi.stubGlobal("cancelAnimationFrame", cancel);

    const { unmount } = render(<StarDust />);

    let now = 0;
    for (let i = 0; i < 240; i++) {
      now += 16;
      frames.shift()?.(now);
    }

    expect(ctx.clearRect).toHaveBeenCalled();
    expect(ctx.createLinearGradient).toHaveBeenCalled();
    expect(gradient.addColorStop).toHaveBeenCalledWith(1, expect.stringContaining(", 0)"));

    unmount();
    expect(cancel).toHaveBeenCalled();
  });

  it("stays still when the user prefers reduced motion", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({} as never);
    vi.stubGlobal("matchMedia", () => ({ matches: true }));
    const raf = vi.fn();
    vi.stubGlobal("requestAnimationFrame", raf);

    render(<StarDust />);

    expect(raf).not.toHaveBeenCalled();
  });
});
