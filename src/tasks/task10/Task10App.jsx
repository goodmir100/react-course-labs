import { useCallback, useMemo, useState } from 'react';
import coursesData from '../../data/courses.json';
import { CoursePicker } from './CoursePicker';

export default function Task10App() {
  const [count, setCount] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showSeats, setShowSeats] = useState(true);

  const [useStableCallback, setUseStableCallback] = useState(true);
  const [useStableOptions, setUseStableOptions] = useState(true);

  const stableSelect = useCallback((courseId) => {
    setSelectedIds((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  }, []);

  const inlineSelect = (courseId) => {
    setSelectedIds((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const memoizedOptions = useMemo(() => ({ showSeats }), [showSeats]);
  const freshOptions = { showSeats };

  const activeOnSelect = useStableCallback ? stableSelect : inlineSelect;
  const activeOptions = useStableOptions ? memoizedOptions : freshOptions;

  return (
    <main className="catalog-page">
      <header className="catalog-header">
        <h2>Задание 10: Причины повторного вызова memo-компонента</h2>
        <p>Влияние ссылочной стабильности функций (useCallback) и объектов (options) на React.memo</p>
      </header>

      <section className="ui-card" style={{ display: 'grid', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button type="button" onClick={() => setCount((c) => c + 1)}>
            Несвязанный счётчик родителя: {count}
          </button>

          <label style={{ cursor: 'pointer', fontSize: '14px' }}>
            <input
              type="checkbox"
              checked={showSeats}
              onChange={(e) => setShowSeats(e.target.checked)}
            />{' '}
            Показывать места (options.showSeats)
          </label>
        </div>

        <div className="meta-row">
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
      </section>

      <div className="meta-row" style={{ marginBottom: '12px' }}>
        <span>
          Выбранные курсы ({selectedIds.length}):{' '}
          <strong>{selectedIds.length > 0 ? selectedIds.join(', ') : 'нет'}</strong>
        </span>
      </div>

      <CoursePicker
        courses={coursesData}
        selectedIds={selectedIds}
        options={activeOptions}
        onSelect={activeOnSelect}
      />
    </main>
  );
}