import { describe, it, expect } from 'vitest';
import { 
  PRODUCTS, 
  CATEGORIES, 
  getProducts, 
  getFeaturedProducts, 
  getProductBySlug, 
  getRelatedProducts 
} from '@/data/products';

describe('Product Registry Integrity', () => {
  it('should contain exactly 6 ecosystem products', () => {
    expect(PRODUCTS).toHaveLength(6);
  });

  it('should have unique IDs and Slugs for each product', () => {
    const ids = PRODUCTS.map(p => p.id);
    const slugs = PRODUCTS.map(p => p.slug);
    expect(new Set(ids).size).toBe(PRODUCTS.length);
    expect(new Set(slugs).size).toBe(PRODUCTS.length);
  });

  it('should contain all 6 required products by slug', () => {
    const slugs = PRODUCTS.map(p => p.slug);
    expect(slugs).toContain('knowheretech');
    expect(slugs).toContain('knowthebinary');
    expect(slugs).toContain('knowthefile');
    expect(slugs).toContain('knowyourresume');
    expect(slugs).toContain('knowyourjob');
    expect(slugs).toContain('knowthemd');
  });

  it('should have valid live URLs for every product', () => {
    PRODUCTS.forEach(product => {
      expect(product.url).toMatch(/^https:\/\/[a-zA-Z0-9-]+\.(netlify\.app|web\.app)\/?$/);
      expect(product.status).toBe('Live');
    });
  });

  it('should provide full technical specifications for every product', () => {
    PRODUCTS.forEach(p => {
      expect(p.name.trim().length).toBeGreaterThan(3);
      expect(p.tagline.trim().length).toBeGreaterThan(5);
      expect(p.description.trim().length).toBeGreaterThan(20);
      expect(p.problem.trim().length).toBeGreaterThan(20);
      expect(p.solution.trim().length).toBeGreaterThan(20);
      expect(p.features.length).toBeGreaterThanOrEqual(3);
      expect(p.technologies.length).toBeGreaterThanOrEqual(3);
      expect(p.architecture.length).toBeGreaterThanOrEqual(2);
      expect(p.seo.title).toContain('KnowTheTech');
      expect(p.seo.keywords.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('should retrieve a product by slug case-insensitively', () => {
    const binary = getProductBySlug('knowthebinary');
    expect(binary).toBeDefined();
    expect(binary?.name).toBe('KnowTheBinary');

    const upper = getProductBySlug('KNOWTHEBINARY');
    expect(upper).toBeDefined();
    expect(upper?.slug).toBe('knowthebinary');

    const invalid = getProductBySlug('nonexistent-app');
    expect(invalid).toBeUndefined();
  });

  it('should return featured products sorted by displayOrder', () => {
    const featured = getFeaturedProducts();
    expect(featured.length).toBeGreaterThan(0);
    for (let i = 0; i < featured.length - 1; i++) {
      expect(featured[i].displayOrder).toBeLessThanOrEqual(featured[i + 1].displayOrder);
    }
  });

  it('should return related products excluding the current product', () => {
    const related = getRelatedProducts('knowthebinary', 3);
    expect(related).toHaveLength(3);
    expect(related.some(r => r.slug === 'knowthebinary')).toBe(false);
  });
});
