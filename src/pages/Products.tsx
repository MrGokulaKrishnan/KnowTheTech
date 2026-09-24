import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { ProductCategory, Product } from '@/types/product';
import { SEOHead } from '@/components/seo/SEOHead';
import { JsonLd } from '@/components/seo/JsonLd';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductSearch } from '@/components/products/ProductSearch';
import { ProductFilter } from '@/components/products/ProductFilter';
import { PageTransition } from '@/components/common/PageTransition';
import { useDebounce } from '@/hooks/useDebounce';

export const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as ProductCategory | null;
  const initialCategory: ProductCategory = categoryParam && CATEGORIES.includes(categoryParam) ? categoryParam : 'All';

  const [activeCategory, setActiveCategory] = useState<ProductCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedQuery = useDebounce(searchQuery, 200);

  // Sync category changes with URL search params
  const handleSelectCategory = (category: ProductCategory) => {
    setActiveCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams, { replace: true });
  };

  // Compute product counts for each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: PRODUCTS.length,
    };

    CATEGORIES.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = PRODUCTS.filter((p) => p.categories.includes(cat)).length;
      }
    });

    return counts;
  }, []);

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product: Product) => {
      // Category filter
      const matchesCategory =
        activeCategory === 'All' || product.categories.includes(activeCategory);

      if (!matchesCategory) return false;

      // Search query filter (checks name, description, category, technologies, highlights)
      if (!debouncedQuery.trim()) return true;

      const q = debouncedQuery.toLowerCase().trim();
      const numberMatch = product.number.includes(q);
      const nameMatch = product.name.toLowerCase().includes(q);
      const taglineMatch = product.tagline.toLowerCase().includes(q);
      const descMatch = product.description.toLowerCase().includes(q);
      const catMatch = product.category.toLowerCase().includes(q);
      const techMatch = product.technologies.some((t) => t.toLowerCase().includes(q));
      const highlightMatch = product.highlights.some((h) => h.toLowerCase().includes(q));

      return numberMatch || nameMatch || taglineMatch || descMatch || catMatch || techMatch || highlightMatch;
    });
  }, [activeCategory, debouncedQuery]);

  const handleReset = () => {
    setActiveCategory('All');
    setSearchQuery('');
    setSearchParams({}, { replace: true });
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "KnowTheTech Products Catalog",
    "description": "Browse all eight focused digital tools and web applications in the KnowTheTech ecosystem.",
    "url": "https://knowthetech.web.app/products",
    "hasPart": PRODUCTS.map(p => ({
      "@type": "SoftwareApplication",
      "name": p.name,
      "url": p.url,
      "applicationCategory": p.category,
      "operatingSystem": "Any Web Browser"
    }))
  };

  return (
    <PageTransition>
      <SEOHead
        title="Products Catalog"
        description="Explore the full 8-product registry of web applications and developer tools built inside the KnowTheTech ecosystem."
        canonical="https://knowthetech.web.app/products"
      />
      <JsonLd data={collectionSchema} id="products-collection-schema" />

      <div className="pt-32 pb-24 md:pt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Explore the Ecosystem"
            title="Eight Focused Products. One Technology Ecosystem."
            description="Explore independent applications engineered to solve concrete problems across device connectivity, data migration, document utilities, career AI, markdown reading, DSA visualizers, and Java learning."
          />

          {/* Search Bar */}
          <ProductSearch
            value={searchQuery}
            onChange={setSearchQuery}
            resultCount={filteredProducts.length}
            totalCount={PRODUCTS.length}
          />

          {/* Category Filter Pills */}
          <ProductFilter
            activeCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
            categoryCounts={categoryCounts}
          />

          {/* Product Grid */}
          <ProductGrid
            products={filteredProducts}
            onReset={handleReset}
            emptyTitle={`No products found for "${searchQuery}"`}
            emptyDescription="Try searching for a different keyword such as 'Mice', 'Migrate', 'File', 'Resume', 'Job', 'MD', 'Binary', 'Java', or reset your filters."
          />
        </div>
      </div>
    </PageTransition>
  );
};
