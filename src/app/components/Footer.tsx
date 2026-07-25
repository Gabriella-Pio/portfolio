import React from 'react';
import { Github, Linkedin, Mail, Twitter, Command } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation('footer');

  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-main)] py-12 px-4 md:px-8 mt-20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex flex-col gap-2 text-center md:text-left">
          <div className="font-mono text-[var(--text-primary)] text-sm tracking-tighter flex items-center gap-2 justify-center md:justify-start">
             <div className="w-1.5 h-1.5 bg-[var(--accent-primary)] rounded-full"></div>
             <span>GABRIELLA.SYS</span>
          </div>
          <p className="font-mono text-xs text-[var(--text-secondary)]">
            {t('systemVersion', { version: '2.1.0' })}
          </p>
        </div>

        <div className="flex gap-6">
          <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"><Github size={18} /></a>
          <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"><Linkedin size={18} /></a>
          <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"><Twitter size={18} /></a>
          <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"><Mail size={18} /></a>
        </div>

        <div className="text-center md:text-right font-mono text-xs text-[var(--text-secondary)] flex flex-col items-center md:items-end gap-1">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)]">
            <Command size={10} className="text-[var(--text-secondary)]" />
            <span className="text-[var(--text-secondary)]">
              <Trans
                i18nKey="shortcutHint"
                ns="footer"
                components={{ 1: <span className="text-[var(--text-primary)]" /> }}
              />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
