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
    <div style={{ fontFamily: 'sans-serif', padding: '24px', maxWidth: '540px' }}>
      <h2>Задание 1: Различие Render и DOM</h2>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={() => setCount((c) => c + 1)}>
          Счётчик родителя: {count}
        </button>

        <button onClick={handleNextCourse}>
          Сменить prop title
        </button>

        <button onClick={() => setIsMounted((m) => !m)}>
          {isMounted ? 'Размонтировать ребёнка' : 'Смонтировать ребёнка'}
        </button>
      </div>

      {isMounted && <CourseBadge title={currentCourse.title} />}
    </div>
  );
}