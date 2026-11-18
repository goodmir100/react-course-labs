import { useState } from 'react';
import coursesData from '../../data/courses.json';
import { CourseCard } from './CourseCard';

export default function Task02App() {
  const [selectedId, setSelectedId] = useState(null);
  const [renderCount, setRenderCount] = useState(0);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '24px', maxWidth: '560px' }}>
      <h2>Задание 2: Действие пользователя в обработчике</h2>

      <div style={{ marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button onClick={() => setRenderCount((c) => c + 1)}>
          Вызвать повторный render ({renderCount})
        </button>
        <span>
          Текущий выбор в state: <strong>{selectedId ?? 'не выбран'}</strong>
        </span>
      </div>

      {coursesData.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          isSelected={selectedId === course.id}
          onSelect={setSelectedId}
        />
      ))}
    </div>
  );
}