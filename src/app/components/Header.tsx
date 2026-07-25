import React from 'react';
import { Box, Menu, X, Moon, Sun } from 'lucide-react';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import { AccessibilityPanel } from '@/app/components/header/AccessibilityPanel';
import { HeaderBrand } from '@/app/components/header/HeaderBrand';
import { LanguageSwitcher } from '@/app/components/header/LanguageSwitcher';
import { MobileMenu } from '@/app/components/header/MobileMenu';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  is3DMode: boolean;
  toggle3DMode: () => void;
  openCommandPalette: () => void;
}

export const Header: React.FC<HeaderProps> = ({ is3DMode, toggle3DMode, openCommandPalette }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { theme, toggleTheme } = useAccessibility();
  const { t } = useTranslation('header');

  return (
    <header
    className="
    fixed
    top-0
    left-0
    right-0

    z-40

    h-16

    border-b
    border-[var(--border-color)]

    bg-[var(--bg-main)]/80
    backdrop-blur-md

    flex
    items-center
    justify-between

    px-4
    md:px-8

    transition-colors
    duration-500
    "
    >
      {/* Logo */}
      <HeaderBrand />

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-8 font-sans text-sm text-[var(--text-secondary)]">
        <button 
           onClick={openCommandPalette} 
           className="hover:text-[var(--accent-primary)] transition-colors flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-[var(--bg-surface)] border border-transparent hover:border-[var(--border-color)]"
        >
           <span className="text-xs font-mono">CMD+K</span>
        </button>
      </nav>

      {/* Right Actions */}
      <div className="hidden md:flex items-center gap-4">
        {/* 3D Toggle */}
        <button
          onClick={toggle3DMode}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-mono transition-all
            ${is3DMode 
              ? 'bg-[var(--accent-primary)]/10 border-[var(--accent-primary)] text-[var(--accent-primary)] shadow-[0_0_10px_var(--accent-glow)]' 
              : 'border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)]/50 hover:text-[var(--text-primary)]'}
          `}
        >
          <Box size={14} />
          <span>{is3DMode ? t('simulation.active') : t('simulation.inactive')}</span>
        </button>

        <div className="h-6 w-[1px] bg-[var(--border-color)] mx-1"></div>

        <LanguageSwitcher />

        <button 
          onClick={toggleTheme}
          className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors p-2 hover:bg-[var(--bg-surface)] rounded-md"
        >
          {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        
        <AccessibilityPanel />
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onOpenChange={setIsMobileMenuOpen}
        onCommandPalette={openCommandPalette}
        is3DMode={is3DMode}
        toggle3DMode={toggle3DMode}
      />
    </header>
  );
};
