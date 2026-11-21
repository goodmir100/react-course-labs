export function Panel({ title, actions, children }) {
  const hasActions = Boolean(actions);

  return (
    <section
      style={{
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '12px',
        backgroundColor: '#fff',
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '12px',
          marginBottom: children ? '12px' : 0,
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: '16px',
            lineHeight: 1.4,
            flex: '1 1 auto',
            minWidth: 0,
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
          }}
        >
          {title}
        </h3>

        {hasActions && (
          <div
            style={{
              display: 'flex',
              gap: '8px',
              flexShrink: 0,
              alignItems: 'center',
            }}
          >
            {actions}
          </div>
        )}
      </header>

      {children && <div>{children}</div>}
    </section>
  );
}