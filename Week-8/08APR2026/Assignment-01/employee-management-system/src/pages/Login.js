import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('admin@ems.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    if (!email || !password) {
      setError('Please enter credentials');
      return;
    }
    setLoading(true);

    setTimeout(() => {
      if (email === 'admin@ems.com' && password === 'admin123') {
        dispatch(login({ email, name: 'Admin User', role: 'Administrator' }));
      } else {
        setError('Invalid credentials. Use admin@ems.com / admin123');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo-box">
          <span className="logo-icon">⬛</span>
        </div>

        <h2 className="login-title">EMS Dashboard</h2>
        <p className="login-sub">Redux-powered Employee Management</p>

        <div className="login-form">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />

          {error && <div className="login-error">{error}</div>}

          <button
            className="login-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in to Dashboard'}
          </button>
        </div>

        <p className="login-hint">Use: admin@ems.com / admin123</p>
      </div>
    </div>
  );
}