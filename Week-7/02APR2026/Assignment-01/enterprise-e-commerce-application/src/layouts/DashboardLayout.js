// layouts/DashboardLayout.js
import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-bg-secondary">
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <h3 className="text-xl font-bold text-text-primary">📊 Dashboard</h3>
        </div>
        <nav className="p-4 flex-1 space-y-1">
          <Link to="/dashboard/home" className="nav-link block p-2">🏠 Dashboard Home</Link>
          <Link to="/dashboard/analytics" className="nav-link block p-2">📈 Analytics</Link>
          <Link to="/dashboard/settings" className="nav-link block p-2">⚙️ Settings</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
