import coursesData from '../../data/courses.json';
import { useFavorites } from './useFavorites';
import { FavoritesPanel } from './FavoritesPanel';

export default function Task11App() {
  // Один экземпляр хука у ближайшего общего владельца
  const { ids, toggle, clear } = useFavorites();

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '24px', maxWidth: '680px' }}>
      <h2>Задание 11: Пользовательский хук useFavorites</h2>

      <FavoritesPanel
        courses={coursesData}
        favoriteIds={ids}
        onToggle={toggle}
        onClear={clear}
      />

      <section>
        <h3 style={{ marginBottom: '10px', fontSize: '16px' }}>Каталог курсов</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '10px' }}>
          {coursesData.map((course) => {
            const isFavorite = ids.includes(course.id);

            return (
              <li
                key={course.id}
                style={{
                  padding: '12px 16px',
                  border: isFavorite ? '2px solid #2563eb' : '1px solid #d1d5db',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: isFavorite ? '#eff6ff' : '#fff',
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
                  onClick={() => toggle(course.id)}
                  aria-pressed={isFavorite}
                >
                  {isFavorite ? 'Убрать из избранного' : 'В избранное'}
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}