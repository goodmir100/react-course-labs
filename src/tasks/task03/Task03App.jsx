import { memo, useState, useTransition } from 'react';
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
          Отображено карточек: <strong>{filtered.length}</strong> (актуальный запрос списка: «{query}»)
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

export default function Task03App() {
  const [text, setText] = useState('');
  const [listQuery, setListQuery] = useState('');
  const [useTransitionMode, setUseTransitionMode] = useState(true);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const nextValue = e.target.value;
    setText(nextValue);

    if (useTransitionMode) {
      startTransition(() => {
        setListQuery(nextValue);
      });
    } else {
      setListQuery(nextValue);
    }
  };

  const handleClear = () => {
    setText('');
    if (useTransitionMode) {
      startTransition(() => {
        setListQuery('');
      });
    } else {
      setListQuery('');
    }
  };

  return (
    <main className="catalog-page">
      <header className="catalog-header">
        <h2>Задание 3: Срочный ввод и useTransition</h2>
        <p>Разделение приоритетов между управляемым полем ввода и дорогим списком из 240 карточек</p>
      </header>

      <section className="ui-card">
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '14px' }}>
            <input
              type="checkbox"
              checked={useTransitionMode}
              onChange={(e) => setUseTransitionMode(e.target.checked)}
            />
            Режим <code>useTransition</code>
          </label>

          {useTransitionMode && isPending && (
            <span className="badge" style={{ backgroundColor: '#fef3c7', color: '#92400e' }}>
              Обновление списка (isPending)...
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={text}
            onChange={handleChange}
            placeholder="Введите запрос быстро..."
            style={{ flex: '1 1 240px' }}
          />
          <button type="button" onClick={handleClear}>
            Очистить
          </button>
        </div>

        <Results query={listQuery} />
      </section>
    </main>
  );
}