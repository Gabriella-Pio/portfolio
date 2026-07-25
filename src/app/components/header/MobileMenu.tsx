import React from 'react';
import { Box, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AccessibilityPanel } from '@/app/components/header/AccessibilityPanel';
import { LanguageSwitcher } from '@/app/components/header/LanguageSwitcher';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import { useTranslation } from 'react-i18next';

interface MobileMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCommandPalette: () => void;
  is3DMode: boolean;
  toggle3DMode: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onOpenChange,
  onCommandPalette,
  is3DMode,
  toggle3DMode,
}) => {
  const { theme, toggleTheme } = useAccessibility();
  const { t } = useTranslation('header');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-16 left-0 right-0 bg-[var(--bg-main)] border-b border-[var(--border-color)] p-4 flex flex-col gap-4 md:hidden shadow-2xl"
        >
          {/* Search Commands */}
          <button
            onClick={() => {
              onCommandPalette();
              onOpenChange(false);
            }}
            className="text-left text-[var(--text-secondary)] hover:text-[var(--accent-primary)] py-2 border-b border-[var(--border-color)]"
          >
            {t('commandPalette')}
          </button>

          {/* Theme Toggle */}
          <div className="flex items-center justify-between py-2 border-b border-[var(--border-color)]">
            <span className="text-[var(--text-secondary)]">{t('theme')}</span>
            <button onClick={toggleTheme} className="flex gap-4">
              {theme === 'dark' ? (
                <Moon size={18} className="text-[var(--accent-primary)]" />
              ) : (
                <Sun size={18} className="text-[var(--accent-primary)]" />
              )}
            </button>
          </div>

          {/* Accessibility Panel */}
          <div className="flex items-center justify-between py-2 border-b border-[var(--border-color)]">
            <span className="text-[var(--text-secondary)]">{t('accessibility')}</span>
            <AccessibilityPanel />
          </div>

          {/* Language Switcher */}
          <div className="py-2 border-b border-[var(--border-color)]">
            <LanguageSwitcher compact onLanguageChange={() => onOpenChange(false)} />
          </div>

          {/* 3D Mode Toggle */}
          <button
            onClick={() => {
              toggle3DMode();
              onOpenChange(false);
            }}
            className={`
              flex items-center justify-center gap-2 px-3 py-3 rounded border text-xs font-mono transition-all w-full
              ${is3DMode
                ? 'bg-[var(--accent-primary)]/10 border-[var(--accent-primary)] text-[var(--accent-primary)]'
                : 'border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-secondary)]'}
            `}
          >
            <Box size={14} />
            <span>{is3DMode ? t('simulation.mobileActive') : t('simulation.mobileInactive')}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
