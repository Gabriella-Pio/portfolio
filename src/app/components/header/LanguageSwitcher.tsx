import React from 'react';
import { Check, ChevronDown, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { languages, type LanguageCode } from '@/app/i18n/languages';
import { cn } from '@/app/components/ui/utils';

interface LanguageSwitcherProps {
  compact?: boolean;
  onLanguageChange?: () => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  compact = false,
  onLanguageChange,
}) => {
  const { i18n, t } = useTranslation('common');
  const activeLanguage = languages.find(language => language.code === i18n.language) ?? languages[0];

  const handleLanguageChange = (language: LanguageCode) => {
    void i18n.changeLanguage(language);
    onLanguageChange?.();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label={t('language.change')}
          className={cn(
            'flex items-center rounded-md border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-primary)]/50 hover:text-[var(--text-primary)]',
            compact ? 'gap-2 px-3 py-2 w-full justify-between' : 'gap-2 px-3 py-1.5'
          )}
        >
          <span className="flex items-center gap-2">
            <Languages size={14} className="text-[var(--accent-primary)]" />
            <span>{activeLanguage.shortLabel}</span>
          </span>
          <ChevronDown size={14} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="min-w-44 border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-xl"
      >
        {languages.map(language => {
          const isActive = language.code === activeLanguage.code;

          return (
            <DropdownMenuItem
              key={language.code}
              onSelect={() => handleLanguageChange(language.code)}
              className={cn(
                'cursor-pointer rounded px-2 py-2 font-mono text-xs text-[var(--text-secondary)] focus:bg-[var(--bg-main)] focus:text-[var(--text-primary)]',
                isActive && 'text-[var(--accent-primary)]'
              )}
            >
              <span className="flex flex-1 flex-col">
                <span>{language.nativeLabel}</span>
                <span className="text-[10px] text-[var(--text-secondary)]">{language.code}</span>
              </span>
              {isActive && <Check size={14} />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
