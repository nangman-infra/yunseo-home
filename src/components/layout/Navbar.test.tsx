import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Navbar } from "@/components/layout/Navbar";

const pathnameMock = vi.hoisted(() => ({ value: "/" }));

vi.mock("next/navigation", () => ({
  usePathname: () => pathnameMock.value,
}));

function addSection(id: string, top: number) {
  const el = document.createElement("section");
  el.id = id;
  el.getBoundingClientRect = () => ({ top }) as DOMRect;
  document.body.appendChild(el);
  return el;
}

function activeLinks() {
  return screen
    .getAllByRole("link")
    .filter((link) => link.className.split(/\s+/).includes("text-amber-400"))
    .map((link) => link.textContent);
}

describe("navbar active section", () => {
  beforeEach(() => {
    pathnameMock.value = "/";
    Object.defineProperty(window, "innerHeight", { value: 1000, configurable: true });
    Object.defineProperty(document.documentElement, "scrollHeight", { value: 5000, configurable: true });
    window.scrollY = 0;
  });

  afterEach(() => {
    document.querySelectorAll("section").forEach((el) => el.remove());
  });

  it("highlights the section that crossed the 40% line", () => {
    addSection("about", -800);
    addSection("projects", -200);
    addSection("experience", 300);
    addSection("blog", 1200);
    addSection("contact", 2000);

    render(<Navbar />);

    expect(activeLinks()).toEqual(["Experience"]);
  });

  it("highlights the last section at the bottom of the page", () => {
    addSection("about", -3000);
    addSection("blog", -100);
    addSection("contact", 600);
    window.scrollY = 4000;

    render(<Navbar />);
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(activeLinks()).toEqual(["Contact"]);
  });

  it("highlights projects on a project detail page", () => {
    pathnameMock.value = "/projects/geopark-architecture";

    render(<Navbar />);

    expect(activeLinks()).toEqual(["Projects"]);
  });
});
