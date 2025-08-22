import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";

describe("Header", () => {
  it("renders the app title", () => {
    render(<Header />);

    // Check heading is present and correct
    const heading = screen.getByRole("heading", {
      level: 1,
      name: /My Todo App/i,
    });
    expect(heading).toBeInTheDocument();

    // Extra check: ensure it has correct styles applied
    expect(heading).toHaveClass("text-2xl", "font-bold");
  });

  it("wraps title inside a header element", () => {
    render(<Header />);
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeInTheDocument();
    const heading = screen.getByRole("heading", { level: 1 });
    expect(headerElement).toContainElement(heading);
  });
});
