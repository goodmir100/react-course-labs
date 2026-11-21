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
    <div style={{ fontFamily: 'sans-serif', padding: '24px', maxWidth: '640px' }}>
      <h2>Задание 5: Композиция UI через универсальный Panel</h2>

      {/* Сценарий 1: Блок фильтрации на базе Panel */}
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
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
          {['all', 'frontend', 'fullstack', 'quality'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
              style={{
                fontWeight: category === cat ? 'bold' : 'normal',
                border: category === cat ? '2px solid #2563eb' : '1px solid #9ca3af',
                borderRadius: '4px',
                padding: '4px 10px',
                cursor: 'pointer',
              }}
            >
              {cat === 'all' ? 'Все' : cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '14px' }}>
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

      {/* Сценарий 2: Карточки курсов на базе того же Panel */}
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
            <p style={{ margin: 0, fontSize: '14px', color: '#4b5563' }}>
              Направление: <strong>{course.category}</strong> · Свободных мест:{' '}
              <strong>{course.seats}</strong> · Версия: v{course.version}
            </p>
          </Panel>
        );
      })}
    </div>
  );
}