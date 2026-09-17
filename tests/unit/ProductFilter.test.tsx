import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductFilter } from '@/components/products/ProductFilter';

describe('ProductFilter Component', () => {
  it('renders all category pills with counts', () => {
    const onSelect = vi.fn();
    const counts = {
      All: 6,
      Education: 2,
      'Developer Tools': 3,
      Career: 3,
      AI: 2,
      Productivity: 3,
      Documents: 3,
    };

    render(
      <ProductFilter
        activeCategory="All"
        onSelectCategory={onSelect}
        categoryCounts={counts}
      />
    );

    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /education/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /developer tools/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /career/i })).toBeInTheDocument();

    const educationBtn = screen.getByRole('button', { name: /education/i });
    fireEvent.click(educationBtn);
    expect(onSelect).toHaveBeenCalledWith('Education');
  });
});
