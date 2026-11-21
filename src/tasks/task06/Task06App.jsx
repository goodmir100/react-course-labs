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
  // 1. Состояние для управляемого фильтра (владелец — React)
  const [controlledQuery, setControlledQuery] = useState('');

  // 2. Ссылка на DOM-элемент и состояние применённого запроса для неуправляемого фильтра (владелец — DOM)
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
    // Явный сброс DOM-значения напрямую через ref + сброс применённого фильтра
    if (uncontrolledInputRef.current) {
      uncontrolledInputRef.current.value = '';
    }
    setUncontrolledApplied('');
  };

  const controlledList = filterCourses(controlledQuery);
  const uncontrolledList = filterCourses(uncontrolledApplied);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '24px', maxWidth: '820px' }}>
      <h2>Задание 6: Управляемый и неуправляемый фильтр</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '16px',
        }}
      >
        {/* Вариант 1: Управляемый input (value / onChange) */}
        <section style={{ border: '1px solid #d1d5db', borderRadius: '8px', padding: '16px' }}>
          <h3 style={{ marginTop: 0 }}>1. Управляемый фильтр (value / onChange)</h3>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <input
              type="text"
              value={controlledQuery}
              onChange={(e) => setControlledQuery(e.target.value)}
              placeholder="Поиск сразу при вводе..."
              style={{ flex: 1, padding: '6px 10px' }}
            />
            <button type="button" onClick={handleControlledReset}>
              Сбросить
            </button>
          </div>

          <p style={{ fontSize: '13px', color: '#4b5563' }}>
            Владелец значения: <strong>React state</strong> (<code>"{controlledQuery}"</code>)
          </p>

          <ul style={{ paddingLeft: '20px', marginBottom: 0 }}>
            {controlledList.map((course) => (
              <li key={course.id}>
                {course.title} <small>({course.category})</small>
              </li>
            ))}
          </ul>
        </section>

        {/* Вариант 2: Неуправляемый input (defaultValue / ref) */}
        <section style={{ border: '1px solid #d1d5db', borderRadius: '8px', padding: '16px' }}>
          <h3 style={{ marginTop: 0 }}>2. Неуправляемый фильтр (defaultValue + ref)</h3>

          <form
            onSubmit={handleUncontrolledApply}
            style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}
          >
            <input
              ref={uncontrolledInputRef}
              type="text"
              defaultValue=""
              placeholder="Введите и нажмите Применить..."
              style={{ flex: 1, padding: '6px 10px' }}
            />
            <button type="submit">Применить</button>
            <button type="button" onClick={handleUncontrolledReset}>
              Сбросить
            </button>
          </form>

          <p style={{ fontSize: '13px', color: '#4b5563' }}>
            Владелец поля: <strong>DOM</strong> | Применено по кнопке:{' '}
            <code>"{uncontrolledApplied}"</code>
          </p>

          <ul style={{ paddingLeft: '20px', marginBottom: 0 }}>
            {uncontrolledList.map((course) => (
              <li key={course.id}>
                {course.title} <small>({course.category})</small>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}