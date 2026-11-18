import { HashRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Task01App from './tasks/task01/Task01App';
import Task02App from './tasks/task02/Task02App';

export default function App() {
  return (
    <HashRouter>
      <nav
        style={{
          padding: '12px 24px',
          borderBottom: '1px solid #ddd',
          display: 'flex',
          gap: '16px',
          fontFamily: 'sans-serif',
        }}
      >
        <Link to="/task-01">Задание 1: Render vs DOM</Link>
        <Link to="/task-02">Задание 2: Render Side-Effect</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/task-02" replace />} />
        <Route path="/task-01" element={<Task01App />} />
        <Route path="/task-02" element={<Task02App />} />
      </Routes>
    </HashRouter>
  );
}