import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("auth", "true");
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleLogin} className="card">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" required />
      </div>
      <button type="submit" className="btn btn-primary w-full">🔐 Sign In</button>
      <p className="mt-4 text-center text-text-secondary">
        Don&apos;t have an account? <a href="/register" className="text-text-primary hover:underline font-semibold">Sign up</a>
      </p>
    </form>
  );
}
