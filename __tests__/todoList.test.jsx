import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { TodoList } from "@/components/todo_list";
import { TodoItem } from "@/components/todo_item";

// Mock the TodoItem component to track its props and rendering
jest.mock("@/components/todo_item", () => ({
  TodoItem: jest.fn(({ todo, onToggle }) => (
    <li data-testid={`todo-item-${todo.id}`}>Mocked TodoItem: {todo.text}</li>
  )),
}));

describe("TodoList", () => {
  const mockOnToggle = jest.fn();
  const sampleTodos = [
    { id: 1, text: "Learn Next.js", completed: false },
    { id: 2, text: "Write unit tests", completed: true },
  ];

  it("renders 'No todos yet!' message when todos array is empty", () => {
    render(<TodoList todos={[]} onToggle={mockOnToggle} />);
    const emptyMessage = screen.getByText(/No todos yet!/i);
    expect(emptyMessage).toBeInTheDocument();
    expect(emptyMessage).toHaveClass("text-gray-500", "text-center");
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("renders a list with correct number of TodoItem components when todos are provided", () => {
    render(<TodoList todos={sampleTodos} onToggle={mockOnToggle} />);
    const listElement = screen.getByRole("list");
    expect(listElement).toBeInTheDocument();
    const todoItems = screen.getAllByTestId(/todo-item-/);
    expect(todoItems).toHaveLength(2);
  });

  it("passes correct props to TodoItem components", () => {
    render(<TodoList todos={sampleTodos} onToggle={mockOnToggle} />);
    expect(TodoItem).toHaveBeenCalledTimes(2);

    const firstCallProps = TodoItem.mock.calls[0][0];
    expect(firstCallProps).toEqual({
      todo: sampleTodos[0],
      onToggle: mockOnToggle,
    });

    const secondCallProps = TodoItem.mock.calls[1][0];
    expect(secondCallProps).toEqual({
      todo: sampleTodos[1],
      onToggle: mockOnToggle,
    });
  });

  it("does not render empty message when todos are provided", () => {
    render(<TodoList todos={sampleTodos} onToggle={mockOnToggle} />);
    expect(screen.queryByText(/No todos yet!/i)).not.toBeInTheDocument();
  });
});
