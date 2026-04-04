import React, { useState, useEffect } from 'react';
import { getAllBills, getBillById, deleteBill } from '../api/api';
import './PastBills.css';

function PastBills() {
  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchBills = async () => {
    try {
      setError('');
      const data = await getAllBills(status);
      setBills(data);
    } catch (err) {
      console.error('Fetch bills error:', err);
      setError(`Failed to load bills: ${err.message}`);
    }
  };

  useEffect(() => { fetchBills(); }, [status]);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this bill?')) {
      await deleteBill(id);
      fetchBills();
    }
  };

  const handlePrint = (bill) => window.print();

  const handlePDF = async (id) => {
    try {
      setLoading(true);
      const bill = await getBillById(id);
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      
      // Header
      doc.setFontSize(24);
      doc.text(`INVOICE ${bill.invoiceNumber}`, 105, 25, { align: 'center' });
      doc.setFontSize(12);
      doc.text(`Customer: ${bill.customerName}`, 20, 45);
      doc.text(`Date: ${new Date(bill.createdAt).toLocaleDateString('en-IN')}`, 20, 55);
      
      // Table headers
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Item', 20, 75);
      doc.text('Qty', 90, 75);
      doc.text('Unit Price', 120, 75);
      doc.text('Total', 160, 75);
      
      // Items
      doc.setFont('helvetica', 'normal');
      let y = 83;
      bill.items.forEach(item => {
        const itemText = doc.splitTextToSize(item.name, 65);
        doc.text(itemText, 20, y);
        doc.text(item.quantity.toString(), 90, y);
        doc.text(`Rs. ${item.unitPrice.toFixed(2)}`, 120, y);
        doc.text(`Rs. ${item.total.toFixed(2)}`, 160, y);
        y += itemText.length * 5 || 8;
      });
      
      // Totals
      doc.setFont('helvetica', 'bold');
      doc.text(`Subtotal: Rs. ${bill.subtotal.toFixed(2)}`, 120, y + 10);
      let totalY = y + 8;
      if (bill.discountAmount > 0) {
        doc.text(`Discount: -Rs. ${bill.discountAmount.toFixed(2)}`, 120, totalY);
        totalY += 8;
      }
      doc.text(`Tax (${bill.taxPercent}%): Rs. ${bill.taxAmount.toFixed(2)}`, 120, totalY);
      totalY += 8;
      doc.text(`Grand Total: Rs. ${bill.grandTotal.toFixed(2)}`, 120, totalY);
      totalY += 15;
      doc.text(`Notes: ${bill.notes}`, 20, totalY);
      
      doc.save(`invoice-${bill.invoiceNumber}.pdf`);
    } catch (err) {
      console.error('PDF error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCSV = async (id) => {
    try {
      const bill = await getBillById(id);
      const csvContent = [
        ['Invoice', bill.invoiceNumber],
        ['Customer', bill.customerName],
        ['Date', new Date(bill.createdAt).toLocaleDateString('en-IN')],
        [],
        ['Item', 'Qty', 'Price', 'Total'],
        ...bill.items.map(i => [i.name, i.quantity, i.unitPrice, i.total]),
        [],
        ['', '', 'Subtotal', bill.subtotal],
        ['', '', 'Discount', bill.discountAmount],
        ['', '', 'Tax', bill.taxAmount],
        ['', '', 'Grand Total', bill.grandTotal]
      ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${bill.invoiceNumber}.csv`;
      a.click();
    } catch (err) {
      console.error('CSV error:', err);
    }
  };

  const filtered = bills.filter(b =>
    b.customerName?.toLowerCase().includes(search.toLowerCase()) ||
    b.invoiceNumber?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="past-bills">
      <h2>Past Bills</h2>
      <div className="filters">
        <input
          placeholder="Search by customer or invoice..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="final">Final</option>
          <option value="void">Void</option>
        </select>
      </div>

      <table className="bills-table">
        <thead>
          <tr>
            <th>Invoice No</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {error ? (
            <tr><td colSpan="6" className="error-msg">{error}</td></tr>
          ) : filtered.length === 0 ? (
            <tr><td colSpan="6" className="empty-msg">No bills found</td></tr>
          ) : (
            filtered.map(bill => (
              <tr key={bill.id}>
                <td className="invoice-num">{bill.invoiceNumber}</td>
                <td>{bill.customerName}</td>
                <td>{new Date(bill.createdAt).toLocaleDateString('en-IN')}</td>
                <td>
                  <span className={`status-badge ${bill.status}`}>{bill.status}</span>
                </td>
                <td className="amount">₹{Number(bill.grandTotal).toFixed(2)}</td>
                <td>
                  <div className="bill-actions-small">
                    <button onClick={() => handlePrint(bill)} className="btn-tiny" title="Print">🖨</button>
                    <button onClick={() => handlePDF(bill.id)} className="btn-tiny" title="PDF" disabled={loading}>📄</button>
                    <button onClick={() => handleCSV(bill.id)} className="btn-tiny" title="CSV" disabled={loading}>📊</button>
                    <button onClick={() => handleDelete(bill.id)} className="btn-delete">Delete</button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PastBills;
