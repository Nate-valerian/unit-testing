"use client";

import React, { useState } from "react";
import { Todo } from "@/components/todo_item";
import Header from "@/components/header";
import { TodoList } from "@/components/todo_list";

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn Next.js", completed: false },
    { id: 2, text: "Write unit tests", completed: false },
  ]);

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  return (
    <main className="w-full min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-2xl bg-gray-900 border rounded-2xl shadow-lg p-6">
        <Header />
        <TodoList todos={todos} onToggle={toggleTodo} />
      </div>
    </main>
  );
}
