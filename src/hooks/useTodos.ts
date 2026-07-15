import { useCallback, useEffect, useState } from 'react';
import type { Todo } from '@/types/todo';

const STORAGE_KEY = 'my-tasks:todos:v1';

function loadFromStorage(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (t): t is Todo =>
        t &&
        typeof t.id === 'string' &&
        typeof t.title === 'string' &&
        typeof t.completed === 'boolean' &&
        typeof t.createdAt === 'number',
    );
  } catch {
    return [];
  }
}

function makeId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => loadFromStorage());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // storage unavailable — ignore
    }
  }, [todos]);

  const addTodo = useCallback((title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      ...prev,
      {
        id: makeId(),
        title: trimmed,
        completed: false,
        createdAt: Date.now(),
      },
    ]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }, []);

  const editTodo = useCallback((id: string, title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: trimmed } : t)),
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }, []);

  return { todos, addTodo, toggleTodo, editTodo, deleteTodo, clearCompleted };
}
