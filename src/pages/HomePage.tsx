import { useState } from 'react';
import { useTodos } from '@/hooks/useTodos';
import type { Filter } from '@/types/todo';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';

export default function HomePage() {
  const { todos, addTodo, toggleTodo, editTodo, deleteTodo, clearCompleted } =
    useTodos();
  const [filter, setFilter] = useState<Filter>('all');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-red-50 py-10 px-4">
      <div className="mx-auto max-w-xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            My Tasks
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            A calm place to keep track of what you need to do.
          </p>
        </header>

        <div className="rounded-2xl bg-white shadow-lg shadow-slate-200/60 ring-1 ring-slate-200/70 overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <TodoInput onAdd={addTodo} />
          </div>

          <div className="p-5">
            <TodoList
              todos={todos}
              filter={filter}
              onFilterChange={setFilter}
              onToggle={toggleTodo}
              onEdit={editTodo}
              onDelete={deleteTodo}
              onClearCompleted={clearCompleted}
            />
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-slate-400">
          Double-click a task to edit it. Your list is saved automatically.
        </p>
      </div>
    </div>
  );
}

