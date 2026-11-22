import { useState } from 'react';
import coursesData from '../../data/courses.json';
import { CourseListView } from '../task07/CourseListView';
import { FilterBar } from './FilterBar';

export default function Task08App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [selectedId, setSelectedId] = useState(null);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredCourses = coursesData.filter((course) => {
    const matchesTitle = course.title.toLowerCase().includes(normalizedQuery);
    const matchesCategory = category === 'all' || course.category === category;
    return matchesTitle && matchesCategory;
  });

  const matchedCount = filteredCourses.length;

  const handleResetFilters = () => {
    setQuery('');
    setCategory('all');
  };

  return (
    <main className="catalog-page">
      <header className="catalog-header">
        <h2>Задание 8: Согласование интерфейса через общего родителя</h2>
        <p>Подъём состояния поиска и категории в общего владельца с вычислением производного счётчика</p>
      </header>

      <FilterBar
        query={query}
        category={category}
        matchedCount={matchedCount}
        totalCount={coursesData.length}
        onQueryChange={setQuery}
        onCategoryChange={setCategory}
        onReset={handleResetFilters}
      />

      <div className="meta-row" style={{ marginBottom: '12px' }}>
        <span>
          Выбранный курс: <strong>{selectedId ?? 'не выбран'}</strong>
        </span>
      </div>

      <CourseListView
        items={filteredCourses}
        selectedId={selectedId}
        emptyText="Совпадений не найдено. Измените запрос или сбросьте фильтры."
        onSelect={setSelectedId}
      />
    </main>
  );
}