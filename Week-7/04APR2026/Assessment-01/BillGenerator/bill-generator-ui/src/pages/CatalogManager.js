import React, { useState, useEffect } from 'react';
import { getCatalogs, createCatalogItem, updateCatalogItem, deleteCatalogItem } from '../api/api';
import './CatalogManager.css';

const TYPES = ['entrance', 'donation', 'merchandise', 'food'];

function CatalogManager() {
  const [items, setItems] = useState([]);
  const [activeType, setActiveType] = useState('entrance');
  const [form, setForm] = useState({ name: '', price: '', unit: '' });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');

  const fetchItems = () => {
    getCatalogs(activeType).then(setItems).catch(console.error);
  };

  useEffect(() => { fetchItems(); }, [activeType]);

  const handleSubmit = async () => {
    if (!form.name || !form.price) return;
    const data = { name: form.name, catalogType: activeType, price: parseFloat(form.price), unit: form.unit };
    if (editId) {
      await updateCatalogItem(editId, data);
      setMessage('Item updated!');
    } else {
      await createCatalogItem(data);
      setMessage('Item added!');
    }
    setForm({ name: '', price: '', unit: '' });
    setEditId(null);
    fetchItems();
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({ name: item.name, price: item.price, unit: item.unit });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this item?')) {
      await deleteCatalogItem(id);
      fetchItems();
    }
  };

  return (
    <div className="catalog-manager">
      <h2>Catalog Manager</h2>

      <div className="catalog-tabs">
        {TYPES.map(type => (
          <button key={type} onClick={() => setActiveType(type)}
            className={activeType === type ? 'tab active' : 'tab'}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Form */}
      <div className="catalog-form">
        <input placeholder="Item name" value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Price" type="number" value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })} />
        <input placeholder="Unit (e.g. per person)" value={form.unit}
          onChange={e => setForm({ ...form, unit: e.target.value })} />
        <button onClick={handleSubmit} className="btn-primary">
          {editId ? 'Update' : 'Add Item'}
        </button>
        {editId && (
          <button onClick={() => { setEditId(null); setForm({ name: '', price: '', unit: '' }); }}
            className="btn-secondary">Cancel</button>
        )}
      </div>

      {message && <p className="message">{message}</p>}

      {/* Items List */}
      <table className="catalog-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Unit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr><td colSpan="4" className="empty-msg">No items in this catalog</td></tr>
          ) : (
            items.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>₹{item.price}</td>
                <td>{item.unit}</td>
                <td>
                  <button onClick={() => handleEdit(item)} className="btn-edit">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CatalogManager;