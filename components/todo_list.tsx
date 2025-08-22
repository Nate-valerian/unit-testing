import { TodoItem, Todo } from "./todo_item";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onToggle }) => {
  if (todos.length === 0) {
    return <p className="text-gray-500 text-center">No todos yet!</p>;
  }

  return (
    <ul className="p-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  );
};
