import { memo, useDeferredValue, useState } from 'react';
import coursesData from '../../data/courses.json';

const baseTitles = coursesData.map((c) => c.title);

const items = Array.from({ length: 240 }, (_, i) => ({
  id: String(i),
  title: `${baseTitles[i % baseTitles.length]} #${i}`,
}));

function CourseCard({ item, query }) {
  let checksum = item.id.length + query.length;
  for (let i = 0; i < 80000; i++) {
    checksum = (Math.imul(checksum, 31) + i) | 0;
  }
  return (
    <li>
      {item.title} — <small style={{ color: '#666' }}>{checksum}</small>
    </li>
  );
}

const Results = memo(function Results({ query }) {
  const filtered = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <p style={{ fontSize: '14px', color: '#333' }}>
        Показаны результаты для запроса:{' '}
        <strong>{query === '' ? '«все курсы» (пустой запрос)' : `«${query}»`}</strong>{' '}
        (найдено: {filtered.length})
      </p>
      <ul style={{ maxHeight: '320px', overflowY: 'auto', border: '1px solid #ddd', padding: '12px 24px' }}>
        {filtered.map((item) => (
          <CourseCard key={item.id} item={item} query={query} />
        ))}
      </ul>
    </div>
  );
});

export default function Task04App() {
  const [text, setText] = useState('');
  const deferredQuery = useDeferredValue(text);
  const isStale = text !== deferredQuery;

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '24px', maxWidth: '640px' }}>
      <h2>Задание 4: Отложенное значение (useDeferredValue)</h2>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
        <label>
          Поиск:{' '}
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Введите запрос быстро..."
            style={{ padding: '6px 10px', width: '240px' }}
          />
        </label>
        <button onClick={() => setText('')}>Очистить</button>
      </div>

      <div style={{ minHeight: '24px', marginBottom: '12px' }}>
        {isStale && (
          <span style={{ color: '#d97706', fontWeight: 'bold' }}>
            Обновляем результаты (введено: «{text}», в списке пока: «{deferredQuery}»)...
          </span>
        )}
      </div>

      <div style={{ opacity: isStale ? 0.65 : 1, transition: 'opacity 120ms ease' }}>
        <Results query={deferredQuery} />
      </div>
    </div>
  );
}
