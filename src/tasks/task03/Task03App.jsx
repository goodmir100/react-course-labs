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
      <p style={{ fontSize: '14px', color: '#555' }}>
        Отображено карточек: <strong>{filtered.length}</strong> (актуальный запрос списка: «{query}»)
      </p>
      <ul style={{ maxHeight: '320px', overflowY: 'auto', border: '1px solid #ddd', padding: '12px 24px' }}>
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

    // 1. Срочное обновление управляемого input (всегда вне transition)
    setText(nextValue);

    // 2. Обновление тяжёлого списка: либо через transition, либо в обычном режиме
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
    <div style={{ fontFamily: 'sans-serif', padding: '24px', maxWidth: '640px' }}>
      <h2>Задание 3: Срочный ввод и useTransition</h2>

      <div style={{ marginBottom: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={useTransitionMode}
            onChange={(e) => setUseTransitionMode(e.target.checked)}
          />
          Режим <code>useTransition</code>
        </label>

        {useTransitionMode && isPending && (
          <span style={{ color: '#d97706', fontWeight: 'bold' }}>
            Обновление списка (isPending)...
          </span>
        )}
      </div>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
        <label>
          Поиск:{' '}
          <input
            value={text}
            onChange={handleChange}
            placeholder="Введите запрос быстро..."
            style={{ padding: '6px 10px', width: '240px' }}
          />
        </label>
        <button onClick={handleClear}>Очистить</button>
      </div>

      <Results query={listQuery} />
    </div>
  );
}