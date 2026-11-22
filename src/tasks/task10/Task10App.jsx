import { useCallback, useMemo, useState } from 'react';
import coursesData from '../../data/courses.json';
import { CoursePicker } from './CoursePicker';

export default function Task10App() {
  const [count, setCount] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showSeats, setShowSeats] = useState(true);

  const [useStableCallback, setUseStableCallback] = useState(true);
  const [useStableOptions, setUseStableOptions] = useState(true);

  // 1. Стабильный callback через useCallback + функциональное обновление state
  // Пустой массив зависимостей [] безопасен, так как используется prev => ...
  const stableSelect = useCallback((courseId) => {
    setSelectedIds((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  }, []);

  // 2. Новая функция при каждом рендере родителя (также с функциональным обновлением)
  const inlineSelect = (courseId) => {
    setSelectedIds((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  // 3. Стабильная ссылка на объект options vs новый объект на каждом рендере
  const memoizedOptions = useMemo(() => ({ showSeats }), [showSeats]);
  const freshOptions = { showSeats };

  const activeOnSelect = useStableCallback ? stableSelect : inlineSelect;
  const activeOptions = useStableOptions ? memoizedOptions : freshOptions;

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '24px', maxWidth: '680px' }}>
      <h2>Задание 10: Причины повторного вызова memo-компонента</h2>

      <div
        style={{
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '16px',
          backgroundColor: '#f9fafb',
          display: 'grid',
          gap: '10px',
        }}
      >
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button type="button" onClick={() => setCount((c) => c + 1)}>
            Несвязанный счётчик родителя: {count}
          </button>

          <label style={{ cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showSeats}
              onChange={(e) => setShowSeats(e.target.checked)}
            />{' '}
            Показывать места (options.showSeats)
          </label>
        </div>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '14px' }}>
          <label style={{ cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={useStableCallback}
              onChange={(e) => setUseStableCallback(e.target.checked)}
            />{' '}
            Стабильный <code>onSelect</code> (<code>useCallback</code>)
          </label>

          <label style={{ cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={useStableOptions}
              onChange={(e) => setUseStableOptions(e.target.checked)}
            />{' '}
            Стабильный объект <code>options</code> (<code>useMemo</code>)
          </label>
        </div>

        <p style={{ margin: 0, fontSize: '13px', color: '#4b5563' }}>
          Откройте консоль браузера (<code>F12</code>) и нажимайте «Несвязанный счётчик родителя»,
          переключая галочки выше.
        </p>
      </div>

      <div style={{ marginBottom: '12px', fontSize: '14px' }}>
        Выбранные курсы ({selectedIds.length}):{' '}
        <strong>{selectedIds.length > 0 ? selectedIds.join(', ') : 'нет'}</strong>
      </div>

      <CoursePicker
        courses={coursesData}
        selectedIds={selectedIds}
        options={activeOptions}
        onSelect={activeOnSelect}
      />
    </div>
  );
}