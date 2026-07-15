import { useState } from 'react';
import { useTodos } from '@/hooks/useTodos';
import type { Filter } from '@/types/todo';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';

export default function HomePage() {
  const { todos, addTodo, toggleTodo, editTodo, deleteTodo, clearCompleted } =
    useTodos();
  const [filter, setFilter] = useState<Filter>('all');

  const remaining = todos.filter((t) => !t.completed).length;
  const completed = todos.length - remaining;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0b12] text-slate-100">
      {/* ambient background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-red-600/25 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-[32rem] w-[32rem] rounded-full bg-fuchsia-600/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-rose-500/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '22px 22px',
          }}
        />
      </div>

      <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-5 py-12">
        <header className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]" />
            {new Date().toLocaleDateString(undefined, {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-white">
            My{' '}
            <span className="bg-gradient-to-r from-red-400 via-rose-400 to-fuchsia-400 bg-clip-text text-transparent">
              Tasks
            </span>
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            A calm place to keep track of what you need to do.
          </p>

          {todos.length > 0 && (
            <div className="mt-6 grid grid-cols-3 gap-3">
              <StatCard label="Total" value={todos.length} />
              <StatCard label="Active" value={remaining} accent />
              <StatCard label="Done" value={completed} />
            </div>
          )}
        </header>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="border-b border-white/10 p-5">
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

        <p className="mt-6 text-center text-xs text-slate-500">
          Double-click a task to edit. Your list is saved automatically.
        </p>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur">
      <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p
        className={
          'mt-1 text-2xl font-semibold tabular-nums ' +
          (accent ? 'text-red-400' : 'text-white')
        }
      >
        {value}
      </p>
    </div>
  );
}
