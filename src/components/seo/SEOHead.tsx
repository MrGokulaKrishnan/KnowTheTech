import React, { useEffect } from 'react';
import { SEOProps } from '@/types/seo';
import { SITE_CONFIG } from '@/data/site';

export const SEOHead: React.FC<SEOProps> = ({
  title,
  description = SITE_CONFIG.description,
  canonical,
  ogImage = '/brand/logo.png',
  ogType = 'website',
  keywords = ['KnowTheTech', 'technology ecosystem', 'developer tools', 'learning platform', 'Gokulakrishnan K'],
  noIndex = false,
}) => {
  const fullTitle = title 
    ? `${title} | ${SITE_CONFIG.name}` 
    : `${SITE_CONFIG.name} — ${SITE_CONFIG.concept}`;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : SITE_CONFIG.url;
  const canonicalUrl = canonical || currentUrl;

  useEffect(() => {
    // Document Title
    document.title = fullTitle;

    // Helper to update or set meta
    const setMeta = (attr: string, value: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${value}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, value);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords.join(', '));
    setMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    // Open Graph
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', ogImage.startsWith('http') ? ogImage : `${window.location.origin}${ogImage}`);

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage.startsWith('http') ? ogImage : `${window.location.origin}${ogImage}`);

    // Canonical link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);
  }, [fullTitle, description, canonicalUrl, ogImage, ogType, keywords, noIndex]);

  return null;
};
