import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="layout">
      <Sidebar />

      <div className="dashboard">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <h2>Settings</h2>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Appearance</span>
        </div>
        
        <div className="card" style={{ maxWidth: '400px', padding: '32px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', fontWeight: 500 }}>
            <span>Theme Mode</span>
            <button 
              onClick={toggleTheme}
              style={{
                width: '48px', height: '28px', borderRadius: '14px', 
                background: theme === 'light' ? 'var(--success)' : 'var(--danger)',
                position: 'relative', border: 'none', cursor: 'pointer'
              }}
            >
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%',
                background: 'white', position: 'absolute', top: '2px',
                left: theme === 'light' ? '2px' : '24px',
                transition: 'left 0.3s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }} />
            </button>
          </label>
          <div style={{ marginTop: '24px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Current: <strong>{theme.toUpperCase()} Mode</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
