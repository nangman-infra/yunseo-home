import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProjectDisplay } from "@/domains/projects/components/ProjectDisplay";

describe("yunseo project display", () => {
  it("renders notable project awards", () => {
    render(<ProjectDisplay />);

    expect(screen.getByText("Legal Guide")).toBeInTheDocument();
    expect(screen.getByText("최우수상")).toBeInTheDocument();
    expect(screen.getByText("대상")).toBeInTheDocument();
  });
});
