import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProjectDisplay } from "@/domains/projects/components/ProjectDisplay";

describe("yunseo project display", () => {
  it("renders projects without award badges", () => {
    render(<ProjectDisplay />);

    expect(screen.getByText("Legal Guide")).toBeInTheDocument();
    expect(screen.queryByText("최우수상")).not.toBeInTheDocument();
    expect(screen.queryByText("대상")).not.toBeInTheDocument();
  });

  it("links featured case studies to their detail pages", () => {
    render(<ProjectDisplay />);

    const link = screen.getByRole("link", { name: /멀티클라우드 재해복구/ });
    expect(link).toHaveAttribute("href", "/projects/multicloud-dr");
    expect(screen.getByRole("link", { name: /지질공원/ })).toHaveAttribute("href", "/projects/geopark-architecture");
  });
});
