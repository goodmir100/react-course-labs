import coursesData from '../../data/courses.json';
import { useFavorites } from './useFavorites';
import { FavoritesPanel } from './FavoritesPanel';

export default function Task11App() {
  const { ids, toggle, clear } = useFavorites();

  return (
    <main className="catalog-page">
      <header className="catalog-header">
        <h2>Задание 11: Пользовательский хук useFavorites</h2>
        <p>Инкапсуляция логики списка избранного без привязки к разметке и синхронизация через общего владельца</p>
      </header>

      <FavoritesPanel
        courses={coursesData}
        favoriteIds={ids}
        onToggle={toggle}
        onClear={clear}
      />

      <section style={{ marginTop: '20px' }}>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', color: 'var(--text-secondary)' }}>
          Каталог курсов
        </h3>
        <ul className="clean-list">
          {coursesData.map((course) => {
            const isFavorite = ids.includes(course.id);

            return (
              <li
                key={course.id}
                className={`ui-card ${isFavorite ? 'ui-card--selected' : ''}`}
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
                    className={isFavorite ? 'btn-active' : ''}
                    onClick={() => toggle(course.id)}
                    aria-pressed={isFavorite}
                  >
                    {isFavorite ? '★ В избранном' : '☆ В избранное'}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}