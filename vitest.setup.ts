import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import React from "react";
import { afterEach, vi } from "vitest";

// globals 비활성화 상태라 RTL 자동 cleanup이 걸리지 않음
afterEach(() => {
  cleanup();
});

vi.mock("framer-motion", () => {
  const createMotionComponent = (tag: string) => {
    const MotionComponent = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
      ({ children, ...props }, ref) => React.createElement(tag, { ...props, ref }, children)
    );
    MotionComponent.displayName = `MockMotion(${tag})`;
    return MotionComponent;
  };

  return {
    AnimatePresence: ({ children }: { children?: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
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

globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
