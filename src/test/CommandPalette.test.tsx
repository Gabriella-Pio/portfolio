import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { CommandPalette } from '@/app/components/CommandPalette';

// Minimal wrapper — CommandPalette has no context dependency
const renderPalette = (open = true, setOpen = vi.fn()) =>
  render(<CommandPalette open={open} setOpen={setOpen} />);

describe('CommandPalette', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ─── Visibility ───────────────────────────────────────────────────────────

  describe('visibility', () => {
    it('renders the search input when open=true', () => {
      renderPalette(true);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('does not render when open=false', () => {
      renderPalette(false);
      expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    });
  });

  // ─── Keyboard shortcuts ───────────────────────────────────────────────────

  describe('keyboard shortcuts', () => {
    it('calls setOpen(false) when Escape is pressed', () => {
      const setOpen = vi.fn();
      renderPalette(true, setOpen);

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(setOpen).toHaveBeenCalledWith(false);
    });

    it('calls setOpen with toggled value when Ctrl+K is pressed', () => {
      const setOpen = vi.fn();
      renderPalette(true, setOpen);

      fireEvent.keyDown(document, { key: 'k', ctrlKey: true });

      // open is true, so toggle should call setOpen(false)
      expect(setOpen).toHaveBeenCalledWith(false);
    });
  });

  // ─── Navigation groups ────────────────────────────────────────────────────

  describe('navigation groups', () => {
    it('renders the Navigation group heading', () => {
      renderPalette();
      expect(screen.getByText('command:groups.navigation')).toBeInTheDocument();
    });

    it('renders the System group heading', () => {
      renderPalette();
      expect(screen.getByText('command:groups.system')).toBeInTheDocument();
    });

    it('renders the Social group heading', () => {
      renderPalette();
      expect(screen.getByText('command:groups.social')).toBeInTheDocument();
    });

    it('renders translated navigation items', () => {
      renderPalette();
      expect(screen.getByText('command:items.home')).toBeInTheDocument();
      expect(screen.getByText('command:items.projects')).toBeInTheDocument();
      expect(screen.getByText('command:items.notes')).toBeInTheDocument();
      expect(screen.getByText('command:items.about')).toBeInTheDocument();
    });
  });

  // ─── Bikcraft smart search ────────────────────────────────────────────────

  describe('bikcraft smart search', () => {
    it('shows best match section when "bik" is typed', async () => {
      const user = userEvent.setup();
      renderPalette();

      const input = screen.getByRole('combobox');
      await user.type(input, 'bik');

      expect(screen.getByText('command:bestMatch')).toBeInTheDocument();
      expect(screen.getByText('Project: Bikcraft')).toBeInTheDocument();
    });

    it('hides navigation groups when bikcraft search is active', async () => {
      const user = userEvent.setup();
      renderPalette();

      await user.type(screen.getByRole('combobox'), 'bik');

      expect(screen.queryByText('command:groups.navigation')).not.toBeInTheDocument();
    });

    it('restores navigation groups when search is cleared', async () => {
      const user = userEvent.setup();
      renderPalette();

      const input = screen.getByRole('combobox');
      await user.type(input, 'bik');
      await user.clear(input);

      expect(screen.getByText('command:groups.navigation')).toBeInTheDocument();
    });
  });

  // ─── Input reset on close ─────────────────────────────────────────────────

  describe('input reset', () => {
    it('clears the input when palette is closed (open changes to false)', () => {
      const { rerender } = render(
        <CommandPalette open={true} setOpen={vi.fn()} />
      );

      const input = screen.getByRole('combobox') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'test query' } });
      expect(input.value).toBe('test query');

      // Close the palette
      rerender(<CommandPalette open={false} setOpen={vi.fn()} />);

      // Reopen — input should be empty
      rerender(<CommandPalette open={true} setOpen={vi.fn()} />);
      expect(screen.getByRole('combobox')).toHaveValue('');
    });
  });
});
