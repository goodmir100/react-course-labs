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
    <div style={{ fontFamily: 'sans-serif', padding: '24px', maxWidth: '720px' }}>
      <h2>Задание 7: Контейнер каталога и представление</h2>

      {/* 1. Управляемый контейнер с фильтрацией и выбором */}
      <section style={{ marginBottom: '28px' }}>
        <h3 style={{ marginBottom: '8px' }}>1. Контейнер каталога (поиск + выбор)</h3>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Фильтр по названию или категории..."
            style={{ flex: 1, minWidth: '220px', padding: '6px 10px' }}
          />
          <button type="button" onClick={() => setQuery('')}>
            Сбросить поиск
          </button>
          <span style={{ fontSize: '14px' }}>
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

      <hr style={{ border: 0, borderTop: '1px solid #e5e7eb', margin: '24px 0' }} />

      {/* 2. Изолированное представление: полный список */}
      <section style={{ marginBottom: '28px' }}>
        <h3 style={{ marginBottom: '8px' }}>2. Представление с полным списком (без фильтрации)</h3>
        <CourseListView
          items={coursesData}
          selectedId={selectedId}
          emptyText="Курсы отсутствуют"
          onSelect={(id) => setSelectedId(id)}
        />
      </section>

      {/* 3. Изолированное представление: пустой массив */}
      <section>
        <h3 style={{ marginBottom: '8px' }}>3. Представление с пустым массивом (items=&#123;[]&#125;)</h3>
        <CourseListView
          items={[]}
          emptyText="В этом разделе пока нет доступных курсов"
          onSelect={(id) => setSelectedId(id)}
        />
      </section>
    </div>
  );
}