export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

export type TodoStatus = 'pending' | 'completed';

export interface Todo {
  id: string;
  userId: string;
  title: string;
  status: TodoStatus;
  createdAt: number;
}