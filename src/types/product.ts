export type ProductStatus = "Live" | "Beta" | "Development";

export type ProductCategory = 
  | "All"
  | "Education" 
  | "Developer Tools" 
  | "Career" 
  | "AI" 
  | "Productivity" 
  | "Documents";

export interface ProductSEO {
  title: string;
  description: string;
  keywords: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  categories: ProductCategory[]; // Multi-category mapping for flexible filtering
  description: string;
  url: string;
  status: ProductStatus;
  technologies: string[];
  features: string[];
  highlights: string[];
  icon: string; // Lucide icon name or visual token identifier
  featured?: boolean;
  displayOrder: number;
  problem: string;
  solution: string;
  architecture: string[];
  seo: ProductSEO;
}

export type CategoryFilter = 
  | "All" 
  | "Education" 
  | "Developer Tools" 
  | "Career" 
  | "AI" 
  | "Productivity" 
  | "Documents";
