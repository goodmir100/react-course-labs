export function CourseListView({
  items = [],
  emptyText = 'Список курсов пуст',
  selectedId = null,
  onSelect,
}) {
  if (items.length === 0) {
    return <div className="empty-box">{emptyText}</div>;
  }

  return (
    <ul className="clean-list">
      {items.map((course) => {
        const isSelected = course.id === selectedId;

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
                  <span>
                    ID: <code>{course.id}</code>
                  </span>
                  <span>
                    Мест: <strong>{course.seats}</strong>
                  </span>
                </div>
              </div>

              <button
                type="button"
                className={isSelected ? 'btn-primary' : ''}
                onClick={() => onSelect?.(course.id)}
                aria-pressed={isSelected}
              >
                {isSelected ? 'Выбрано' : 'Выбрать'}
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}