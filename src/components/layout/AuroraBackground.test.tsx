import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AuroraBackground } from "@/components/layout/AuroraBackground";

describe("aurora background", () => {
  it("renders decorative blobs behind the page", () => {
    const { container } = render(<AuroraBackground />);
    const layer = container.firstChild as HTMLElement;

    expect(layer).toHaveAttribute("aria-hidden", "true");
    expect(layer.className).toContain("-z-10");
    expect(layer.querySelectorAll(".aurora-blob").length).toBeGreaterThan(0);
  });
});
