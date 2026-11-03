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

    expect(screen.getByRole("link", { name: /방명록/ })).toHaveAttribute("href", "/projects/ncp-guestbook-3tier");
    expect(screen.getByRole("link", { name: /지질공원/ })).toHaveAttribute("href", "/projects/geopark-architecture");
  });

  it("lists the DR project under other projects without a detail link", () => {
    render(<ProjectDisplay />);

    expect(screen.getByText("NCP–GCP 멀티클라우드 재해복구(DR)")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /멀티클라우드 재해복구/ })).not.toBeInTheDocument();
  });
});
