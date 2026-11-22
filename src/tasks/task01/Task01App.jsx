import { useState } from 'react';
import coursesData from '../../data/courses.json';
import { CourseBadge } from './CourseBadge';

export default function Task01App() {
  const [count, setCount] = useState(0);
  const [courseIndex, setCourseIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(true);

  const currentCourse = coursesData[courseIndex];

  const handleNextCourse = () => {
    setCourseIndex((prev) => (prev + 1) % coursesData.length);
  };

  return (
    <main className="catalog-page">
      <header className="catalog-header">
        <h2>Задание 1: Различие Render и DOM</h2>
        <p>Отслеживание фаз вычисления компонента и реальных мутаций DOM через MutationObserver</p>
      </header>

      <section className="ui-card">
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button type="button" onClick={() => setCount((c) => c + 1)}>
            Счётчик родителя: {count}
          </button>

          <button type="button" className="btn-primary" onClick={handleNextCourse}>
            Сменить prop title
          </button>

          <button type="button" onClick={() => setIsMounted((m) => !m)}>
            {isMounted ? 'Размонтировать ребёнка' : 'Смонтировать ребёнка'}
          </button>
        </div>

        {isMounted && <CourseBadge title={currentCourse.title} />}
      </section>
    </main>
  );
}