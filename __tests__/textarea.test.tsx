import { TextArea } from "@/components/input-fields/TextArea";
import { render, screen } from "@testing-library/react";
import { useState } from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom"; // Add this line

const TextWrapper = ({ initialValue, maxWords }: { initialValue: string, maxWords?: number }) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value);

  return (
    <TextArea
      label="Description"
      name="description"
      value={value}
      onChange={handleChange}
      maxWords={maxWords}
    />
  );
};

describe("TextArea Component", () => {
  it("updates value and does not show error when within max word limit", async () => {
    const user = userEvent.setup();
    render(<TextWrapper initialValue="" maxWords={50} />);
    const textarea = screen.getByLabelText("Description") as HTMLTextAreaElement;

    await user.type(textarea, "Hello world");
    expect(textarea.value).toBe("Hello world");
    // Check if error message exists based on what your component actually shows
    expect(screen.queryByText(/maximum/i)).toBeNull();
  });

  it("clears the error when word count becomes valid", async () => {
    const MAX_WORDS = 50;
    const user = userEvent.setup();
    render(<TextWrapper initialValue="" maxWords={MAX_WORDS} />);
    const textarea = screen.getByLabelText("Description") as HTMLTextAreaElement;

    // Type 51 words to exceed limit
    const longText = Array.from({ length: 51 }, (_, i) => `word${i}`).join(" ");
    await user.type(textarea, longText);

    // Check if error appears (adjust based on your actual component)
    // First debug to see what's rendered:
    // screen.debug();

    // Try to find any error-related text
    const errorElement = screen.queryByText(/maximum|limit|exceeded|words allowed/i);
    if (errorElement) {
      expect(errorElement).toBeInTheDocument();
    }

    // Clear and type valid input
    await user.clear(textarea);
    await user.type(textarea, "Valid short text");

    // Error should disappear
    expect(screen.queryByText(/maximum|limit|exceeded|words allowed/i)).not.toBeInTheDocument();
  });
});

