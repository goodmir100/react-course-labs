import { useMemo, useState } from 'react';
import coursesData from '../../data/courses.json';

const GENERATED_COURSES = Array.from({ length: 2000 }, (_, index) => {
  const base = coursesData[index % coursesData.length];
  return {
    ...base,
    id: `${base.id}-${index}`,
    title: `${base.title} #${index + 1}`,
    seats: (base.seats + index * 7) % 100,
  };
});

function sortCourses(items, sortBy, sortDir) {
  const startedAt = performance.now();
  const multiplier = sortDir === 'asc' ? 1 : -1;

  const sorted = [...items].sort((a, b) => {
    if (sortBy === 'seats') {
      return (a.seats - b.seats) * multiplier;
    }
    return a.title.localeCompare(b.title, 'ru') * multiplier;
  });

  const elapsedMs = (performance.now() - startedAt).toFixed(2);
  console.log(`[SORT] Поле: ${sortBy}, направление: ${sortDir}, время: ${elapsedMs} мс`);
  return { sorted, elapsedMs };
}

export default function Task09App() {
  const [unrelatedCount, setUnrelatedCount] = useState(0);
  const [sortBy, setSortBy] = useState('seats');
  const [sortDir, setSortDir] = useState('asc');
  const [useMemoMode, setUseMemoMode] = useState(true);

  const memoizedResult = useMemo(() => {
    return sortCourses(GENERATED_COURSES, sortBy, sortDir);
  }, [sortBy, sortDir]);

  const activeResult = useMemoMode
    ? memoizedResult
    : sortCourses(GENERATED_COURSES, sortBy, sortDir);

  const toggleDirection = () => {
    setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <main className="catalog-page">
      <header className="catalog-header">
        <h2>Задание 9: Проверка полезности useMemo (2000 записей)</h2>
        <p>Сравнение сортировки с кэшированием и без него при изменении несвязанного счётчика</p>
      </header>

      <section className="ui-card" style={{ display: 'grid', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button type="button" onClick={() => setUnrelatedCount((c) => c + 1)}>
            Несвязанный счётчик: {unrelatedCount}
          </button>

          <label style={{ cursor: 'pointer', fontSize: '14px' }}>
            <input
              type="checkbox"
              checked={useMemoMode}
              onChange={(e) => setUseMemoMode(e.target.checked)}
            />{' '}
            Использовать <code>useMemo</code>
          </label>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="seats">По количеству мест (seats)</option>
            <option value="title">По названию (title)</option>
          </select>

          <button type="button" className="btn-primary" onClick={toggleDirection}>
            Направление: {sortDir === 'asc' ? 'По возрастанию (ASC)' : 'По убыванию (DESC)'}
          </button>
        </div>

        <div className="meta-row">
          <span>
            Последний замер сортировки: <strong>{activeResult.elapsedMs} мс</strong>
          </span>
          <span>(проверяйте вызовы [SORT] в консоли F12)</span>
        </div>
      </section>

      <div className="meta-row" style={{ marginBottom: '10px' }}>
        <span>Показаны первые 15 из {activeResult.sorted.length} отсортированных записей:</span>
      </div>

      <ul className="scroll-list" style={{ maxHeight: '420px' }}>
        {activeResult.sorted.slice(0, 15).map((course) => (
          <li key={course.id}>
            <span>
              <strong>{course.title}</strong> <small style={{ color: 'var(--text-muted)' }}>({course.id})</small>
            </span>
            <span className="badge">Мест: {course.seats}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}