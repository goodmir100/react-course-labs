export function FavoritesPanel({ courses, favoriteIds, onToggle, onClear }) {
  const favoriteCourses = courses.filter((course) => favoriteIds.includes(course.id));

  return (
    <aside
      style={{
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px',
        backgroundColor: '#f9fafb',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '10px',
        }}
      >
        <h3 style={{ margin: 0, fontSize: '16px' }}>
          Панель избранного ({favoriteIds.length})
        </h3>

        <button
          type="button"
          onClick={onClear}
          disabled={favoriteIds.length === 0}
        >
          Очистить избранное
        </button>
      </div>

      {favoriteCourses.length === 0 ? (
        <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
          Избранных курсов пока нет. Добавьте курс из списка ниже.
        </p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {favoriteCourses.map((course) => (
            <li
              key={course.id}
              style={{
                padding: '4px 10px',
                borderRadius: '16px',
                backgroundColor: '#dbeafe',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>{course.title}</span>
              <button
                type="button"
                onClick={() => onToggle(course.id)}
                aria-label={`Убрать ${course.title} из избранного`}
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  padding: '0 2px',
                }}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}