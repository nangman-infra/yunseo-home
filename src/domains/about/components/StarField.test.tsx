import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { StarField } from "@/domains/about/components/StarField";

describe("star field", () => {
  it("creates and cleans star nodes", () => {
    const getRandomValues = vi.fn((values: Uint32Array) => {
      values[0] = 1234567890;
      return values;
    });

    Object.defineProperty(globalThis, "crypto", {
      configurable: true,
      value: { getRandomValues },
    });

    const { container, unmount } = render(<StarField />);
    const host = container.firstChild as HTMLDivElement;

    expect(host.childNodes.length).toBeGreaterThan(0);

    unmount();

    expect(host.childNodes.length).toBe(0);
  });
});
