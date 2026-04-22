import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from './product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="app-shell">
      <header class="site-header">
        <div class="header-inner">
          <div class="brand">
            <span class="brand-icon">&#9672;</span>
            <span class="brand-name">INVENTRA</span>
          </div>
          <div class="header-meta">Product Management Console</div>
        </div>
      </header>

      <main class="main-content">
        <div class="page-title-area">
          <h1 class="page-title">Product Inventory</h1>
          <div class="product-count">
            <span class="count-num">{{ filteredProducts.length }}</span>
            <span class="count-label">of {{ allProducts.length }} items</span>
          </div>
        </div>

        <div class="controls-bar">
          <div class="control-group">
            <label class="control-label" for="category-select">Category</label>
            <div class="select-wrapper">
              <select id="category-select" class="styled-select" [(ngModel)]="selectedCategory">
                <option value="">All Categories</option>
                <option *ngFor="let cat of categories" [value]="cat">{{ cat }}</option>
              </select>
              <span class="select-arrow">&#9662;</span>
            </div>
            <button class="btn-filter" (click)="applyFilter()">Filter</button>
          </div>

          <div class="control-group">
            <label class="toggle-label">
              <div class="toggle-track" [class.active]="showInStockOnly">
                <input type="checkbox" class="toggle-input" [(ngModel)]="showInStockOnly" (change)="applyFilter()" />
                <div class="toggle-thumb"></div>
              </div>
              <span class="toggle-text">Show In-Stock Only</span>
            </label>
          </div>
        </div>

        <div class="table-container">
          <table class="product-table">
            <thead>
              <tr>
                <th class="col-id">ID</th>
                <th class="col-name">Product Name</th>
                <th class="col-category">Category</th>
                <th class="col-price sortable" [class.sorted]="isSorted" (click)="sortByPrice()">
                  <span>Price ($)</span>
                  <span class="sort-icon" [class.active]="isSorted">&#8593;</span>
                </th>
                <th class="col-stock">Stock</th>
                <th class="col-status">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let product of filteredProducts" class="product-row" [class.out-of-stock]="product.stock === 0">
                <td class="col-id"><span class="id-badge">#{{ product.id }}</span></td>
                <td class="col-name"><span class="product-name">{{ product.name }}</span></td>
                <td class="col-category"><span class="category-tag">{{ product.category }}</span></td>
                <td class="col-price"><span class="price-value">\${{ product.price | number:'1.2-2' }}</span></td>
                <td class="col-stock"><span class="stock-num" [class.zero]="product.stock === 0">{{ product.stock }}</span></td>
                <td class="col-status">
                  <span class="status-pill" [class.in-stock]="product.stock > 0" [class.out]="product.stock === 0">
                    {{ product.stock > 0 ? 'In Stock' : 'Out of Stock' }}
                  </span>
                </td>
              </tr>
              <tr *ngIf="filteredProducts.length === 0" class="empty-row">
                <td colspan="6">
                  <div class="empty-state">
                    <span class="empty-icon">&#9711;</span>
                    <span>No products match your filters</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :host {
      --bg: #0a0c10; --surface: #111318; --surface2: #181b22;
      --border: #232730; --border2: #2e3340;
      --accent: #00e5c3; --accent2: #7b61ff; --danger: #ff4d6d;
      --text: #e8eaf0; --text-muted: #636b80; --text-dim: #404655;
      --mono: 'Space Mono', monospace; --sans: 'DM Sans', sans-serif;
    }
    .app-shell { min-height: 100vh; background: var(--bg); color: var(--text); font-family: var(--sans); background-image: radial-gradient(ellipse at 20% 0%, rgba(0,229,195,0.05) 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(123,97,255,0.04) 0%, transparent 50%); }
    .site-header { border-bottom: 1px solid var(--border); background: rgba(10,12,16,0.8); backdrop-filter: blur(12px); position: sticky; top: 0; z-index: 100; }
    .header-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; height: 60px; display: flex; align-items: center; justify-content: space-between; }
    .brand { display: flex; align-items: center; gap: 10px; }
    .brand-icon { color: var(--accent); font-size: 1.3rem; }
    .brand-name { font-family: var(--mono); font-size: 1rem; font-weight: 700; letter-spacing: 0.2em; }
    .header-meta { font-size: 0.75rem; color: var(--text-muted); letter-spacing: 0.05em; }
    .main-content { max-width: 1200px; margin: 0 auto; padding: 2.5rem 2rem 4rem; }
    .page-title-area { display: flex; align-items: baseline; gap: 1.5rem; margin-bottom: 2rem; }
    .page-title { font-family: var(--mono); font-size: 1.6rem; font-weight: 700; }
    .product-count { display: flex; align-items: baseline; gap: 6px; }
    .count-num { font-family: var(--mono); font-size: 1.3rem; color: var(--accent); font-weight: 700; }
    .count-label { font-size: 0.8rem; color: var(--text-muted); }
    .controls-bar { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; padding: 1.2rem 1.5rem; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; margin-bottom: 1.5rem; }
    .control-group { display: flex; align-items: center; gap: 12px; }
    .control-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); font-weight: 500; }
    .select-wrapper { position: relative; }
    .styled-select { appearance: none; background: var(--surface2); border: 1px solid var(--border2); color: var(--text); padding: 8px 36px 8px 14px; border-radius: 6px; font-family: var(--sans); font-size: 0.875rem; cursor: pointer; outline: none; transition: border-color 0.2s; min-width: 180px; }
    .styled-select:focus { border-color: var(--accent); }
    .styled-select option { background: var(--surface2); }
    .select-arrow { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted); pointer-events: none; font-size: 0.75rem; }
    .btn-filter { background: var(--accent); color: #0a0c10; border: none; padding: 8px 22px; border-radius: 6px; font-family: var(--sans); font-size: 0.875rem; font-weight: 600; cursor: pointer; letter-spacing: 0.03em; transition: opacity 0.15s, transform 0.15s; }
    .btn-filter:hover { opacity: 0.85; transform: translateY(-1px); }
    .toggle-label { display: flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; }
    .toggle-track { position: relative; width: 44px; height: 24px; background: var(--surface2); border: 1px solid var(--border2); border-radius: 12px; transition: background 0.2s, border-color 0.2s; }
    .toggle-track.active { background: rgba(0,229,195,0.15); border-color: var(--accent); }
    .toggle-input { position: absolute; opacity: 0; width: 0; height: 0; }
    .toggle-thumb { position: absolute; top: 3px; left: 3px; width: 16px; height: 16px; background: var(--text-muted); border-radius: 50%; transition: transform 0.2s, background 0.2s; }
    .toggle-track.active .toggle-thumb { transform: translateX(20px); background: var(--accent); }
    .toggle-text { font-size: 0.875rem; color: var(--text); }
    .table-container { border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
    .product-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
    thead tr { background: var(--surface); border-bottom: 1px solid var(--border2); }
    th { padding: 14px 16px; text-align: left; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); font-weight: 600; white-space: nowrap; }
    th.sortable { cursor: pointer; transition: color 0.15s; }
    th.sortable:hover { color: var(--accent); }
    th.sorted { color: var(--accent); }
    .sort-icon { margin-left: 6px; opacity: 0.3; transition: opacity 0.2s; font-size: 0.85rem; }
    .sort-icon.active { opacity: 1; color: var(--accent); }
    .product-row { border-bottom: 1px solid var(--border); background: var(--bg); transition: background 0.15s; }
    .product-row:last-child { border-bottom: none; }
    .product-row:hover { background: var(--surface); }
    .product-row.out-of-stock { opacity: 0.6; }
    td { padding: 14px 16px; vertical-align: middle; }
    .id-badge { font-family: var(--mono); font-size: 0.75rem; color: var(--text-dim); }
    .product-name { font-weight: 500; }
    .category-tag { display: inline-block; padding: 3px 10px; background: rgba(123,97,255,0.1); border: 1px solid rgba(123,97,255,0.2); color: #a98fff; border-radius: 4px; font-size: 0.75rem; font-weight: 500; }
    .price-value { font-family: var(--mono); font-size: 0.875rem; }
    .stock-num { font-family: var(--mono); font-size: 0.875rem; }
    .stock-num.zero { color: var(--danger); }
    .status-pill { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 500; }
    .status-pill::before { content: ''; width: 6px; height: 6px; border-radius: 50%; }
    .status-pill.in-stock { background: rgba(0,229,195,0.1); border: 1px solid rgba(0,229,195,0.2); color: var(--accent); }
    .status-pill.in-stock::before { background: var(--accent); }
    .status-pill.out { background: rgba(255,77,109,0.1); border: 1px solid rgba(255,77,109,0.2); color: var(--danger); }
    .status-pill.out::before { background: var(--danger); }
    .empty-row td { padding: 0; }
    .empty-state { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 3rem; color: var(--text-muted); font-size: 0.875rem; }
    .empty-icon { font-size: 2rem; color: var(--text-dim); }
    .col-id { width: 70px; } .col-name { min-width: 180px; } .col-category { width: 140px; } .col-price { width: 130px; } .col-stock { width: 90px; } .col-status { width: 140px; }
    @media (max-width: 768px) { .main-content { padding: 1.5rem 1rem; } .controls-bar { flex-direction: column; align-items: flex-start; } .table-container { overflow-x: auto; } .product-table { min-width: 700px; } }
  `]
})
export class AppComponent implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  showInStockOnly: boolean = false;
  isSorted: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.allProducts = this.productService.getProducts();
    this.filteredProducts = [...this.allProducts];
    this.categories = [...new Set(this.allProducts.map(p => p.category))].sort();
  }

  applyFilter(): void {
    let result = [...this.allProducts];
    if (this.selectedCategory) {
      result = result.filter(p => p.category === this.selectedCategory);
    }
    if (this.showInStockOnly) {
      result = result.filter(p => p.stock > 0);
    }
    if (this.isSorted) {
      result.sort((a, b) => a.price - b.price);
    }
    this.filteredProducts = result;
  }

  sortByPrice(): void {
    this.isSorted = !this.isSorted;
    if (this.isSorted) {
      this.filteredProducts = [...this.filteredProducts].sort((a, b) => a.price - b.price);
    } else {
      this.applyFilter();
    }
  }
}