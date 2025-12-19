import type { User } from "../types";
import type { Todo } from "../types";

export const getUsers = (): User[] =>
  JSON.parse(localStorage.getItem("users") || "[]");

export const saveUsers = (users: User[]) =>
  localStorage.setItem("users", JSON.stringify(users));

export const getTodos = (): Todo[] =>
  JSON.parse(localStorage.getItem("todos") || "[]");

export const saveTodos = (todos: Todo[]) =>
  localStorage.setItem("todos", JSON.stringify(todos));

export const getCurrentUser = (): User | null =>
  JSON.parse(localStorage.getItem("currentUser") || "null");

export const setCurrentUser = (user: User | null) =>
  localStorage.setItem("currentUser", JSON.stringify(user));