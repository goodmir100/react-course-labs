import { useState } from 'react';
import coursesData from '../../data/courses.json';
import { CourseCard } from './CourseCard';

export default function Task02App() {
  const [selectedId, setSelectedId] = useState(null);
  const [renderCount, setRenderCount] = useState(0);

  return (
    <main className="catalog-page">
      <header className="catalog-header">
        <h2>Задание 2: Действие пользователя в обработчике</h2>
        <p>Запись в localStorage выполняется строго в onClick, а не во время render</p>
      </header>

      <section className="ui-card" style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <button type="button" onClick={() => setRenderCount((c) => c + 1)}>
          Вызвать повторный render ({renderCount})
        </button>
        <span className="meta-row">
          Текущий выбор в state: <strong>{selectedId ?? 'не выбран'}</strong>
        </span>
      </section>

      {coursesData.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          isSelected={selectedId === course.id}
          onSelect={setSelectedId}
        />
      ))}
    </main>
  );
}