export function FavoritesPanel({ courses, favoriteIds, onToggle, onClear }) {
  const favoriteCourses = courses.filter((course) => favoriteIds.includes(course.id));

  return (
    <aside className="ui-card">
      <div className="ui-card-header">
        <h3 className="ui-card-title">Панель избранного ({favoriteIds.length})</h3>
        <button type="button" onClick={onClear} disabled={favoriteIds.length === 0}>
          Очистить избранное
        </button>
      </div>

      {favoriteCourses.length === 0 ? (
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
          Избранных курсов пока нет. Добавьте курс из списка ниже.
        </p>
      ) : (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {favoriteCourses.map((course) => (
            <span key={course.id} className="fav-chip">
              {course.title}
              <button
                type="button"
                className="chip-close"
                onClick={() => onToggle(course.id)}
                aria-label={`Убрать ${course.title} из избранного`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </aside>
  );
}