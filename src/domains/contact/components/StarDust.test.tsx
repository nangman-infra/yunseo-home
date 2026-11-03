import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { createDust, dustAlpha, gutterWidth, stepDust, StarDust } from "@/domains/contact/components/StarDust";

const sequence = (...values: number[]) => {
  let i = 0;
  return () => values[i++ % values.length];
};

describe("star dust particles", () => {
  it("spawns below the bottom edge and rises upward", () => {
    const dust = createDust(1000, 600, sequence(0.5));

    expect(dust.y).toBeGreaterThanOrEqual(600);
    expect(dust.vy).toBeGreaterThan(0);

    const startX = dust.x;
    const startY = dust.y;
    expect(stepDust(dust, 0.5)).toBe(true);
    expect(dust.y).toBeLessThan(startY);
    expect(dust.x).toBe(startX);
  });

  it("spawns only in the left and right gutters, never over the content", () => {
    const width = 1500;
    const gutter = gutterWidth(width);
    const left = createDust(width, 600, sequence(0.2, 0.9, 0.5));
    const right = createDust(width, 600, sequence(0.8, 0.9, 0.5));

    expect(left.x).toBeLessThanOrEqual(gutter);
    expect(right.x).toBeGreaterThanOrEqual(width - gutter);
    expect(gutterWidth(390)).toBe(24);
  });

  it("gives each particle its own fade-in and fade-out timing", () => {
    const fast = createDust(1000, 600, sequence(0.1));
    const slow = createDust(1000, 600, sequence(0.9));

    expect(fast.fadeIn / fast.life).not.toBeCloseTo(slow.fadeIn / slow.life);
    expect(fast.fadeOut / fast.life).not.toBeCloseTo(slow.fadeOut / slow.life);
  });

  it("fades in, holds its peak, then fades out", () => {
    const dust = createDust(1000, 600, sequence(0.5));

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

  it("expires once its life is over", () => {
    const dust = createDust(1000, 600, sequence(0.5));
    expect(stepDust(dust, dust.life + 1)).toBe(false);
  });
});

describe("star dust canvas", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("renders a decorative canvas even without a 2d context", () => {
    const { container } = render(<StarDust />);
    const canvas = container.querySelector("canvas");

    expect(canvas).toHaveAttribute("aria-hidden", "true");
  });

  it("animates particles and cleans up on unmount", () => {
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
    vi.spyOn(HTMLCanvasElement.prototype, "clientWidth", "get").mockReturnValue(900);
    vi.spyOn(HTMLCanvasElement.prototype, "clientHeight", "get").mockReturnValue(600);
    vi.stubGlobal("crypto", {
      getRandomValues: (values: Uint32Array) => {
        values[0] = 0;
        return values;
      },
    });

    const frames: FrameRequestCallback[] = [];
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => frames.push(cb));
    const cancel = vi.fn();
    vi.stubGlobal("cancelAnimationFrame", cancel);

    const { unmount } = render(<StarDust />);

    let now = 0;
    for (let i = 0; i < 30; i++) {
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
