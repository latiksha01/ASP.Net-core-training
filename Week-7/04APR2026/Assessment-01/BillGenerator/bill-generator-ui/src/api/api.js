const BASE_URL = 'http://localhost:5127/api';

// Bills
export async function getAllBills(status = '', from = '', to = '') {
  const params = new URLSearchParams();
  if (status) params.append('status', status);
  if (from) params.append('from', from);
  if (to) params.append('to', to);
  const res = await fetch(`${BASE_URL}/bills?${params}`);
  if (!res.ok) {
  const errorText = await res.text(); // 🔥 get real backend error
  console.error("Backend error:", errorText);
  throw new Error(errorText);
}
  return res.json();
}

export async function getBillById(id) {
  const res = await fetch(`${BASE_URL}/bills/${id}`);
  return res.json();
}

export async function createBill(data) {
  const res = await fetch(`${BASE_URL}/bills`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const text = await res.text(); // 👈 ADD THIS

  if (!res.ok) {
    console.error("REAL ERROR:", text); // 👈 VERY IMPORTANT
    throw new Error(text);
  }

  return JSON.parse(text);
}

export async function updateBill(id, data) {
  const res = await fetch(`${BASE_URL}/bills/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteBill(id) {
  await fetch(`${BASE_URL}/bills/${id}`, { method: 'DELETE' });
}

export async function getDailySummary(date) {
  const res = await fetch(`${BASE_URL}/bills/summary/daily?date=${date}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch summary: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return data;
}

// Catalogs
export async function getCatalogs(type = '') {
  const res = await fetch(`${BASE_URL}/catalogs?type=${type}`);
  return res.json();
}

export async function createCatalogItem(data) {
  const res = await fetch(`${BASE_URL}/catalogs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateCatalogItem(id, data) {
  const res = await fetch(`${BASE_URL}/catalogs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteCatalogItem(id) {
  await fetch(`${BASE_URL}/catalogs/${id}`, { method: 'DELETE' });
}