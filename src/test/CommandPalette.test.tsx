import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { CommandPalette } from '@/app/components/command/CommandPalette';
import { AccessibilityProvider } from '@/app/context/AccessibilityContext';

const renderPalette = (open = true, setOpen = vi.fn()) =>
  render(
    <AccessibilityProvider>
      <CommandPalette open={open} setOpen={setOpen} />
    </AccessibilityProvider>
  );

describe('CommandPalette', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

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

      expect(setOpen).toHaveBeenCalledWith(false);
    });
  });

  describe('navigation groups', () => {
    it('renders the Navigation group heading', () => {
      renderPalette();
      expect(screen.getByText('command:groups.navigation')).toBeInTheDocument();
    });

    it('renders the Accessibility group heading', () => {
      renderPalette();
      expect(screen.getByText('command:groups.accessibility')).toBeInTheDocument();
    });

    it('renders the Social group heading', () => {
      renderPalette();
      expect(screen.getByText('command:groups.social')).toBeInTheDocument();
    });

    it('renders translated navigation items', () => {
      renderPalette();
      expect(screen.getByText('command:items.home')).toBeInTheDocument();
      expect(screen.getByText('command:items.projects')).toBeInTheDocument();
      expect(screen.getByText('command:items.garden')).toBeInTheDocument();
      expect(screen.getByText('command:items.about')).toBeInTheDocument();
    });
  });

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

  describe('input reset', () => {
    it('clears the input when palette is closed (open changes to false)', () => {
      const { rerender } = render(
        <AccessibilityProvider>
          <CommandPalette open={true} setOpen={vi.fn()} />
        </AccessibilityProvider>
      );

      const input = screen.getByRole('combobox') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'test query' } });
      expect(input.value).toBe('test query');

      rerender(
        <AccessibilityProvider>
          <CommandPalette open={false} setOpen={vi.fn()} />
        </AccessibilityProvider>
      );

      rerender(
        <AccessibilityProvider>
          <CommandPalette open={true} setOpen={vi.fn()} />
        </AccessibilityProvider>
      );
      expect(screen.getByRole('combobox')).toHaveValue('');
    });
  });
});
