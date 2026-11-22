export function SelectedCoursePanel({
  course,
  isVisibleInFilter,
  isFavorite,
  onToggleFavorite,
  onClearSelection,
}) {
  if (!course) {
    return (
      <section className="ui-card">
        <div className="ui-card-header" style={{ marginBottom: 0 }}>
          <div>
            <h3 className="ui-card-title">Выбранный курс</h3>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-muted)' }}>
              Нажмите «Выбрать» на любой карточке ниже, чтобы закрепить курс здесь.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="ui-card ui-card--selected">
      <div className="ui-card-header">
        <h3 className="ui-card-title">Выбранный курс: {course.title}</h3>
        <div className="ui-card-actions">
          <button
            type="button"
            className={isFavorite ? 'btn-active' : ''}
            onClick={() => onToggleFavorite(course.id)}
          >
            {isFavorite ? '★ В избранном' : '☆ В избранное'}
          </button>
          <button type="button" onClick={onClearSelection}>
            Снять выбор
          </button>
        </div>
      </div>

      <div className="meta-row">
        <span className={`badge badge--${course.category}`}>{course.category}</span>
        <span>
          ID: <code>{course.id}</code>
        </span>
        <span>
          Свободных мест: <strong>{course.seats}</strong>
        </span>
        <span>Версия: v{course.version}</span>
      </div>

      {!isVisibleInFilter && (
        <div className="notice-warning">
          Курс скрыт текущими параметрами поиска или категории, но выбор сохранён отдельно.
        </div>
      )}
    </section>
  );
}