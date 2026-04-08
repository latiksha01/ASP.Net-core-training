import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLogs, clearLogs } from '../features/ui/uiSlice';

export default function ActionLogs() {
  const logs = useSelector(selectLogs);
  const dispatch = useDispatch();

  return (
    <div className="page-inner">
      <div className="table-card" style={{ padding: '20px' }}>
        <div className="table-header" style={{ padding: 0, marginBottom: '14px' }}>
          <span className="table-title">Redux Action Log (Middleware)</span>
          <button className="btn btn-secondary btn-sm" onClick={() => dispatch(clearLogs())}>
            Clear logs
          </button>
        </div>
        <div className="log-panel">
          {logs.length === 0
            ? <div className="log-empty">Dispatch an action to see logs here...</div>
            : logs.map((log, i) => (
              <div className="log-entry" key={i}>
                <span className="log-time">{log.time}</span>
                <span className="log-action">{log.type}</span>
                {log.payload !== undefined && (
                  <span className="log-payload">
                    {JSON.stringify(log.payload).slice(0, 80)}
                    {JSON.stringify(log.payload).length > 80 ? '...' : ''}
                  </span>
                )}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}