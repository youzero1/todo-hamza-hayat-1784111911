import { useEffect, useRef, useState } from 'react';
import type { Todo } from '@/types/todo';

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem({ todo, onToggle, onEdit, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  function startEdit() {
    setDraft(todo.title);
    setIsEditing(true);
  }

  function commit() {
    const trimmed = draft.trim();
    if (!trimmed) {
      setIsEditing(false);
      setDraft(todo.title);
      return;
    }
    if (trimmed !== todo.title) {
      onEdit(todo.id, trimmed);
    }
    setIsEditing(false);
  }

  function cancel() {
    setDraft(todo.title);
    setIsEditing(false);
  }

  return (
    <li className="animate-item group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 transition hover:border-white/20 hover:bg-white/[0.06]">
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="peer sr-only"
          aria-label={`Mark "${todo.title}" as ${todo.completed ? 'not done' : 'done'}`}
        />
        <span
          className="flex h-5 w-5 items-center justify-center rounded-md border-2 border-slate-500/60 bg-transparent transition peer-checked:border-transparent peer-checked:bg-gradient-to-br peer-checked:from-red-500 peer-checked:to-rose-600 peer-checked:shadow-[0_0_12px_rgba(244,63,94,0.5)] peer-focus-visible:ring-2 peer-focus-visible:ring-red-400/40 group-hover:border-slate-400"
          aria-hidden="true"
        >
          {todo.completed && (
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className="h-3.5 w-3.5 text-white"
            >
              <path
                d="M5 10.5l3 3 7-7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
      </label>

      {isEditing ? (
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commit();
            else if (e.key === 'Escape') cancel();
          }}
          className="flex-1 h-8 rounded-md border border-red-400/40 bg-black/30 px-2 text-sm text-white outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
        />
      ) : (
        <span
          onDoubleClick={startEdit}
          className={
            'flex-1 select-none text-sm transition ' +
            (todo.completed
              ? 'text-slate-500 line-through'
              : 'text-slate-100')
          }
        >
          {todo.title}
        </span>
      )}

      {!isEditing && (
        <div className="flex items-center gap-1 opacity-0 transition group-hover:opacity-100 focus-within:opacity-100">
          <button
            onClick={startEdit}
            aria-label="Edit task"
            className="rounded-md p-1.5 text-slate-400 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/40 focus-visible:opacity-100"
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className="h-4 w-4"
              stroke="currentColor"
              strokeWidth="1.75"
            >
              <path
                d="M4 13.5V16h2.5l7.5-7.5-2.5-2.5L4 13.5z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.5 5.5l2 2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            aria-label="Delete task"
            className="rounded-md p-1.5 text-slate-400 hover:bg-rose-500/15 hover:text-rose-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/40 focus-visible:opacity-100"
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className="h-4 w-4"
              stroke="currentColor"
              strokeWidth="1.75"
            >
              <path
                d="M4 6h12M8 6V4h4v2M6 6l1 10h6l1-10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </li>
  );
}
