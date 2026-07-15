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
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="What needs doing?"
        aria-label="New task"
        className="flex-1 h-11 rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className="h-11 px-5 rounded-lg bg-indigo-600 text-white text-sm font-medium shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:bg-slate-300 disabled:cursor-not-allowed"
      >
        Add
      </button>
    </form>
  );
}
