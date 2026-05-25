'use client';
import { useEffect } from 'react';

export default function Toast({ toasts, removeToast }) {
  useEffect(() => {
    if (!toasts.length) return;
    const timer = setTimeout(() => removeToast(toasts[0].id), 3500);
    return () => clearTimeout(timer);
  }, [toasts, removeToast]);

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          <span className="toast-icon">{t.type === 'success' ? '✅' : '❌'}</span>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
