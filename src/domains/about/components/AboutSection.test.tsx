import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AboutSection } from "@/domains/about/components/AboutSection";

describe("about section", () => {
  it("renders intro, profile, skills and awards", () => {
    render(<AboutSection />);

    expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument();
    expect(screen.getByText("국립한밭대학교")).toBeInTheDocument();
    expect(screen.getByText("Terraform")).toBeInTheDocument();
    expect(screen.getByText("2025 유성 데이터 기반 실증 리빙랩")).toBeInTheDocument();
    expect(screen.getAllByText("대상")).toHaveLength(2);
  });
});
