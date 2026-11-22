import { memo } from 'react';

export const CoursePicker = memo(function CoursePicker({
  courses,
  selectedIds,
  options,
  onSelect,
}) {
  console.log(
    `[RENDER CoursePicker] Повторный вызов дочернего компонента (выбрано: ${selectedIds.length}, showSeats: ${options.showSeats})`
  );

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '10px' }}>
      {courses.map((course) => {
        const isSelected = selectedIds.includes(course.id);

        return (
          <li
            key={course.id}
            style={{
              padding: '12px 16px',
              border: isSelected ? '2px solid #2563eb' : '1px solid #d1d5db',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: isSelected ? '#eff6ff' : '#fff',
            }}
          >
            <div>
              <strong style={{ display: 'block', marginBottom: '4px' }}>{course.title}</strong>
              <small style={{ color: '#4b5563' }}>
                Направление: {course.category}
                {options.showSeats && ` · Мест: ${course.seats}`}
              </small>
            </div>

            <button
              type="button"
              onClick={() => onSelect(course.id)}
              aria-pressed={isSelected}
            >
              {isSelected ? 'Убрать из выбора' : 'Выбрать'}
            </button>
          </li>
        );
      })}
    </ul>
  );
});