import { useEffect, useRef } from 'react';

export function CourseBadge({ title }) {
  const nodeRef = useRef(null);

  console.log(`[RENDER] Вычисление компонента CourseBadge (title: "${title}")`);

  useEffect(() => {
    const targetNode = nodeRef.current;
    if (!targetNode) return;

    console.log('[EFFECT] Подписка MutationObserver создана');

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        console.log(
          `[DOM MUTATION] Тип: ${mutation.type} | Новое содержимое: "${targetNode.textContent}"`
        );
      }
    });

    observer.observe(targetNode, {
      childList: true,
      characterData: true,
      subtree: true,
      attributes: true,
    });

    return () => {
      observer.disconnect();
      console.log('[CLEANUP] Подписка MutationObserver очищена');
    };
  }, []);

  return (
    <div ref={nodeRef} className="ui-card ui-card--selected" style={{ marginTop: '16px' }}>
      <div className="meta-row">
        <strong>Курс:</strong> <span>{title}</span>
        <span className="badge badge--quality">Постоянный текст</span>
      </div>
    </div>
  );
}