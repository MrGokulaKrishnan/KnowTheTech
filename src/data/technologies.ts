export interface TechnologyItem {
  name: string;
  category: "Frontend" | "UI & Animation" | "Platform & Web APIs" | "Developer Tools";
  description: string;
}

export const TECHNOLOGIES: TechnologyItem[] = [
  // Frontend
  { name: "React 19", category: "Frontend", description: "Declarative, component-driven UI architecture" },
  { name: "TypeScript", category: "Frontend", description: "Strict static typing and runtime predictability" },
  { name: "Vite", category: "Frontend", description: "High-performance next-generation frontend tooling" },
  { name: "Tailwind CSS", category: "Frontend", description: "Utility-first CSS framework with design tokens" },

  // UI & Animation
  { name: "Framer Motion", category: "UI & Animation", description: "Fluid spring physics and liquid glass micro-interactions" },
  { name: "Lucide React", category: "UI & Animation", description: "Clean, consistent, accessible SVG icon system" },
  { name: "Liquid Glass System", category: "UI & Animation", description: "Custom translucent blur, refractive borders, and glossy depth" },

  // Platform & Web APIs
  { name: "Web APIs & Workers", category: "Platform & Web APIs", description: "Client-side non-blocking processing for local computation" },
  { name: "Single Page Routing", category: "Platform & Web APIs", description: "Fast client-side routing with seamless page transitions" },
  { name: "Browser Storage & Cache", category: "Platform & Web APIs", description: "Privacy-first local persistence with zero cloud leakage" },

  // Developer Tools
  { name: "Git & GitHub", category: "Developer Tools", description: "Distributed version control and open source collaboration" },
  { name: "Postman", category: "Developer Tools", description: "API design, contract testing, and endpoint verification" },
  { name: "VS Code & Antigravity", category: "Developer Tools", description: "Precision engineering environment and agentic coding workflows" },
];
