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
    <section className="ui-card">
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Поиск по названию курса (title)..."
          style={{ flex: '1 1 220px' }}
        />

        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          aria-label="Фильтр по категории"
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

      <div className="meta-row">
        <span>
          Найдено курсов: <strong>{matchedCount}</strong> из {totalCount}
        </span>
      </div>
    </section>
  );
}