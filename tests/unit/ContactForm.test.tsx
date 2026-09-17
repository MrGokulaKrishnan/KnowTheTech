import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Contact } from '@/pages/Contact';
import { BrowserRouter } from 'react-router-dom';

describe('Contact Form Validation', () => {
  it('displays validation errors on empty submission', async () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );

    const submitBtn = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/please provide a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/subject must be at least 3 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
    });
  });

  it('submits successfully when valid information is provided', async () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/alex chen/i), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/alex@example.com/i), {
      target: { value: 'jane@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/inquiry topic/i), {
      target: { value: 'KnowTheBinary Inquiry' },
    });
    fireEvent.change(screen.getByPlaceholderText(/write your note/i), {
      target: { value: 'I really enjoyed using the algorithm step visualizer!' },
    });

    const submitBtn = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/message prepared successfully/i)).toBeInTheDocument();
      expect(screen.getByText(/open in email client/i)).toBeInTheDocument();
    });
  });
});
