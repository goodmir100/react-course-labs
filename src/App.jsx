import { HashRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Task01App from './tasks/task01/Task01App';
import Task02App from './tasks/task02/Task02App';
import Task03App from './tasks/task03/Task03App';
import Task04App from './tasks/task04/Task04App';
import Task05App from './tasks/task05/Task05App';
import Task06App from './tasks/task06/Task06App';
import Task07App from './tasks/task07/Task07App';
import Task08App from './tasks/task08/Task08App';
import Task09App from './tasks/task09/Task09App';
import Task10App from './tasks/task10/Task10App';
import Task11App from './tasks/task11/Task11App';
import Task12App from './tasks/task12/Task12App';

export default function App() {
  return (
    <HashRouter>
      <nav className="course-nav">
        <NavLink to="/task-01">01. Render vs DOM</NavLink>
        <NavLink to="/task-02">02. Side-Effect</NavLink>
        <NavLink to="/task-03">03. useTransition</NavLink>
        <NavLink to="/task-04">04. useDeferredValue</NavLink>
        <NavLink to="/task-05">05. Panel</NavLink>
        <NavLink to="/task-06">06. Controlled</NavLink>
        <NavLink to="/task-07">07. Container/View</NavLink>
        <NavLink to="/task-08">08. Lifting State</NavLink>
        <NavLink to="/task-09">09. useMemo</NavLink>
        <NavLink to="/task-10">10. memo/useCallback</NavLink>
        <NavLink to="/task-11">11. useFavorites</NavLink>
        <NavLink to="/task-12">12. Итоговый каталог</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/task-12" replace />} />
        <Route path="/task-01" element={<Task01App />} />
        <Route path="/task-02" element={<Task02App />} />
        <Route path="/task-03" element={<Task03App />} />
        <Route path="/task-04" element={<Task04App />} />
        <Route path="/task-05" element={<Task05App />} />
        <Route path="/task-06" element={<Task06App />} />
        <Route path="/task-07" element={<Task07App />} />
        <Route path="/task-08" element={<Task08App />} />
        <Route path="/task-09" element={<Task09App />} />
        <Route path="/task-10" element={<Task10App />} />
        <Route path="/task-11" element={<Task11App />} />
        <Route path="/task-12" element={<Task12App />} />
      </Routes>
    </HashRouter>
  );
}