export function CourseListView({
  items = [],
  emptyText = 'Список курсов пуст',
  selectedId = null,
  onSelect,
}) {
  if (items.length === 0) {
    return (
      <p
        style={{
          padding: '16px',
          border: '1px dashed #9ca3af',
          borderRadius: '8px',
          color: '#4b5563',
          margin: 0,
        }}
      >
        {emptyText}
      </p>
    );
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '10px' }}>
      {items.map((course) => {
        const isSelected = course.id === selectedId;

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
              gap: '12px',
              backgroundColor: isSelected ? '#eff6ff' : '#fff',
            }}
          >
            <div>
              <strong style={{ display: 'block', marginBottom: '4px' }}>{course.title}</strong>
              <small style={{ color: '#4b5563' }}>
                ID: <code>{course.id}</code> · Направление: {course.category} · Мест: {course.seats}
              </small>
            </div>

            <button
              type="button"
              onClick={() => onSelect?.(course.id)}
              aria-pressed={isSelected}
            >
              {isSelected ? 'Выбрано' : 'Выбрать'}
            </button>
          </li>
        );
      })}
    </ul>
  );
}