export type ProductStatus = "LIVE" | "BETA" | "DEVELOPMENT";

export type ProductCategory = 
  | "All"
  | "Device Connectivity"
  | "Migration"
  | "Documents" 
  | "Productivity" 
  | "AI" 
  | "Career" 
  | "Jobs" 
  | "Developer Tools" 
  | "Markdown" 
  | "DSA" 
  | "Computer Science" 
  | "Developer Learning"
  | "Utility";

export interface ProductSEO {
  title: string;
  description: string;
  keywords: string[];
}

export interface Product {
  id: string;
  number: string; // "01" | "02" | ... | "08"
  slug: string;
  name: string;
  tagline: string;
  category: string;
  categories: ProductCategory[];
  description: string;
  url: string;
  status: ProductStatus;
  technologies: string[];
  features: string[];
  highlights: string[];
  icon: string; // Lucide icon name
  featured?: boolean;
  displayOrder: number;
  problem: string;
  solution: string;
  architecture: string[];
  accentColor?: string; // Secondary accent token
  relatedProducts?: string[]; // Slugs of related ecosystem applications
  seo: ProductSEO;
}

export type CategoryFilter = ProductCategory;
