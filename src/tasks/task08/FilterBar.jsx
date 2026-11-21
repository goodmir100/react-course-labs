const CATEGORIES = [
  { value: 'all', label: 'Все направления' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'fullstack', label: 'Fullstack' },
  { value: 'quality', label: 'Quality' },
];

export function FilterBar({
  query,
  category,
  matchedCount,
  totalCount,
  onQueryChange,
  onCategoryChange,
  onReset,
}) {
  const isFiltered = query.trim() !== '' || category !== 'all';

  return (
    <section
      style={{
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px',
        backgroundColor: '#f9fafb',
      }}
    >
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Поиск по названию курса (title)..."
          style={{ flex: '1 1 220px', padding: '6px 10px' }}
        />

        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          aria-label="Фильтр по категории"
          style={{ padding: '6px 10px' }}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

        <button type="button" onClick={onReset} disabled={!isFiltered}>
          Сбросить оба фильтра
        </button>
      </div>

      <div style={{ fontSize: '14px', color: '#374151' }}>
        Найдено курсов: <strong>{matchedCount}</strong> из {totalCount}
      </div>
    </section>
  );
}