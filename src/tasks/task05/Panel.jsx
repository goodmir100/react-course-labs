export function Panel({ title, actions, children }) {
  const hasActions = Boolean(actions);

  return (
    <section className="ui-card">
      <header className="ui-card-header" style={{ marginBottom: children ? '12px' : 0 }}>
        <h3 className="ui-card-title">{title}</h3>
        {hasActions && <div className="ui-card-actions">{actions}</div>}
      </header>

      {children && <div>{children}</div>}
    </section>
  );
}