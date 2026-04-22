import { TestBed } from '@angular/core/testing';
import { ProductService, Product } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 12 products', () => {
    const products = service.getProducts();
    expect(products.length).toBe(12);
  });

  it('should return products with correct structure', () => {
    const products = service.getProducts();
    const validProduct: Product = {
      id: expect.any(Number),
      name: expect.any(String),
      category: expect.any(String),
      price: expect.any(Number),
      stock: expect.any(Number)
    };
    products.forEach(product => {
      expect(product).toMatchObject(validProduct);
    });
  });

  it('should have unique product IDs', () => {
    const products = service.getProducts();
    const ids = products.map(p => p.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });

  it('should have multiple categories', () => {
    const products = service.getProducts();
    const categories = [...new Set(products.map(p => p.category))];
    expect(categories.length).toBe(4); // Electronics, Sports, Furniture, Books
  });

  it('should include out-of-stock products', () => {
    const products = service.getProducts();
    const outOfStock = products.filter(p => p.stock === 0);
    expect(outOfStock.length).toBe(4);
  });
});

