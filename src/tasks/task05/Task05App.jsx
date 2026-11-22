import { useState } from 'react';
import coursesData from '../../data/courses.json';
import { Panel } from './Panel';

export default function Task05App() {
  const [category, setCategory] = useState('all');
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [useLongTitles, setUseLongTitles] = useState(false);
  const [hideCardActions, setHideCardActions] = useState(false);

  const visibleCourses =
    category === 'all'
      ? coursesData
      : coursesData.filter((course) => course.category === category);

  const toggleEnroll = (id) => {
    setEnrolledIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const hasActiveFilter = category !== 'all';

  return (
    <main className="catalog-page">
      <header className="catalog-header">
        <h2>Задание 5: Композиция UI через универсальный Panel</h2>
        <p>Один переиспользуемый контейнер для фильтра и карточек без пропсов-модификаторов</p>
      </header>

      <Panel
        title={
          useLongTitles
            ? 'Фильтрация каталога учебных программ по направлениям разработки и обеспечения качества (длинный заголовок без разрыва макета)'
            : 'Фильтр курсов'
        }
        actions={
          hasActiveFilter ? (
            <button type="button" onClick={() => setCategory('all')}>
              Сбросить фильтр
            </button>
          ) : null
        }
      >
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {['all', 'frontend', 'fullstack', 'quality'].map((cat) => (
            <button
              key={cat}
              type="button"
              className={category === cat ? 'btn-active' : ''}
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
            >
              {cat === 'all' ? 'Все' : cat}
            </button>
          ))}
        </div>

        <div className="meta-row">
          <label style={{ cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={useLongTitles}
              onChange={(e) => setUseLongTitles(e.target.checked)}
            />{' '}
            Проверить длинные заголовки
          </label>
          <label style={{ cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={hideCardActions}
              onChange={(e) => setHideCardActions(e.target.checked)}
            />{' '}
            Убрать actions у карточек
          </label>
        </div>
      </Panel>

      {visibleCourses.map((course) => {
        const isEnrolled = enrolledIds.includes(course.id);
        const displayTitle = useLongTitles
          ? `${course.title} — углублённый практический модуль с разбором архитектуры, производительности и типовых сценариев использования в продакшене`
          : course.title;

        return (
          <Panel
            key={course.id}
            title={displayTitle}
            actions={
              hideCardActions ? null : (
                <button
                  type="button"
                  className={isEnrolled ? 'btn-primary' : ''}
                  disabled={course.seats === 0 && !isEnrolled}
                  onClick={() => toggleEnroll(course.id)}
                >
                  {isEnrolled
                    ? 'Отменить запись'
                    : course.seats === 0
                      ? 'Мест нет'
                      : 'Записаться'}
                </button>
              )
            }
          >
            <div className="meta-row">
              <span className={`badge badge--${course.category}`}>{course.category}</span>
              <span>
                Свободных мест: <strong>{course.seats}</strong>
              </span>
              <span>Версия: v{course.version}</span>
            </div>
          </Panel>
        );
      })}
    </main>
  );
}