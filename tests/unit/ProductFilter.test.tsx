import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductFilter } from '@/components/products/ProductFilter';

describe('ProductFilter Component', () => {
  it('renders category pills with counts', () => {
    const onSelect = vi.fn();
    const counts = {
      All: 8,
      'Device Connectivity': 1,
      Migration: 1,
      Documents: 2,
      Productivity: 3,
      AI: 2,
      Career: 2,
      Jobs: 1,
      'Developer Tools': 3,
      Markdown: 1,
      DSA: 1,
      'Computer Science': 1,
      'Developer Learning': 2,
      Utility: 3,
    };

    render(
      <ProductFilter
        activeCategory="All"
        onSelectCategory={onSelect}
        categoryCounts={counts}
      />
    );

    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /device connectivity/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /migration/i })).toBeInTheDocument();

    const connectivityBtn = screen.getByRole('button', { name: /device connectivity/i });
    fireEvent.click(connectivityBtn);
    expect(onSelect).toHaveBeenCalledWith('Device Connectivity');
  });
});
