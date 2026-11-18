export function CourseCard({ course, isSelected, onSelect }) {
  console.log(`[RENDER] Отрисовка CourseCard: "${course.title}"`);

  const handleSelectClick = () => {
    localStorage.setItem('selected-course', course.id);
    console.log(`[HANDLER] Клик «Выбрать»: в localStorage записан id "${course.id}"`);
    onSelect(course.id);
  };

  return (
    <div
      style={{
        padding: '12px',
        border: isSelected ? '2px solid #2563eb' : '1px solid #ccc',
        borderRadius: '8px',
        marginBottom: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <h3 style={{ margin: '0 0 4px 0' }}>{course.title}</h3>
        <small style={{ color: '#555' }}>
          Категория: {course.category} | Мест: {course.seats}
        </small>
      </div>

      <button onClick={handleSelectClick}>
        {isSelected ? 'Выбрано' : 'Выбрать'}
      </button>
    </div>
  );
}