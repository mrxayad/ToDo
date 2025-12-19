import { render, screen, fireEvent } from "@testing-library/react";
import TodoModal from "./ToDoModal";

import { vi } from "vitest";

test("renders Add Task heading when no todo is passed", () => {
  render(<TodoModal userId="u1" onClose={() => {}} onSave={() => {}} />);
  expect(screen.getByText("Add Task")).toBeInTheDocument();
});

test("calls onSave when new task is added", () => {
  const handleSave = vi.fn();
  const handleClose = vi.fn();

  render(
    <TodoModal
      userId="u1"
      onClose={handleClose}
      onSave={handleSave}
    />
  );

  const input = screen.getByPlaceholderText("Task title");
  fireEvent.change(input, { target: { value: "New Task" } });

  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);

  expect(handleSave).toHaveBeenCalled();   
  expect(handleClose).toHaveBeenCalled();  
});