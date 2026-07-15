import { useState } from 'react';

type Props = {
  onAdd: (title: string) => void;
};

export default function TodoInput({ onAdd }: Props) {
  const [value, setValue] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue('');
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <div className="relative flex-1">
        <svg
          viewBox="0 0 20 20"
          fill="none"
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path
            d="M10 4v12M4 10h12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="What needs doing?"
          aria-label="New task"
          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-10 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-red-400/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-red-500/20"
        />
      </div>
      <button
        type="submit"
        disabled={!value.trim()}
        className="group relative h-12 overflow-hidden rounded-xl bg-gradient-to-br from-red-500 to-rose-600 px-6 text-sm font-semibold text-white shadow-lg shadow-red-900/40 transition hover:shadow-red-900/60 focus:outline-none focus:ring-2 focus:ring-red-400/50 focus:ring-offset-2 focus:ring-offset-[#0b0b12] disabled:cursor-not-allowed disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 disabled:shadow-none"
      >
        <span className="relative z-10">Add task</span>
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
      </button>
    </form>
  );
}
