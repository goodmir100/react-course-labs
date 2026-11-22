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
      <span>{item.title}</span>
      <code style={{ color: 'var(--text-muted)' }}>{checksum}</code>
    </li>
  );
}

const Results = memo(function Results({ query }) {
  const filtered = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="meta-row">
        <span>
          Показаны результаты для запроса:{' '}
          <strong>{query === '' ? '«все курсы» (пустой запрос)' : `«${query}»`}</strong>{' '}
          (найдено: {filtered.length})
        </span>
      </div>
      <ul className="scroll-list">
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
    <main className="catalog-page">
      <header className="catalog-header">
        <h2>Задание 4: Отложенное значение (useDeferredValue)</h2>
        <p>Индикация временного отставания результатов с сохранением границы React.memo</p>
      </header>

      <section className="ui-card">
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Введите запрос быстро..."
            style={{ flex: '1 1 240px' }}
          />
          <button type="button" onClick={() => setText('')}>
            Очистить
          </button>
        </div>

        {isStale && (
          <div className="notice-warning" style={{ marginBottom: '12px' }}>
            Обновляем результаты (введено: «{text}», в списке пока: «{deferredQuery}»)...
          </div>
        )}

        <div style={{ opacity: isStale ? 0.65 : 1, transition: 'opacity 120ms ease' }}>
          <Results query={deferredQuery} />
        </div>
      </section>
    </main>
  );
}