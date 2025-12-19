import React, { useState } from "react";
import { todoSchema } from "../utils/validation";
import type { Todo } from "../types";
import { v4 as uuid } from "uuid";
import { getTodos, saveTodos } from "../utils/localStorage";
import { toast } from "react-hot-toast";

interface Props {
  userId: string;
  onClose: () => void;
  onSave: () => void;
  todo?: Todo;
}

const TodoModal: React.FC<Props> = ({ userId, onClose, onSave, todo }) => {
  const [title, setTitle] = useState(todo?.title || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = todoSchema.safeParse({ title });
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    const todos = getTodos();
    if (todo) {
      // edit
      const updated = todos.map(t =>
        t.id === todo.id ? { ...t, title } : t
      );
      saveTodos(updated);
      toast.success("Task updated!");
    } else {
      // add
      const newTodo: Todo = {
        id: uuid(),
        userId,
        title,
        status: "pending",
        createdAt: Date.now(),
      };
      saveTodos([...todos, newTodo]);
      toast.success("Task added!");
    }
    onSave();
    onClose();
  };

  return (
     <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">

      <form onSubmit={handleSubmit} className="bg-white w-full max-w-sm p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          {todo ? "Edit Task" : "Add Task"}
        </h2>

        <input
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"

          placeholder="Task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition">
            Cancel
          </button>
          <button type="submit"  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoModal;