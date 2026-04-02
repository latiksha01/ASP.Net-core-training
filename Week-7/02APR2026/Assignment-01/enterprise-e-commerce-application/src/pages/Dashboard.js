import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="card max-w-4xl mx-auto">
      <h1 className="page-title mb-8">📊 Dashboard Overview</h1>
      
      <div className="grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'}}>
        <div className="card p-8 text-center">
          <div className="text-4xl mb-4">🛍️</div>
          <h3 className="text-2xl font-bold mb-2 text-text-primary">12,450</h3>
          <p className="text-text-secondary">Total Orders</p>
          <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-800 rounded text-sm font-semibold">+12.5%</span>
        </div>
        
        <div className="card p-8 text-center">
          <div className="text-4xl mb-4">💰</div>
          <h3 className="text-2xl font-bold mb-2 text-text-primary">$245,890</h3>
          <p className="text-text-secondary">Revenue</p>
          <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-800 rounded text-sm font-semibold">+28.3%</span>
        </div>
        
        <div className="card p-8 text-center">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-2xl font-bold mb-2 text-text-primary">8,240</h3>
          <p className="text-text-secondary">Active Users</p>
          <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-800 rounded text-sm font-semibold">+5.2%</span>
        </div>
        
        <div className="card p-8 text-center">
          <div className="text-4xl mb-4">⭐</div>
          <h3 className="text-2xl font-bold mb-2 text-text-primary">4.92</h3>
          <p className="text-text-secondary">Avg Rating</p>
          <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-800 rounded text-sm font-semibold">4.8 → 4.92</span>
        </div>
      </div>

      <div className="mt-12 p-6 bg-bg-secondary rounded">
        <h3 className="text-xl font-bold mb-4">📋 Quick Actions</h3>
        <div className="grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'}}>
          <a href="/products" className="btn btn-primary no-underline">View Products</a>
          <button className="btn btn-secondary">New Order</button>
          <button className="btn btn-secondary">User Management</button>
        </div>
      </div>
    </div>
  );
}
