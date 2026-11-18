import {useEffect, useRef} from 'react'; 

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
    <div
    ref={nodeRef}
    style={{
        padding: '12px',
        border: '1px solid #888',
        borderRadius: '8px',
        marginTop: '16px',
    }}
    >
        <strong>Курс:</strong> {title} - <span>Постоянный текст</span>
    </div>
  )
}