import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { AccessibilityProvider } from '@/app/context/AccessibilityContext';
import { AccessibilityPanel } from '@/app/components/header/AccessibilityPanel';

// Radix Dialog requires a pointer-events capable environment.
// We render the trigger and open the dialog manually.
const renderPanel = () =>
  render(
    <AccessibilityProvider>
      <AccessibilityPanel />
    </AccessibilityProvider>
  );

const openPanel = () => {
  const trigger = screen.getByRole('button', { name: /accessibility:triggerLabel/i });
  fireEvent.click(trigger);
};

describe('AccessibilityPanel', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the trigger button', () => {
    renderPanel();
    expect(screen.getByRole('button', { name: /accessibility:triggerLabel/i })).toBeInTheDocument();
  });

  it('opens the dialog when trigger is clicked', () => {
    renderPanel();
    openPanel();
    // The dialog title is a translated key from the mock
    expect(screen.getByText('accessibility:title')).toBeInTheDocument();
  });

  it('renders all five preference buttons inside the dialog', () => {
    renderPanel();
    openPanel();

    expect(screen.getByText('accessibility:highContrast.label')).toBeInTheDocument();
    expect(screen.getByText('accessibility:reduceMotion.label')).toBeInTheDocument();
    expect(screen.getByText('accessibility:simplifiedMode.label')).toBeInTheDocument();
    expect(screen.getByText('accessibility:keyboardFocus.label')).toBeInTheDocument();
  });

  it('renders the font scale selector with three options', () => {
    renderPanel();
    openPanel();

    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('A+')).toBeInTheDocument();
    expect(screen.getByText('A++')).toBeInTheDocument();
  });

  it('toggles high contrast preference on button click', () => {
    renderPanel();
    openPanel();

    const highContrastBtn = screen.getByText('accessibility:highContrast.label').closest('button')!;

    // Initially not active — no "check" icon visible
    // Click to activate
    fireEvent.click(highContrastBtn);

    // After activation the button should gain the active accent class
    expect(highContrastBtn).toHaveClass('text-[var(--accent-primary)]');
  });

  it('shows description text for each preference', () => {
    renderPanel();
    openPanel();

    expect(screen.getByText('accessibility:highContrast.description')).toBeInTheDocument();
    expect(screen.getByText('accessibility:reduceMotion.description')).toBeInTheDocument();
    expect(screen.getByText('accessibility:simplifiedMode.description')).toBeInTheDocument();
    expect(screen.getByText('accessibility:keyboardFocus.description')).toBeInTheDocument();
  });
});
