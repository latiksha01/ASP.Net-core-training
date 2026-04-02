import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex">
      <aside className="w-48 bg-primary border-r border-border sticky top-0 h-screen overflow-auto">
        <div className="p-2 border-b border-border">
          <a href="/" className="navbar-brand text-sm">E-Commerce Pro</a>
        </div>
        <nav className="p-2 space-y-0.5">
          <Link to="/" className="nav-link block p-1 text-sm">🏠 Home</Link>
          <Link to="/about" className="nav-link block p-1 text-sm">📄 About</Link>
          <Link to="/contact" className="nav-link block p-1 text-sm">📞 Contact</Link>
          <Link to="/products" className="nav-link block p-1 text-sm">🛍️ Products</Link>
          <Link to="/login" className="nav-link block p-1 text-sm">🔐 Login</Link>
        </nav>
      </aside>
      <div className="flex-1 min-h-screen">
        <main className="page-content p-4">
          <Outlet />
        </main>
        <footer className="text-center py-2 border-t border-border bg-primary text-xs text-muted">
          © 2026 E-Commerce Enterprise. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
