import { useState } from 'react';
import coursesData from '../../data/courses.json';
import { CourseListView } from './CourseListView';

export default function Task07App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredCourses = normalizedQuery
    ? coursesData.filter(
        (course) =>
          course.title.toLowerCase().includes(normalizedQuery) ||
          course.category.toLowerCase().includes(normalizedQuery)
      )
    : coursesData;

  return (
    <main className="catalog-page">
      <header className="catalog-header">
        <h2>Задание 7: Контейнер каталога и представление</h2>
        <p>Отделение состояния и фильтрации от чистого компонента отображения CourseListView</p>
      </header>

      <section style={{ marginBottom: '28px' }}>
        <h3 style={{ marginBottom: '10px', fontSize: '16px' }}>1. Контейнер каталога (поиск + выбор)</h3>

        <div className="ui-card" style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Фильтр по названию или категории..."
            style={{ flex: '1 1 220px' }}
          />
          <button type="button" onClick={() => setQuery('')}>
            Сбросить поиск
          </button>
          <span className="meta-row">
            Выбранный ID: <strong>{selectedId ?? 'не выбран'}</strong>
          </span>
        </div>

        <CourseListView
          items={filteredCourses}
          selectedId={selectedId}
          emptyText={`По запросу «${query}» курсы не найдены`}
          onSelect={(id) => setSelectedId(id)}
        />
      </section>

      <section style={{ marginBottom: '28px' }}>
        <h3 style={{ marginBottom: '10px', fontSize: '16px' }}>2. Представление с полным списком</h3>
        <CourseListView
          items={coursesData}
          selectedId={selectedId}
          emptyText="Курсы отсутствуют"
          onSelect={(id) => setSelectedId(id)}
        />
      </section>

      <section>
        <h3 style={{ marginBottom: '10px', fontSize: '16px' }}>3. Представление с пустым массивом (items=&#123;[]&#125;)</h3>
        <CourseListView
          items={[]}
          emptyText="В этом разделе пока нет доступных курсов"
          onSelect={(id) => setSelectedId(id)}
        />
      </section>
    </main>
  );
}