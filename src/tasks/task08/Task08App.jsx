import { useState } from 'react';
import coursesData from '../../data/courses.json';
import { CourseListView } from '../task07/CourseListView';
import { FilterBar } from './FilterBar';

export default function Task08App() {
  // Ближайший общий владелец состояния для панели фильтров и списка
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [selectedId, setSelectedId] = useState(null);

  // Одновременное применение поиска по title и фильтра по category
  const normalizedQuery = query.trim().toLowerCase();
  const filteredCourses = coursesData.filter((course) => {
    const matchesTitle = course.title.toLowerCase().includes(normalizedQuery);
    const matchesCategory = category === 'all' || course.category === category;
    return matchesTitle && matchesCategory;
  });

  // Производное значение без хранения второй копии в state
  const matchedCount = filteredCourses.length;

  const handleResetFilters = () => {
    setQuery('');
    setCategory('all');
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '24px', maxWidth: '680px' }}>
      <h2>Задание 8: Согласование интерфейса через общего родителя</h2>

      <FilterBar
        query={query}
        category={category}
        matchedCount={matchedCount}
        totalCount={coursesData.length}
        onQueryChange={setQuery}
        onCategoryChange={setCategory}
        onReset={handleResetFilters}
      />

      <div style={{ marginBottom: '12px', fontSize: '14px', color: '#4b5563' }}>
        Выбранный курс: <strong>{selectedId ?? 'не выбран'}</strong>
      </div>

      <CourseListView
        items={filteredCourses}
        selectedId={selectedId}
        emptyText="Совпадений не найдено. Измените запрос или сбросьте фильтры."
        onSelect={setSelectedId}
      />
    </div>
  );
}