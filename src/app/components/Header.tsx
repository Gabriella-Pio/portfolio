import React from 'react';
import { Box, Menu, X, Moon, Sun } from 'lucide-react';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import { AccessibilityPanel } from '@/app/components/header/AccessibilityPanel';
import { HeaderBrand } from '@/app/components/header/HeaderBrand';
import { LanguageSwitcher } from '@/app/components/header/LanguageSwitcher';
import { MobileMenu } from '@/app/components/header/MobileMenu';
import { useTranslation } from 'react-i18next';
import { ENABLE_3D_SIMULATION } from '@/app/hooks/use3DMode';

interface HeaderProps {
  is3DMode: boolean;
  toggle3DMode: () => void;
  openCommandPalette: () => void;
}

const NAV_ITEMS = [
  { id: 'about', key: 'nav.about' },
  { id: 'experience', key: 'nav.experience' },
  { id: 'skills', key: 'nav.skills' },
  { id: 'projects', key: 'nav.projects' },
  { id: 'notes', key: 'nav.garden' },
  { id: 'contact', key: 'nav.contact' },
] as const;

export const Header: React.FC<HeaderProps> = ({ is3DMode, toggle3DMode, openCommandPalette }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { theme, toggleTheme } = useAccessibility();
  const { t } = useTranslation('header');

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className="
        fixed top-0 left-0 right-0 z-40 h-16
        border-b border-[var(--border-color)]
        bg-[var(--bg-main)]/80 backdrop-blur-md
        shadow-[var(--shadow-header)]
        flex items-center justify-between
        px-4 md:px-8
        transition-colors duration-500
      "
    >
      <HeaderBrand />

      <nav className="hidden md:flex items-center gap-5 font-sans text-sm text-[var(--text-secondary)]">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="hover:text-[var(--accent-primary)] transition-colors font-mono text-[11px] tracking-wide"
          >
            {t(item.key)}
          </button>
        ))}
        <button
          onClick={openCommandPalette}
          className="hover:text-[var(--accent-primary)] transition-colors flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-[var(--bg-surface)] border border-transparent hover:border-[var(--border-color)]"
        >
          <span className="text-xs font-mono">Ctrl+K</span>
        </button>
      </nav>

      <div className="hidden md:flex items-center gap-4">
        {ENABLE_3D_SIMULATION && (
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
        )}

        {ENABLE_3D_SIMULATION && <div className="h-6 w-[1px] bg-[var(--border-color)] mx-1" />}

        <LanguageSwitcher />

        <button
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? t('theme') : t('theme')}
          className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors p-2 hover:bg-[var(--bg-surface)] rounded-md"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <AccessibilityPanel />
      </div>

      <button
        className="md:hidden text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X /> : <Menu />}
      </button>

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
