import { useState } from 'react';
import coursesData from '../../data/courses.json';
import { useFavorites } from '../task11/useFavorites';
import { SelectedCoursePanel } from './SelectedCoursePanel';

const CATEGORIES = [
  { value: 'all', label: 'Все направления' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'fullstack', label: 'Fullstack' },
  { value: 'quality', label: 'Quality' },
];

export default function Task12App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [selectedId, setSelectedId] = useState(null);
  const { ids: favoriteIds, toggle: toggleFavorite, clear: clearFavorites } = useFavorites();

  const normalizedQuery = query.trim().toLowerCase();
  const filteredCourses = coursesData.filter((course) => {
    const matchesTitle = course.title.toLowerCase().includes(normalizedQuery);
    const matchesCategory = category === 'all' || course.category === category;
    return matchesTitle && matchesCategory;
  });

  const matchedCount = filteredCourses.length;
  const selectedCourse = coursesData.find((course) => course.id === selectedId) ?? null;
  const isSelectedVisibleInFilter = selectedCourse
    ? filteredCourses.some((course) => course.id === selectedCourse.id)
    : false;

  const favoriteCourses = coursesData.filter((course) => favoriteIds.includes(course.id));
  const isFiltered = query.trim() !== '' || category !== 'all';

  const handleResetFilters = () => {
    setQuery('');
    setCategory('all');
  };

  return (
    <main className="catalog-page">
      <header className="catalog-header">
        <h2>Каталог курсов</h2>
        <p>Поиск, фильтрация по направлениям, выбор карточки и список избранного</p>
      </header>

      {/* Панель поиска и фильтрации */}
      <section className="ui-card">
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по названию курса..."
            style={{ flex: '1 1 240px' }}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Фильтр по категории"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          <button type="button" onClick={handleResetFilters} disabled={!isFiltered}>
            Сбросить фильтры
          </button>
        </div>

        <div className="meta-row">
          <span>
            Найдено: <strong>{matchedCount}</strong> из {coursesData.length}
          </span>
        </div>
      </section>

      {/* Карточка выбранного курса */}
      <SelectedCoursePanel
        course={selectedCourse}
        isVisibleInFilter={isSelectedVisibleInFilter}
        isFavorite={selectedCourse ? favoriteIds.includes(selectedCourse.id) : false}
        onToggleFavorite={toggleFavorite}
        onClearSelection={() => setSelectedId(null)}
      />

      {/* Панель избранного */}
      <aside className="ui-card">
        <div className="ui-card-header">
          <h3 className="ui-card-title">Избранное ({favoriteIds.length})</h3>
          <button
            type="button"
            onClick={clearFavorites}
            disabled={favoriteIds.length === 0}
          >
            Очистить избранное
          </button>
        </div>

        {favoriteCourses.length === 0 ? (
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
            Список избранного пуст. Добавляйте курсы кнопкой «В избранное».
          </p>
        ) : (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {favoriteCourses.map((course) => (
              <span key={course.id} className="fav-chip">
                {course.title}
                <button
                  type="button"
                  onClick={() => toggleFavorite(course.id)}
                  aria-label={`Убрать ${course.title} из избранного`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </aside>

      {/* Список отфильтрованных курсов */}
      <section style={{ marginTop: '24px' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', color: 'var(--text-secondary)' }}>
          Доступные программы ({matchedCount})
        </h3>

        {filteredCourses.length === 0 ? (
          <div className="empty-box">
            По текущим параметрам поиска курсы не найдены. Выбранный курс и избранное сохранены.
          </div>
        ) : (
          filteredCourses.map((course) => {
            const isSelected = course.id === selectedId;
            const isFavorite = favoriteIds.includes(course.id);

            return (
              <article
                key={course.id}
                className={`ui-card ${isSelected ? 'ui-card--selected' : ''}`}
              >
                <div className="ui-card-header">
                  <h4 className="ui-card-title">{course.title}</h4>
                  <div className="ui-card-actions">
                    <button
                      type="button"
                      className={isSelected ? 'btn-primary' : ''}
                      onClick={() => setSelectedId(isSelected ? null : course.id)}
                      aria-pressed={isSelected}
                    >
                      {isSelected ? 'Выбрано' : 'Выбрать'}
                    </button>
                    <button
                      type="button"
                      className={isFavorite ? 'btn-active' : ''}
                      onClick={() => toggleFavorite(course.id)}
                      aria-pressed={isFavorite}
                    >
                      {isFavorite ? '★ В избранном' : '☆ В избранное'}
                    </button>
                  </div>
                </div>

                <div className="meta-row">
                  <span className={`badge badge--${course.category}`}>{course.category}</span>
                  <span>
                    ID: <code>{course.id}</code>
                  </span>
                  <span>
                    Мест: <strong>{course.seats}</strong>
                  </span>
                </div>
              </article>
            );
          })
        )}
      </section>
    </main>
  );
}