import { useRef, useState } from 'react';
import coursesData from '../../data/courses.json';

function filterCourses(query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return coursesData;
  return coursesData.filter(
    (course) =>
      course.title.toLowerCase().includes(normalized) ||
      course.category.toLowerCase().includes(normalized)
  );
}

export default function Task06App() {
  const [controlledQuery, setControlledQuery] = useState('');
  const uncontrolledInputRef = useRef(null);
  const [uncontrolledApplied, setUncontrolledApplied] = useState('');

  const handleControlledReset = () => {
    setControlledQuery('');
  };

  const handleUncontrolledApply = (e) => {
    e.preventDefault();
    const currentValue = uncontrolledInputRef.current?.value ?? '';
    setUncontrolledApplied(currentValue);
  };

  const handleUncontrolledReset = () => {
    if (uncontrolledInputRef.current) {
      uncontrolledInputRef.current.value = '';
    }
    setUncontrolledApplied('');
  };

  const controlledList = filterCourses(controlledQuery);
  const uncontrolledList = filterCourses(uncontrolledApplied);

  return (
    <main className="catalog-page">
      <header className="catalog-header">
        <h2>Задание 6: Управляемый и неуправляемый фильтр</h2>
        <p>Сравнение владения значением через React state (value/onChange) и через DOM (defaultValue + ref)</p>
      </header>

      <div className="compare-grid">
        <section className="ui-card">
          <h3 className="ui-card-title" style={{ marginBottom: '12px' }}>
            1. Управляемый фильтр (value / onChange)
          </h3>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <input
              type="text"
              value={controlledQuery}
              onChange={(e) => setControlledQuery(e.target.value)}
              placeholder="Поиск сразу при вводе..."
              style={{ flex: 1 }}
            />
            <button type="button" onClick={handleControlledReset}>
              Сбросить
            </button>
          </div>

          <p className="meta-row" style={{ marginBottom: '12px' }}>
            Владелец: <strong>React state</strong> (<code>"{controlledQuery}"</code>)
          </p>

          <ul className="clean-list">
            {controlledList.map((course) => (
              <li key={course.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span>{course.title}</span>
                <span className={`badge badge--${course.category}`}>{course.category}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="ui-card">
          <h3 className="ui-card-title" style={{ marginBottom: '12px' }}>
            2. Неуправляемый фильтр (defaultValue + ref)
          </h3>

          <form
            onSubmit={handleUncontrolledApply}
            style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}
          >
            <input
              ref={uncontrolledInputRef}
              type="text"
              defaultValue=""
              placeholder="Введите и примените..."
              style={{ flex: '1 1 140px' }}
            />
            <button type="submit" className="btn-primary">
              Применить
            </button>
            <button type="button" onClick={handleUncontrolledReset}>
              Сбросить
            </button>
          </form>

          <p className="meta-row" style={{ marginBottom: '12px' }}>
            Владелец: <strong>DOM</strong> | Применено: <code>"{uncontrolledApplied}"</code>
          </p>

          <ul className="clean-list">
            {uncontrolledList.map((course) => (
              <li key={course.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span>{course.title}</span>
                <span className={`badge badge--${course.category}`}>{course.category}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}