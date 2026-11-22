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
    <ul className="clean-list">
      {courses.map((course) => {
        const isSelected = selectedIds.includes(course.id);

        return (
          <li
            key={course.id}
            className={`ui-card ${isSelected ? 'ui-card--selected' : ''}`}
            style={{ marginBottom: 0 }}
          >
            <div className="ui-card-header" style={{ marginBottom: 0 }}>
              <div>
                <strong style={{ display: 'block', marginBottom: '6px' }}>{course.title}</strong>
                <div className="meta-row">
                  <span className={`badge badge--${course.category}`}>{course.category}</span>
                  {options.showSeats && (
                    <span>
                      Мест: <strong>{course.seats}</strong>
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                className={isSelected ? 'btn-primary' : ''}
                onClick={() => onSelect(course.id)}
                aria-pressed={isSelected}
              >
                {isSelected ? 'Убрать из выбора' : 'Выбрать'}
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
});