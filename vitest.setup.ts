import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

vi.mock("framer-motion", () => {
  const createMotionComponent = (tag: string) => {
    const MotionComponent = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
      ({ children, ...props }, ref) => React.createElement(tag, { ...props, ref }, children)
    );
    MotionComponent.displayName = `MockMotion(${tag})`;
    return MotionComponent;
  };

  return {
    motion: new Proxy(
      {},
      {
        get: (_, tag) => createMotionComponent(String(tag)),
      }
    ),
  };
});

vi.mock("next/dynamic", () => ({
  default: () => (props: Record<string, unknown>) => React.createElement("div", props),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: React.ReactNode }) =>
    React.createElement("a", { href, ...props }, children),
}));

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

globalThis.IntersectionObserver = MockIntersectionObserver as typeof IntersectionObserver;
