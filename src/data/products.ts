import { Product, ProductCategory } from '../types/product';

export const PRODUCTS: Product[] = [
  {
    id: "know-the-mice",
    number: "01",
    slug: "knowthemice",
    name: "KnowTheMice",
    tagline: "Device Connectivity & Hardware Utility Product",
    category: "Device Connectivity / Utility",
    categories: ["Device Connectivity", "Utility"],
    description: "A browser-based device connectivity and input utility platform engineered for testing, inspecting, and diagnosing mouse hardware performance, polling rates, and click responses.",
    url: "https://knowthemice.web.app/",
    status: "LIVE",
    technologies: ["React", "TypeScript", "Web APIs", "Canvas API", "Tailwind CSS"],
    features: [
      "Real-time mouse event inspector and click response timing",
      "Polling rate measurement & latency diagnostic tools",
      "Scroll wheel precision and multi-button input tester",
      "Interactive click map and precision tracking playground",
      "100% private client-side execution with zero driver installation"
    ],
    highlights: [
      "Hardware testing directly inside the browser using modern Pointer & Event APIs",
      "Zero latency overhead with non-blocking event listening",
      "Designed for hardware enthusiasts, gamers, and web developers testing input behavior"
    ],
    icon: "Mouse",
    featured: true,
    displayOrder: 1,
    problem: "Testing hardware input latency, button double-clicks, or mouse polling rates usually requires installing questionable third-party software or navigating ad-heavy legacy websites.",
    solution: "KnowTheMice provides a clean, instant, client-first hardware diagnostic environment running entirely in the browser with high-frequency Event Listener precision.",
    architecture: [
      "High-frequency requestAnimationFrame event sampling loop",
      "Browser Pointer Event API integration for multi-button detection",
      "Client-side Canvas rendering for real-time latency graphs"
    ],
    accentColor: "from-[#0284C7] to-[#06B6D4]",
    relatedProducts: ["knowtomigrate", "knowthefile"],
    seo: {
      title: "KnowTheMice — Device Connectivity & Mouse Utility | KnowTheTech",
      description: "Diagnose mouse polling rates, input latency, and click responsiveness with KnowTheMice, part of the KnowTheTech ecosystem.",
      keywords: ["Mouse tester", "Device connectivity", "Polling rate tester", "Hardware utility", "KnowTheTech", "Input diagnostics"]
    }
  },
  {
    id: "know-to-migrate",
    number: "02",
    slug: "knowtomigrate",
    name: "KnowToMigrate",
    tagline: "Data & Schema Migration Utility Platform",
    category: "Migration / Utility",
    categories: ["Migration", "Utility", "Developer Tools"],
    description: "A migration-focused utility platform designed to streamline schema transformation, data formatting, and file format migration workflows with high reliability.",
    url: "https://knowtomigrate.web.app/",
    status: "LIVE",
    technologies: ["React", "TypeScript", "JSON / Schema Parser", "Client-Side Processing", "Tailwind CSS"],
    features: [
      "Automated schema mapping and field transformation preview",
      "Structured data migration utilities for JSON, CSV, and XML formats",
      "Validation engine detecting breaking schema changes and missing keys",
      "Exportable migration scripts and structural diff viewer",
      "Instant client-side transformation with zero remote data storage"
    ],
    highlights: [
      "Simplifies chaotic data migration tasks into predictable, step-by-step transformations",
      "Protects proprietary datasets by processing migrations locally in the browser",
      "Provides clear diff visualizers to audit transformed payloads before deployment"
    ],
    icon: "RefreshCw",
    featured: true,
    displayOrder: 2,
    problem: "Migrating data structures between different schema versions or data stores often leads to silent data corruption, manual script writing, or exposing sensitive payloads to online converters.",
    solution: "KnowToMigrate gives engineers a structured, private workspace to map fields, validate types, and export clean migration scripts instantly.",
    architecture: [
      "Abstract Syntax Tree (AST) & JSON parser for structural mapping",
      "Client-side validation worker preventing UI thread lockups on large files",
      "Deterministic diff calculation engine for visual schema comparison"
    ],
    accentColor: "from-[#06B6D4] to-[#38BDF8]",
    relatedProducts: ["knowthemice", "knowthemd"],
    seo: {
      title: "KnowToMigrate — Schema & Data Migration Utility | KnowTheTech",
      description: "Transform schemas and migrate data payloads securely with KnowToMigrate inside the KnowTheTech product ecosystem.",
      keywords: ["Data migration", "Schema converter", "JSON transformer", "Migration utility", "KnowTheTech", "Developer tools"]
    }
  },
  {
    id: "know-the-file",
    number: "03",
    slug: "knowthefile",
    name: "KnowTheFile",
    tagline: "Document and Resume Productivity Platform",
    category: "Documents / Productivity",
    categories: ["Documents", "Productivity", "Utility"],
    description: "A browser-based document and resume utility platform containing multiple tools for working with resumes, PDFs, documents, and career-related files.",
    url: "https://knowthefile.web.app/",
    status: "LIVE",
    technologies: ["React", "TypeScript", "PDF.js / Web APIs", "Client-Side Processing", "Tailwind CSS"],
    features: [
      "100% private client-side file inspection and manipulation",
      "Resume text extraction, parsing, and formatting verification",
      "Document conversion utilities and fast previewer",
      "PDF metadata inspector and page reorganization tools",
      "Instant processing with zero server-side file uploads required"
    ],
    highlights: [
      "Absolute privacy: all processing takes place locally inside the user's browser",
      "Zero wait time: no uploads to remote queues or external servers",
      "Tailored utilities specifically engineered for career and resume file formatting"
    ],
    icon: "FileText",
    featured: true,
    displayOrder: 3,
    problem: "Most online document and PDF tools require uploading sensitive resumes and confidential documents to unknown cloud servers, risking privacy leaks and slow queue times.",
    solution: "KnowTheFile runs entirely inside the user's browser using modern Web APIs and WebAssembly, providing instant document utilities with total privacy.",
    architecture: [
      "Client-side processing engine keeping sensitive documents safely local",
      "Web Worker architecture for non-blocking intensive file operations",
      "Lightweight responsive interface designed for fast file drag-and-drop"
    ],
    accentColor: "from-[#0284C7] to-[#8B5CF6]",
    relatedProducts: ["knowyourresume", "knowthemice"],
    seo: {
      title: "KnowTheFile — Document & Resume Productivity Platform | KnowTheTech",
      description: "Browser-based document and resume utility tools with private client-side processing, part of KnowTheTech.",
      keywords: ["Resume tools", "PDF utilities", "Document productivity", "Private file processing", "KnowTheTech", "Browser tools"]
    }
  },
  {
    id: "know-your-resume",
    number: "04",
    slug: "knowyourresume",
    name: "KnowYourResume",
    tagline: "Resume Intelligence Platform",
    category: "AI / Career",
    categories: ["AI", "Career", "Documents"],
    description: "A modern workspace for resume analysis, optimization, career insights, and resume intelligence.",
    url: "https://knowyourresume.web.app/",
    status: "LIVE",
    technologies: ["React", "TypeScript", "NLP / AI Analysis", "Career Heuristics", "Tailwind CSS"],
    features: [
      "Intelligent resume scoring across clarity, impact, and ATS compatibility",
      "Action verb analyzer and quantifiable accomplishment highlighter",
      "Keyword gap analysis comparing resumes against industry job patterns",
      "Structure and layout evaluation for readability and impact",
      "Actionable recommendations with step-by-step suggestions"
    ],
    highlights: [
      "Action-oriented feedback rather than generic keyword stuffing",
      "Precision heuristics tuned for modern software and engineering roles",
      "Fast, privacy-conscious workflow designed for iterative resume tuning"
    ],
    icon: "Sparkles",
    featured: true,
    displayOrder: 4,
    problem: "Job seekers frequently struggle to identify why their resumes fail automated screenings or fail to impress hiring managers, receiving zero constructive feedback.",
    solution: "KnowYourResume provides deep resume intelligence, analyzing structure, phrasing, impact metrics, and clarity to give candidates transparent, actionable improvements.",
    architecture: [
      "Intelligent lexical and structural parser for resume text patterns",
      "Client-side scoring model providing immediate visual score breakdowns",
      "Exportable improvement checklist for systematic application readiness"
    ],
    accentColor: "from-[#0284C7] to-[#8B5CF6]",
    relatedProducts: ["knowyourjob", "knowthefile"],
    seo: {
      title: "KnowYourResume — Resume Intelligence Platform | KnowTheTech",
      description: "Optimize your resume with intelligent scoring and career insights on KnowYourResume, built within the KnowTheTech ecosystem.",
      keywords: ["Resume intelligence", "ATS scanner", "Resume optimization", "Career tech", "AI resume analysis", "KnowTheTech"]
    }
  },
  {
    id: "know-your-job",
    number: "05",
    slug: "knowyourjob",
    name: "KnowYourJob",
    tagline: "AI-Powered Job Discovery and Career Platform",
    category: "AI / Jobs",
    categories: ["AI", "Jobs", "Career", "Productivity"],
    description: "A career discovery platform designed to help users discover relevant opportunities, analyze jobs, improve applications, and manage their job-search workflow.",
    url: "https://knowyourjob.web.app/",
    status: "LIVE",
    technologies: ["React", "TypeScript", "AI Job Matching", "Search Filtering", "Tailwind CSS"],
    features: [
      "Opportunity discovery engine with multi-criteria skill matching",
      "Job description requirement extraction and role breakdown",
      "Application tracking dashboard with stage management",
      "Preparation checklists tailored to specific role requirements",
      "Career trajectory insights and skill demand analysis"
    ],
    highlights: [
      "Streamlines the chaotic process of job seeking into a structured pipeline",
      "Helps engineers match their exact stack with relevant openings",
      "Focuses on quality fit rather than overwhelming application spray"
    ],
    icon: "Briefcase",
    featured: true,
    displayOrder: 5,
    problem: "Modern job hunting is fragmented across multiple job boards, spam postings, and disorganized spreadsheets, leading to high burnout and low conversion rates.",
    solution: "KnowYourJob combines job discovery, requirement dissection, and application pipeline management into a coherent, developer-friendly interface.",
    architecture: [
      "Structured opportunity aggregation and filtering pipeline",
      "Local storage-backed personal job tracker keeping personal records secure",
      "Responsive card and table views for flexible workflow management"
    ],
    accentColor: "from-[#06B6D4] to-[#0284C7]",
    relatedProducts: ["knowyourresume", "knowthefile"],
    seo: {
      title: "KnowYourJob — AI-Powered Job Discovery & Career Platform | KnowTheTech",
      description: "Discover opportunities, analyze role requirements, and manage your career pipeline with KnowYourJob in the KnowTheTech ecosystem.",
      keywords: ["Job discovery", "Career platform", "Job tracker", "AI career tools", "Tech jobs", "KnowTheTech"]
    }
  },
  {
    id: "know-the-md",
    number: "06",
    slug: "knowthemd",
    name: "KnowTheMD",
    tagline: "Markdown Reader and Productivity Application",
    category: "Developer Tools / Markdown",
    categories: ["Developer Tools", "Markdown", "Productivity", "Documents"],
    description: "A modern Markdown-focused application for reading, viewing, and working with .md content.",
    url: "https://knowthemd.web.app/",
    status: "LIVE",
    technologies: ["React", "TypeScript", "Markdown Parser", "Syntax Highlighting", "Tailwind CSS"],
    features: [
      "Instant high-fidelity Markdown parsing with GitHub Flavored Markdown (GFM)",
      "Built-in code syntax highlighting across dozens of languages",
      "Distraction-free reading mode with customizable typography",
      "Document outline / table of contents generation with active scroll sync",
      "Drag-and-drop .md file viewer with zero cloud transmission"
    ],
    highlights: [
      "Lightning fast loading for developer documentation, READMEs, and technical specs",
      "Beautiful typography tuned for extended reading comfort",
      "Full offline support and zero external data tracking"
    ],
    icon: "BookOpen",
    featured: true,
    displayOrder: 6,
    problem: "Reading raw Markdown files or technical specifications often suffers from poor formatting, slow IDE previews, or heavyweight browser extensions.",
    solution: "KnowTheMD gives developers and writers a dedicated, beautiful workspace to read, inspect, and enjoy Markdown documentation with elegant typography and fast rendering.",
    architecture: [
      "Streamlined parsing pipeline with AST generation for outline navigation",
      "Optimized DOM rendering with lazy syntax highlighting",
      "Clean dark/liquid-glass inspired reading theme"
    ],
    accentColor: "from-[#38BDF8] to-[#06B6D4]",
    relatedProducts: ["knowhere-tech", "knowtomigrate"],
    seo: {
      title: "KnowTheMD — Markdown Reader & Productivity Tool | KnowTheTech",
      description: "A modern, distraction-free Markdown reader and viewer for technical documentation, built within KnowTheTech.",
      keywords: ["Markdown reader", "MD viewer", "Developer tools", "Documentation viewer", "KnowTheTech", "Productivity"]
    }
  },
  {
    id: "know-the-binary",
    number: "07",
    slug: "knowthebinary",
    name: "KnowTheBinary",
    tagline: "Interactive Computer Science and DSA Learning Platform",
    category: "DSA / Computer Science",
    categories: ["DSA", "Computer Science", "Developer Learning"],
    description: "An interactive learning environment for understanding Data Structures, Algorithms, Computer Science concepts, and programming fundamentals through visual and interactive experiences.",
    url: "https://knowthebinary.web.app/",
    status: "LIVE",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Canvas / SVG Visualization", "DSA Algorithms"],
    features: [
      "Visual step-by-step algorithm execution and timeline stepping",
      "Data structure interactive visualizers (Trees, Graphs, Arrays, Heaps)",
      "Time and space complexity interactive visual breakdowns",
      "Binary arithmetic and bitwise manipulation interactive playground",
      "Algorithm comparison engine across best, average, and worst cases"
    ],
    highlights: [
      "Visual algorithm stepping lets users witness state changes in real time",
      "Empirical approach to big-O notations with tangible visual graphs",
      "Direct browser-based execution without complicated environment setup"
    ],
    icon: "Binary",
    featured: true,
    displayOrder: 7,
    problem: "Data structures and algorithms often seem abstract and daunting when studied purely through static textbooks or dry mathematical explanations.",
    solution: "KnowTheBinary turns abstract algorithms into intuitive visual experiences with interactive controls, real-time memory simulations, and step-by-step state animations.",
    architecture: [
      "Real-time state visualization engine with deterministic step replay",
      "Optimized rendering pipeline for fluid animation at 60fps",
      "Pure client-side execution guaranteeing privacy and instant response"
    ],
    accentColor: "from-[#0284C7] to-[#38BDF8]",
    relatedProducts: ["knowhere-tech", "knowthemd"],
    seo: {
      title: "KnowTheBinary — Interactive DSA & Computer Science Platform | KnowTheTech",
      description: "Learn Data Structures, Algorithms, and Computer Science concepts visually with KnowTheBinary in the KnowTheTech ecosystem.",
      keywords: ["DSA", "Data Structures", "Algorithms", "Visualizer", "Computer Science", "KnowTheTech", "Interactive Learning"]
    }
  },
  {
    id: "knowhere-tech",
    number: "08",
    slug: "knowhere-tech",
    name: "Knowhere Tech",
    tagline: "Java Full Stack Learning Platform",
    category: "Developer Learning",
    categories: ["Developer Learning", "Developer Tools"],
    description: "A learning platform focused on Java, backend development, full-stack development, programming concepts, and developer education.",
    url: "https://knowheretech.netlify.app/",
    status: "LIVE",
    technologies: ["React", "JavaScript", "CSS3", "HTML5", "Full Stack Concepts"],
    features: [
      "Structured Java curriculum covering Core Java through Enterprise patterns",
      "Backend architectural fundamentals and REST API design walk-throughs",
      "Interactive code snippets and clean explanation breakdown",
      "Hands-on full-stack guidance bridging frontend and backend layers",
      "Modern engineering roadmaps and resource references"
    ],
    highlights: [
      "Designed specifically for developers seeking rigorous Java engineering depth",
      "Clear visual diagrams of JVM memory models and Spring workflows",
      "Zero fluff curriculum focusing on production engineering practices"
    ],
    icon: "GraduationCap",
    featured: true,
    displayOrder: 8,
    problem: "Learning modern enterprise Java and full-stack development is often fragmented across outdated tutorials, disparate documentation, and overly complex boilerplate.",
    solution: "Knowhere Tech organizes modern Java and backend engineering into an intuitive, accessible web platform with clear concepts, structured pathways, and actionable practical examples.",
    architecture: [
      "Lightweight Single Page Application frontend architecture for rapid page loads",
      "Component-driven learning modules with semantic structure",
      "Responsive layout optimized for code reading on mobile and desktop"
    ],
    accentColor: "from-[#0284C7] to-[#06B6D4]",
    relatedProducts: ["knowthebinary", "knowthemd"],
    seo: {
      title: "Knowhere Tech — Java Full Stack Learning Platform | KnowTheTech",
      description: "Explore Java, backend development, and full-stack engineering concepts on Knowhere Tech, part of the KnowTheTech product ecosystem.",
      keywords: ["Java learning", "Full stack development", "Backend engineering", "Programming concepts", "KnowTheTech", "Developer education"]
    }
  }
];

export const CATEGORIES: ProductCategory[] = [
  "All",
  "Device Connectivity",
  "Migration",
  "Documents",
  "Productivity",
  "AI",
  "Career",
  "Jobs",
  "Developer Tools",
  "Markdown",
  "DSA",
  "Computer Science",
  "Developer Learning",
  "Utility"
];

export function getProducts(): Product[] {
  return [...PRODUCTS].sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter(p => p.featured).sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getProductBySlug(slug: string): Product | undefined {
  const normalized = slug.toLowerCase().replace(/-/g, '');
  return PRODUCTS.find(p => p.slug.toLowerCase().replace(/-/g, '') === normalized);
}

export function getPrevAndNextProducts(currentSlug: string): { prev?: Product; next?: Product } {
  const sorted = getProducts();
  const index = sorted.findIndex(p => p.slug.toLowerCase().replace(/-/g, '') === currentSlug.toLowerCase().replace(/-/g, ''));
  if (index === -1) return {};

  const prev = sorted[(index - 1 + sorted.length) % sorted.length];
  const next = sorted[(index + 1) % sorted.length];

  return { prev, next };
}

export function getRelatedProducts(currentSlug: string, limit = 3): Product[] {
  const current = getProductBySlug(currentSlug);
  if (!current) return PRODUCTS.slice(0, limit);

  if (current.relatedProducts && current.relatedProducts.length > 0) {
    const explicitRelated = current.relatedProducts
      .map(s => getProductBySlug(s))
      .filter((p): p is Product => p !== undefined);
    
    if (explicitRelated.length >= limit) return explicitRelated.slice(0, limit);
  }

  return PRODUCTS
    .filter(p => p.slug !== current.slug)
    .sort((a, b) => {
      const aOverlap = a.categories.filter(c => current.categories.includes(c)).length;
      const bOverlap = b.categories.filter(c => current.categories.includes(c)).length;
      return bOverlap - aOverlap;
    })
    .slice(0, limit);
}
