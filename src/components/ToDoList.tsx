import React, { useState, useEffect } from "react";
import type { Todo } from "../types";
import { getTodos, saveTodos } from "../utils/localStorage";
import TodoModal from "./ToDoModal";

interface Props {
  userId: string;
}

const TodoList: React.FC<Props> = ({ userId }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const all = getTodos();
    setTodos(all.filter(t => t.userId === userId));
  }, [userId]);

  const refresh = () => {
    const all = getTodos();
    setTodos(all.filter(t => t.userId === userId));
  };

  const toggleStatus = (id: string) => {
    const updated:Todo[] = todos.map(t =>
      t.id === id ? { ...t, status: t.status === "pending" ? "completed" : "pending" } : t
    );
    saveTodos(updated);
    refresh();
  };

  const deleteTodo = (id: string) => {
    const updated = todos.filter(t => t.id !== id);
    saveTodos(updated);
    refresh();
  };

  return (
    <div className="mt-4">
      <button
        onClick={() => { setEditTodo(null); setShowModal(true); }}
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        Add Task
      </button>

      <ul className="space-y-2">
        {todos.sort((a, b) => a.status === "completed" ? 1 : -1).map(todo => (
          <li key={todo.id} className="flex justify-between items-center bg-white p-3 rounded shadow-sm">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.status === "completed"}
                onChange={() => toggleStatus(todo.id)}
                className="mr-2"
              />
              <span className={todo.status === "completed" ? "line-through" : ""}>
                {todo.title}
              </span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setEditTodo(todo); setShowModal(true); }} className="bg-blue-500 text-white px-2 py-1 hover:bg-blue-600">Edit</button>
              <button onClick={() => deleteTodo(todo.id)} className="bg-red-500 text-white px-2 py-1 hover:bg-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {showModal && (
        <TodoModal
          userId={userId}
          todo={editTodo || undefined}
          onClose={() => setShowModal(false)}
          onSave={refresh}
        />
      )}
    </div>
  );
};

export default TodoList;