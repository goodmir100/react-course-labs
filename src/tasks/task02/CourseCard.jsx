export function CourseCard({ course, isSelected, onSelect }) {
  console.log(`[RENDER] Отрисовка CourseCard: "${course.title}"`);

  const handleSelectClick = () => {
    localStorage.setItem('selected-course', course.id);
    console.log(`[HANDLER] Клик «Выбрать»: в localStorage записан id "${course.id}"`);
    onSelect(course.id);
  };

  return (
    <article className={`ui-card ${isSelected ? 'ui-card--selected' : ''}`}>
      <div className="ui-card-header" style={{ marginBottom: 0 }}>
        <div>
          <h3 className="ui-card-title" style={{ marginBottom: '6px' }}>
            {course.title}
          </h3>
          <div className="meta-row">
            <span className={`badge badge--${course.category}`}>{course.category}</span>
            <span>
              Мест: <strong>{course.seats}</strong>
            </span>
          </div>
        </div>

        <button
          type="button"
          className={isSelected ? 'btn-primary' : ''}
          onClick={handleSelectClick}
        >
          {isSelected ? 'Выбрано' : 'Выбрать'}
        </button>
      </div>
    </article>
  );
}