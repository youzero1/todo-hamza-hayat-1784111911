import { useCallback, useEffect, useState } from 'react';
import type { Todo } from '@/types/todo';

const STORAGE_KEY = 'my-tasks:todos:v1';
const SEEDED_KEY = 'my-tasks:seeded:v1';

function makeId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function defaultTodos(): Todo[] {
  const now = Date.now();
  const samples: Array<{ title: string; completed: boolean }> = [
    { title: 'Welcome to My Tasks 👋', completed: false },
    { title: 'Add your first task', completed: false },
    { title: 'Double-click a task to edit it', completed: false },
    { title: 'Check this off when done', completed: true },
  ];
  return samples.map((s, i) => ({
    id: makeId(),
    title: s.title,
    completed: s.completed,
    createdAt: now + i,
  }));
}

function loadFromStorage(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      // First ever visit — seed defaults once.
      if (localStorage.getItem(SEEDED_KEY) !== '1') {
        localStorage.setItem(SEEDED_KEY, '1');
        return defaultTodos();
      }
      return [];
    }
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
