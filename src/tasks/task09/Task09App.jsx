import { useMemo, useState } from 'react';
import coursesData from '../../data/courses.json';

// Генерируем 2000 записей с уникальными id на базе courses.json (неизменяемый массив)
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

  // Копируем массив перед сортировкой, сохраняя исходный GENERATED_COURSES неизменным
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

  // Вариант с useMemo: пересчитывается только при изменении sortBy или sortDir
  const memoizedResult = useMemo(() => {
    return sortCourses(GENERATED_COURSES, sortBy, sortDir);
  }, [sortBy, sortDir]);

  // Вариант без useMemo: выполняется на каждом render (включая клик по счётчику)
  const activeResult = useMemoMode
    ? memoizedResult
    : sortCourses(GENERATED_COURSES, sortBy, sortDir);

  const toggleDirection = () => {
    setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '24px', maxWidth: '680px' }}>
      <h2>Задание 9: Проверка полезности useMemo (2000 записей)</h2>

      <div
        style={{
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '16px',
          backgroundColor: '#f9fafb',
          display: 'grid',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button type="button" onClick={() => setUnrelatedCount((c) => c + 1)}>
            Несвязанный счётчик: {unrelatedCount}
          </button>

          <label style={{ cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={useMemoMode}
              onChange={(e) => setUseMemoMode(e.target.checked)}
            />{' '}
            Использовать <code>useMemo</code>
          </label>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <label>
            Поле:{' '}
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="seats">По количеству мест (seats)</option>
              <option value="title">По названию (title)</option>
            </select>
          </label>

          <button type="button" onClick={toggleDirection}>
            Направление: {sortDir === 'asc' ? 'По возрастанию (ASC)' : 'По убыванию (DESC)'}
          </button>
        </div>

        <div style={{ fontSize: '14px', color: '#374151' }}>
          Последний замер сортировки: <strong>{activeResult.elapsedMs} мс</strong>{' '}
          <span>(откройте консоль F12, чтобы видеть, запускалась ли сортировка при рендере)</span>
        </div>
      </div>

      <p style={{ fontSize: '14px', color: '#4b5563' }}>
        Показаны первые 15 из {activeResult.sorted.length} отсортированных записей:
      </p>

      <ul style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px 28px' }}>
        {activeResult.sorted.slice(0, 15).map((course) => (
          <li key={course.id} style={{ marginBottom: '4px' }}>
            <strong>{course.title}</strong> — мест: {course.seats}{' '}
            <small style={{ color: '#6b7280' }}>(id: {course.id})</small>
          </li>
        ))}
      </ul>
    </div>
  );
}