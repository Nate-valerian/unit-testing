import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { TodoItem } from "@/components/todo_item";

describe("TodoItem", () => {
  const mockOnToggle = jest.fn();
  const defaultTodo = {
    id: 1,
    text: "Learn React",
    completed: false,
  };

  beforeEach(() => {
    mockOnToggle.mockClear();
  });

  it("renders the todo text", () => {
    render(<TodoItem todo={defaultTodo} onToggle={mockOnToggle} />);
    const textElement = screen.getByText(/Learn React/i);
    expect(textElement).toBeInTheDocument();
  });

  it("renders checkbox with correct unchecked state", () => {
    render(<TodoItem todo={defaultTodo} onToggle={mockOnToggle} />);
    const checkbox = screen.getByTestId("todo-checkbox-1");
    expect(checkbox).not.toBeChecked();
  });

  it("renders checkbox with correct checked state", () => {
    render(
      <TodoItem
        todo={{ ...defaultTodo, completed: true }}
        onToggle={mockOnToggle}
      />,
    );
    const checkbox = screen.getByTestId("todo-checkbox-1");
    expect(checkbox).toBeChecked();
  });

  it("applies strikethrough style when todo is completed", () => {
    render(
      <TodoItem
        todo={{ ...defaultTodo, completed: true }}
        onToggle={mockOnToggle}
      />,
    );
    const textElement = screen.getByText(/Learn React/i);
    expect(textElement).toHaveClass("line-through", "text-gray-500");
  });

  it("does not apply strikethrough style when todo is not completed", () => {
    render(<TodoItem todo={defaultTodo} onToggle={mockOnToggle} />);
    const textElement = screen.getByText(/Learn React/i);
    expect(textElement).not.toHaveClass("line-through");
    expect(textElement).not.toHaveClass("text-gray-500");
  });

  it("calls onToggle with correct id when checkbox is clicked", () => {
    render(<TodoItem todo={defaultTodo} onToggle={mockOnToggle} />);
    const checkbox = screen.getByTestId("todo-checkbox-1");
    fireEvent.click(checkbox);
    expect(mockOnToggle).toHaveBeenCalledWith(1);
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });
});
