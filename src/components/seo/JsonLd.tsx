import React, { useEffect } from 'react';

interface JsonLdProps {
  data: Record<string, unknown>;
  id?: string;
}

export const JsonLd: React.FC<JsonLdProps> = ({ data, id = 'json-ld' }) => {
  useEffect(() => {
    const existing = document.getElementById(id);
    if (existing) {
      existing.remove();
    }

    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, [data, id]);

  return null;
};
