import type { Filter, Todo } from '@/types/todo';
import TodoItem from '@/components/TodoItem';

type Props = {
  todos: Todo[];
  filter: Filter;
  onFilterChange: (f: Filter) => void;
  onToggle: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onClearCompleted: () => void;
};

const FILTERS: Filter[] = ['all', 'active', 'completed'];

export default function TodoList({
  todos,
  filter,
  onFilterChange,
  onToggle,
  onEdit,
  onDelete,
  onClearCompleted,
}: Props) {
  const remaining = todos.filter((t) => !t.completed).length;
  const hasCompleted = todos.some((t) => t.completed);
  const visible = todos.filter((t) =>
    filter === 'all' ? true : filter === 'active' ? !t.completed : t.completed,
  );

  const emptyMessage =
    todos.length === 0
      ? 'No tasks yet. Add your first one above.'
      : filter === 'active'
        ? 'Nothing active — you’re all caught up!'
        : filter === 'completed'
          ? 'No completed tasks yet.'
          : 'Nothing to show.';

  return (
    <div>
      {visible.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-14 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5 text-slate-500"
            >
              <path
                d="M9 11l3 3L22 4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="text-sm text-slate-400">{emptyMessage}</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {visible.map((t) => (
            <TodoItem
              key={t.id}
              todo={t}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-slate-400">
        <span>
          <span className="font-semibold text-white tabular-nums">
            {remaining}
          </span>{' '}
          {remaining === 1 ? 'task' : 'tasks'} left
        </span>

        <div className="flex gap-1 rounded-lg border border-white/10 bg-white/[0.04] p-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              className={
                'px-3 py-1 rounded-md text-xs capitalize font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/40 ' +
                (filter === f
                  ? 'bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-sm shadow-red-900/40'
                  : 'text-slate-400 hover:text-white')
              }
            >
              {f}
            </button>
          ))}
        </div>

        <button
          onClick={onClearCompleted}
          disabled={!hasCompleted}
          className="rounded-md px-2 py-1 font-medium transition enabled:hover:bg-white/5 enabled:hover:text-rose-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/40 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Clear completed
        </button>
      </div>
    </div>
  );
}
