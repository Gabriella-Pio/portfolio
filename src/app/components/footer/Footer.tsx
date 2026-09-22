import React from 'react';
import { Github, Linkedin, Mail, Command } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import { contactData } from '@/app/data/contact';

export const Footer: React.FC = () => {
  const { t } = useTranslation('footer');

  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-main)] py-12 px-4 md:px-8 mt-20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Identificação / Versão */}
        <div className="flex flex-col gap-2 text-center md:text-left">
          <div className="font-mono text-[var(--text-primary)] text-sm tracking-tighter flex items-center gap-2 justify-center md:justify-start">
            <div className="w-1.5 h-1.5 bg-[var(--accent-primary)] rounded-full"></div>
            <span>GABRIELLA.SYS</span>
          </div>
          <p className="font-mono text-xs text-[var(--text-secondary)]">
            {t('systemVersion', { version: '2.1.0' })}
          </p>
        </div>

        {/* Links dinâmicos de Redes Sociais + E-mail */}
        <div className="flex gap-6 items-center">
          {contactData.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
            >
              {social.icon === 'github' && <Github size={18} />}
              {social.icon === 'linkedin' && <Linkedin size={18} />}
            </a>
          ))}

          {/* Link direto de E-mail */}
          <a
            href={`mailto:${contactData.email}`}
            aria-label="Email"
            className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
          >
            <Mail size={18} />
          </a>
        </div>

        {/* Atalho de Teclado */}
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