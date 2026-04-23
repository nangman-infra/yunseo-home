import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ContactForm } from "@/domains/contact/components/ContactForm";

describe("contact form", () => {
  it("renders social and contact links", () => {
    render(<ContactForm />);

    expect(screen.getByText("YUNSEO KANG")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "GitHub" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "LinkedIn" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Email" })).toBeInTheDocument();
  });
});
