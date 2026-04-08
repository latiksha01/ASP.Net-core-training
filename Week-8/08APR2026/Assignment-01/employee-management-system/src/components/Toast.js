import React, { useEffect, useState } from 'react';

// Single Toast Item
function ToastItem({ message, type, onRemove }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onRemove, 300); // wait for fade-out animation
    }, 3200);
    return () => clearTimeout(timer);
  }, [onRemove]);

  return (
    <div className={`toast toast-${type} ${visible ? 'toast-enter' : 'toast-exit'}`}>
      <div className="toast-icon">
        {type === 'success' && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7l3 3 7-7" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {type === 'error' && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 4v4M7 10v.5" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        )}
        {type === 'info' && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="#3b82f6" strokeWidth="1.3"/>
            <path d="M7 6v4M7 4.5v.5" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )}
        {type === 'warning' && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2L13 12H1L7 2z" stroke="#f59e0b" strokeWidth="1.3" strokeLinejoin="round"/>
            <path d="M7 6v3M7 10.5v.5" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )}
      </div>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={() => { setVisible(false); setTimeout(onRemove, 300); }}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
}

// Toast Container — place this once in App.jsx
export default function Toast({ toasts, removeToast }) {
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <ToastItem
          key={t.id}
          message={t.message}
          type={t.type}
          onRemove={() => removeToast(t.id)}
        />
      ))}
    </div>
  );
}