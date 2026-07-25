import React from 'react';
import { Accessibility, Check, Contrast, EyeOff, Keyboard, ScanLine } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import { useTranslation } from 'react-i18next';

export const AccessibilityPanel: React.FC = () => {
  const { preferences, updatePreference } = useAccessibility();
  const { t } = useTranslation('accessibility');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          aria-label={t('triggerLabel')}
          className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors p-2 hover:bg-[var(--bg-surface)] rounded-md"
        >
          <Accessibility size={18} />
        </button>
      </DialogTrigger>
      <DialogContent
          className="
              sm:max-w-md
              text-[var(--text-primary)]
              shadow-[0_0_40px_-15px_var(--accent-glow)]
          " >
        <DialogHeader className="space-y-2">
          <DialogTitle className="!text-[var(--text-primary)] font-mono text-sm tracking-tighter">{t('title')}</DialogTitle>
          <DialogDescription className="!text-[var(--text-secondary)] text-sm">
            {t('description')}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-3">
          <button
            onClick={() => updatePreference('highContrast', !preferences.highContrast)}
            className={`flex w-full items-center justify-between rounded-lg border px-3 py-3 text-left transition-colors ${preferences.highContrast ? 'border-[var(--accent-primary)]/40 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]' : 'border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--text-primary)] hover:border-[var(--accent-primary)]/50'}`}
          >
            <div className="flex items-center gap-3">
              <Contrast size={16} />
              <div>
                <div className="text-sm font-mono">{t('highContrast.label')}</div>
                <p className="text-xs text-[var(--text-secondary)]">{t('highContrast.description')}</p>
              </div>
            </div>
            {preferences.highContrast && <Check size={16} />}
          </button>

          <div className="grid grid-cols-3 gap-2">
            {[1, 1.1, 1.2].map(scale => (
              <button
                key={scale}
                onClick={() => updatePreference('fontScale', scale)}
                className={`rounded-lg border px-3 py-2 text-sm font-mono transition-colors ${preferences.fontScale === scale ? 'border-[var(--accent-primary)]/40 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]' : 'border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)]/50'}`}
              >
                {scale === 1 ? 'A' : scale === 1.1 ? 'A+' : 'A++'}
              </button>
            ))}
          </div>

          <button
            onClick={() => updatePreference('reduceMotion', !preferences.reduceMotion)}
            className={`flex w-full items-center justify-between rounded-lg border px-3 py-3 text-left transition-colors ${preferences.reduceMotion ? 'border-[var(--accent-primary)]/40 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]' : 'border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--text-primary)] hover:border-[var(--accent-primary)]/50'}`}
          >
            <div className="flex items-center gap-3">
              <ScanLine size={16} />
              <div>
                <div className="text-sm font-mono">{t('reduceMotion.label')}</div>
                <p className="text-xs text-[var(--text-secondary)]">{t('reduceMotion.description')}</p>
              </div>
            </div>
            {preferences.reduceMotion && <Check size={16} />}
          </button>

          <button
            onClick={() => updatePreference('simplifiedMode', !preferences.simplifiedMode)}
            className={`flex w-full items-center justify-between rounded-lg border px-3 py-3 text-left transition-colors ${preferences.simplifiedMode ? 'border-[var(--accent-primary)]/40 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]' : 'border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--text-primary)] hover:border-[var(--accent-primary)]/50'}`}
          >
            <div className="flex items-center gap-3">
              <EyeOff size={16} />
              <div>
                <div className="text-sm font-mono">{t('simplifiedMode.label')}</div>
                <p className="text-xs text-[var(--text-secondary)]">{t('simplifiedMode.description')}</p>
              </div>
            </div>
            {preferences.simplifiedMode && <Check size={16} />}
          </button>

          <button
            onClick={() => updatePreference('keyboardFocus', !preferences.keyboardFocus)}
            className={`flex w-full items-center justify-between rounded-lg border px-3 py-3 text-left transition-colors ${preferences.keyboardFocus ? 'border-[var(--accent-primary)]/40 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]' : 'border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--text-primary)] hover:border-[var(--accent-primary)]/50'}`}
          >
            <div className="flex items-center gap-3">
              <Keyboard size={16} />
              <div>
                <div className="text-sm font-mono">{t('keyboardFocus.label')}</div>
                <p className="text-xs text-[var(--text-secondary)]">{t('keyboardFocus.description')}</p>
              </div>
            </div>
            {preferences.keyboardFocus && <Check size={16} />}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
