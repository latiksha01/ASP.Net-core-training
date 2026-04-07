import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleLogin = () => {
    const success = login(form.username, form.password);
    if (success) {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials. Use admin/1234");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="login-card">
          <h2>👋 Sign In</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Email: <strong>admin</strong> | Password: <strong>1234</strong>
          </p>

          <input
            type="email"
            placeholder="admin@example.com"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="1234"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button 
            onClick={handleLogin}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              color: 'white',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            🚀 Login
          </button>
        </div>
      </div>

      <div className="login-right">
        <h1>Welcome Back!</h1>
        <p>Employee Portal v2.0</p>
      </div>
    </div>
  );
}
