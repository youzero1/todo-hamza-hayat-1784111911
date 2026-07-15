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
        <div className="py-10 text-center">
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

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500">
        <span>
          <span className="font-medium text-slate-700">{remaining}</span>{' '}
          {remaining === 1 ? 'task' : 'tasks'} left
        </span>

        <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              className={
                'px-3 py-1 rounded-md text-xs capitalize transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 ' +
                (filter === f
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800')
              }
            >
              {f}
            </button>
          ))}
        </div>

        <button
          onClick={onClearCompleted}
          disabled={!hasCompleted}
          className="rounded px-2 py-1 transition enabled:hover:text-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Clear completed
        </button>
      </div>
    </div>
  );
}
