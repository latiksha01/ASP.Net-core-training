import React, { useState, useEffect } from 'react';
import { getDailySummary } from '../api/api';
import './SalesDashboard.css';

function SalesDashboard() {
  const [summary, setSummary] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    getDailySummary(date).then(setSummary).catch(error => {
      console.error('Dashboard error:', error);
    });
  }, [date]);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Daily Sales Summary</h2>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      </div>

      {summary && (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Total Bills</div>
              <div className="stat-value">{summary.totalBills}</div>
            </div>
            <div className="stat-card green">
              <div className="stat-label">Total Revenue</div>
              <div className="stat-value">₹{Number(summary.totalRevenue || 0).toFixed(2)}</div>
            </div>
            <div className="stat-card orange">
              <div className="stat-label">Tax Collected</div>
              <div className="stat-value">₹{Number(summary.totalTax || 0).toFixed(2)}</div>
            </div>
            <div className="stat-card purple">
              <div className="stat-label">Total Discounts</div>
              <div className="stat-value">₹{Number(summary.totalDiscount || 0).toFixed(2)}</div>
            </div>
          </div>

          <div className="category-section">
            <h3>Revenue by Category</h3>
            <table className="category-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Items Sold</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {summary.byCategory && summary.byCategory.map(cat => (
                  <tr key={cat.category}>
                    <td className="capitalize">{cat.category}</td>
                    <td>{cat.count}</td>
                    <td className="amount">₹{Number(cat.total).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default SalesDashboard;