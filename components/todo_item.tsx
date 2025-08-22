export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle }) => {
  return (
    <li className="flex items-center gap-2 py-1">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        data-testid={`todo-checkbox-${todo.id}`}
      />
      <span className={todo.completed ? "line-through text-gray-500" : ""}>
        {todo.text}
      </span>
    </li>
  );
};
