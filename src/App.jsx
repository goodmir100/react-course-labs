import { HashRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Task01App from './tasks/task01/Task01App';
import Task02App from './tasks/task02/Task02App';
import Task03App from './tasks/task03/Task03App';
import Task04App from './tasks/task04/Task04App';

export default function App() {
  return (
    <HashRouter>
      <nav
        style={{
          padding: '12px 24px',
          borderBottom: '1px solid #ddd',
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          fontFamily: 'sans-serif',
        }}
      >
        <Link to="/task-01">Задание 1: Render vs DOM</Link>
        <Link to="/task-02">Задание 2: Render Side-Effect</Link>
        <Link to="/task-03">Задание 3: useTransition</Link>
        <Link to="/task-04">Задание 4: useDeferredValue</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/task-04" replace />} />
        <Route path="/task-01" element={<Task01App />} />
        <Route path="/task-02" element={<Task02App />} />
        <Route path="/task-03" element={<Task03App />} />
        <Route path="/task-04" element={<Task04App />} />
      </Routes>
    </HashRouter>
  );
}