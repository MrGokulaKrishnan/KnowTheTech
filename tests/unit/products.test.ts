import { describe, it, expect } from 'vitest';
import { 
  PRODUCTS, 
  CATEGORIES, 
  getProducts, 
  getFeaturedProducts, 
  getProductBySlug, 
  getPrevAndNextProducts,
  getRelatedProducts 
} from '@/data/products';

describe('Product Registry Integrity (8 Products)', () => {
  it('should contain exactly 8 ecosystem products in exact order', () => {
    expect(PRODUCTS).toHaveLength(8);
    expect(PRODUCTS[0].number).toBe('01');
    expect(PRODUCTS[0].name).toBe('KnowTheMice');
    expect(PRODUCTS[1].number).toBe('02');
    expect(PRODUCTS[1].name).toBe('KnowToMigrate');
    expect(PRODUCTS[2].number).toBe('03');
    expect(PRODUCTS[2].name).toBe('KnowTheFile');
    expect(PRODUCTS[3].number).toBe('04');
    expect(PRODUCTS[3].name).toBe('KnowYourResume');
    expect(PRODUCTS[4].number).toBe('05');
    expect(PRODUCTS[4].name).toBe('KnowYourJob');
    expect(PRODUCTS[5].number).toBe('06');
    expect(PRODUCTS[5].name).toBe('KnowTheMD');
    expect(PRODUCTS[6].number).toBe('07');
    expect(PRODUCTS[6].name).toBe('KnowTheBinary');
    expect(PRODUCTS[7].number).toBe('08');
    expect(PRODUCTS[7].name).toBe('Knowhere Tech');
  });

  it('should have unique IDs, Numbers, and Slugs for each product', () => {
    const ids = PRODUCTS.map(p => p.id);
    const numbers = PRODUCTS.map(p => p.number);
    const slugs = PRODUCTS.map(p => p.slug);
    expect(new Set(ids).size).toBe(8);
    expect(new Set(numbers).size).toBe(8);
    expect(new Set(slugs).size).toBe(8);
  });

  it('should have valid live URLs for every product', () => {
    PRODUCTS.forEach(product => {
      expect(product.url).toMatch(/^https:\/\/[a-zA-Z0-9-]+\.(netlify\.app|web\.app)\/?$/);
      expect(product.status).toBe('LIVE');
    });
  });

  it('should calculate previous and next product in cyclical sequence', () => {
    const miceNav = getPrevAndNextProducts('knowthemice');
    expect(miceNav.prev?.slug).toBe('knowhere-tech');
    expect(miceNav.next?.slug).toBe('knowtomigrate');

    const migrateNav = getPrevAndNextProducts('knowtomigrate');
    expect(migrateNav.prev?.slug).toBe('knowthemice');
    expect(migrateNav.next?.slug).toBe('knowthefile');
  });

  it('should retrieve products case-insensitively by slug', () => {
    const mice = getProductBySlug('KNOWTHEMICE');
    expect(mice).toBeDefined();
    expect(mice?.name).toBe('KnowTheMice');

    const migrate = getProductBySlug('knowtomigrate');
    expect(migrate).toBeDefined();
    expect(migrate?.name).toBe('KnowToMigrate');
  });
});
