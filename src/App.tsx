import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Placeholder() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 text-slate-500">
      Loading your tasks…
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Placeholder />} />
      </Routes>
    </BrowserRouter>
  );
}
