import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CaseStudyView } from "@/domains/projects/components/CaseStudyView";
import { CASE_STUDIES, getCaseStudy } from "@/domains/projects/data/caseStudies";

describe("case study view", () => {
  it("renders role, stack and sections", () => {
    const study = getCaseStudy("ncp-guestbook-3tier")!;
    render(<CaseStudyView study={study} />);

    expect(screen.getByRole("heading", { level: 1, name: study.title })).toBeInTheDocument();
    expect(screen.getByText(study.role[0].label)).toBeInTheDocument();
    expect(screen.getByText(study.role[0].detail)).toBeInTheDocument();
    expect(screen.getByText("Terraform")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "장애 시나리오 검증" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "내 역할" }).previousSibling).toHaveTextContent("01");
    expect(screen.getByRole("heading", { name: "장애 시나리오 검증" }).previousSibling).toHaveTextContent(
      String(study.sections.length + 1).padStart(2, "0"),
    );
  });

  it("opens and closes a diagram in a zoom dialog", () => {
    render(<CaseStudyView study={getCaseStudy("geopark-architecture")!} />);

    fireEvent.click(screen.getAllByRole("button", { name: /크게 보기/ })[0]);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button", { name: /크게 보기/ })[0]);
    fireEvent.click(screen.getByRole("button", { name: "닫기" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("has unique slugs and returns undefined for unknown ones", () => {
    const slugs = CASE_STUDIES.map(({ slug }) => slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(getCaseStudy("missing")).toBeUndefined();
  });
});
