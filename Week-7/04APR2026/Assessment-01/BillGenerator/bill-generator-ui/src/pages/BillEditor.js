import React, { useState, useEffect } from 'react';
import { getCatalogs, createBill } from '../api/api';
import './BillEditor.css';

const CATALOG_TYPES = ['entrance', 'donation', 'merchandise', 'food'];

function BillEditor() {
  const [activeType, setActiveType] = useState('entrance');
  const [catalogItems, setCatalogItems] = useState([]);
  const [billItems, setBillItems] = useState([]);
  const [customerName, setCustomerName] = useState('Walk-in');
  const [discountType, setDiscountType] = useState('percent');
  const [discountValue, setDiscountValue] = useState(0);
  const [taxPercent, setTaxPercent] = useState(18);
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');
  const [customName, setCustomName] = useState('');
  const [customPrice, setCustomPrice] = useState('');

  useEffect(() => {
    getCatalogs(activeType).then(setCatalogItems).catch(console.error);
  }, [activeType]);

  const addItemFromCatalog = (item) => {
    const existing = billItems.find(i => i.name === item.name);
    if (existing) {
      setBillItems(billItems.map(i =>
        i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setBillItems([...billItems, {
        name: item.name,
        catalogType: item.catalogType,
        quantity: 1,
        unitPrice: item.price,
      }]);
    }
  };

  const addCustomItem = () => {
    if (!customName || !customPrice) return;
    setBillItems([...billItems, {
      name: customName,
      catalogType: 'custom',
      quantity: 1,
      unitPrice: parseFloat(customPrice),
    }]);
    setCustomName('');
    setCustomPrice('');
  };

  const updateQuantity = (index, qty) => {
    if (qty < 1) return;
    const updated = [...billItems];
    updated[index].quantity = qty;
    setBillItems(updated);
  };

  const updatePrice = (index, price) => {
    const updated = [...billItems];
    updated[index].unitPrice = parseFloat(price) || 0;
    setBillItems(updated);
  };

  const removeItem = (index) => {
    setBillItems(billItems.filter((_, i) => i !== index));
  };

  const subtotal = billItems.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
  const discountAmount = discountType === 'fixed' ? discountValue : (subtotal * discountValue / 100);
  const taxable = subtotal - discountAmount;
  const taxAmount = taxable * taxPercent / 100;
  const grandTotal = taxable + taxAmount;

  const handleSave = async () => {
    if (billItems.length === 0) {
      setMessage('Please add at least one item.');
      return;
    }
    try {
      await createBill({
        customerName,
        discountPercent: discountType === 'percent' ? discountValue : 0,
        discountFixed: discountType === 'fixed' ? discountValue : 0,
        taxPercent,
        notes,
        items: billItems,
      });
      setMessage('Bill saved successfully!');
      setBillItems([]);
      setCustomerName('Walk-in');
      setDiscountValue(0);
      setNotes('');
    } catch (error) {
      console.error('Save error:', error);
      setMessage(`Error saving bill: ${error.message}`);
    }
  };

  const handlePrint = () => window.print();

  const handlePDF = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(24);
    doc.text('INVOICE', 105, 25, { align: 'center' });
    doc.setFontSize(12);
    doc.text('New Bill', 20, 45);
    doc.text(`Customer: ${customerName}`, 20, 55);
    doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, 20, 65);
    
    // Table headers
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Item', 20, 80);
    doc.text('Qty', 90, 80);
    doc.text('Unit Price', 120, 80);
    doc.text('Total', 160, 80);
    
    // Items
    doc.setFont('helvetica', 'normal');
    let y = 88;
    billItems.forEach(item => {
      const itemText = doc.splitTextToSize(item.name, 65);
      doc.text(itemText, 20, y);
      doc.text(item.quantity.toString(), 90, y);
      doc.text(`Rs. ${item.unitPrice.toFixed(2)}`, 120, y);
      doc.text(`Rs. ${(item.quantity * item.unitPrice).toFixed(2)}`, 160, y);
      y += itemText.length * 5 || 8;
    });
    
    // Totals line
    doc.setFont('helvetica', 'bold');
    doc.text(`Subtotal: Rs. ${subtotal.toFixed(2)}`, 120, y + 10);
    let totalY = y + 8;
    if (discountAmount > 0) {
      doc.text(`Discount: -Rs. ${discountAmount.toFixed(2)}`, 120, totalY);
      totalY += 8;
    }
    doc.text(`Tax (${taxPercent}%): Rs. ${taxAmount.toFixed(2)}`, 120, totalY);
    totalY += 8;
    doc.text(`Grand Total: Rs. ${grandTotal.toFixed(2)}`, 120, totalY);
    totalY += 15;
    doc.text(`Notes: ${notes}`, 20, totalY);
    
    doc.save(`bill-${new Date().toISOString().slice(0,10)}.pdf`);
  };

  const handleCSV = () => {
    const csvContent = [
      ['Item', 'Qty', 'Price', 'Total'],
      ...billItems.map(i => [i.name, i.quantity, i.unitPrice, i.quantity * i.unitPrice]),
      ['', '', 'Subtotal', subtotal],
      ['', '', discountAmount > 0 ? 'Discount' : '', discountAmount],
      ['', '', `Tax (${taxPercent}%)`, taxAmount],
      ['', '', 'Grand Total', grandTotal]
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bill.csv';
    a.click();
  };

  return (
    <div className="bill-editor">
      {/* Left: Catalog */}
      <div className="catalog-panel">
        <h2>Catalog</h2>
        <div className="catalog-tabs">
          {CATALOG_TYPES.map(type => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={activeType === type ? 'tab active' : 'tab'}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        <div className="catalog-items">
          {catalogItems.map(item => (
            <div key={item.id} className="catalog-card" onClick={() => addItemFromCatalog(item)}>
              <span className="catalog-item-name">{item.name}</span>
              <span className="catalog-item-price">₹{item.price}</span>
            </div>
          ))}
        </div>

        {/* Custom Item */}
        <div className="custom-item-section">
          <h3>Add Custom Item</h3>
          <input
            placeholder="Item name"
            value={customName}
            onChange={e => setCustomName(e.target.value)}
          />
          <input
            placeholder="Price"
            type="number"
            value={customPrice}
            onChange={e => setCustomPrice(e.target.value)}
          />
          <button onClick={addCustomItem} className="btn-primary">Add</button>
        </div>
      </div>

      {/* Right: Bill */}
      <div className="bill-panel">
        <div className="bill-header">
          <h2>New Bill</h2>
          <input
            className="customer-input"
            value={customerName}
            onChange={e => setCustomerName(e.target.value)}
            placeholder="Customer name"
          />
        </div>

        {/* Items Table */}
        <table className="bill-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {billItems.length === 0 ? (
              <tr><td colSpan="5" className="empty-msg">No items added yet</td></tr>
            ) : (
              billItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div>{item.name}</div>
                    <small>{item.catalogType}</small>
                  </td>
                  <td>
                    <div className="qty-control">
                      <button onClick={() => updateQuantity(index, item.quantity - 1)}>−</button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={e => updateQuantity(index, parseInt(e.target.value) || 1)}
                      />
                      <button onClick={() => updateQuantity(index, item.quantity + 1)}>+</button>
                    </div>
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={e => updatePrice(index, e.target.value)}
                      className="price-input"
                    />
                  </td>
                  <td>₹{(item.quantity * item.unitPrice).toFixed(2)}</td>
                  <td>
                    <button onClick={() => removeItem(index)} className="btn-delete">✕</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Discount & Tax */}
        <div className="bill-settings">
          <div className="setting-row">
            <label>Discount</label>
            <select value={discountType} onChange={e => setDiscountType(e.target.value)}>
              <option value="percent">Percent (%)</option>
              <option value="fixed">Fixed (₹)</option>
            </select>
            <input
              type="number"
              value={discountValue}
              onChange={e => setDiscountValue(parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="setting-row">
            <label>Tax (%)</label>
            <input
              type="number"
              value={taxPercent}
              onChange={e => setTaxPercent(parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="setting-row">
            <label>Notes</label>
            <input
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Optional note"
            />
          </div>
        </div>

        {/* Totals */}
        <div className="bill-totals">
          <div className="total-row"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
          {discountAmount > 0 && <div className="total-row discount"><span>Discount</span><span>−₹{discountAmount.toFixed(2)}</span></div>}
          <div className="total-row"><span>Tax ({taxPercent}%)</span><span>₹{taxAmount.toFixed(2)}</span></div>
          <div className="total-row grand"><span>Grand Total</span><span>₹{grandTotal.toFixed(2)}</span></div>
        </div>

        {message && <p className="message">{message}</p>}

        <div className="bill-actions">
          <button onClick={handlePrint} className="btn-secondary">🖨 Print</button>
          <button onClick={handlePDF} className="btn-secondary">📄 PDF</button>
          <button onClick={handleCSV} className="btn-secondary">📊 CSV</button>
          <button onClick={handleSave} className="btn-primary">✔ Save Bill</button>
        </div>
      </div>
    </div>
  );
}

export default BillEditor;
