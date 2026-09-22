import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Copy, Check, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { contactData } from '@/app/data/contact';

export const Contact: React.FC = () => {
  const { t } = useTranslation('contact');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-[var(--border-color)]"
    >
      {/* Cabeçalho da Seção */}
      <div className="flex items-center gap-3 mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
          {t('heading')}
        </h2>
        <span className="px-2 py-0.5 rounded bg-[var(--bg-surface)] text-[var(--text-secondary)] text-[10px] font-mono border border-[var(--border-color)]">
          {t('badge')}
        </span>
      </div>

      {/* Bloco principal de CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl space-y-6"
      >
        <h3 className="font-sans text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight leading-tight">
          {t('tagline')}
        </h3>

        <p className="font-sans text-base text-[var(--text-secondary)] leading-relaxed">
          {t('subtext')}
        </p>

        {/* E-mail CTA com ações duplas (Abrir mailto e Copiar) */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {/* Botão Mailto Direto */}
          <a
            href={`mailto:${contactData.email}`}
            className="
              inline-flex items-center gap-2
              font-mono text-sm font-medium
              px-4 py-2.5 rounded-lg
              border border-[var(--accent-primary)]
              text-[var(--accent-primary)]
              hover:bg-[var(--accent-primary)] hover:text-[var(--bg-main)]
              transition-all duration-200
              shadow-[0_0_15px_-8px_var(--accent-glow)]
            "
          >
            <Mail size={16} />
            <span>{t('emailButton')}</span>
          </a>

          {/* Botão de Copiar E-mail */}
          <button
            onClick={handleCopyEmail}
            className="
              inline-flex items-center gap-2
              font-mono text-xs
              px-3.5 py-2.5 rounded-lg
              border border-[var(--border-color)]
              bg-[var(--bg-surface)]
              text-[var(--text-secondary)]
              hover:text-[var(--text-primary)]
              hover:border-[var(--accent-primary)]/50
              transition-all duration-200
            "
            title="Copy email to clipboard"
          >
            {copied ? (
              <>
                <Check size={14} className="text-[var(--accent-secondary)]" />
                <span className="text-[var(--accent-secondary)]">COPIED_TO_CLIPBOARD</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>{contactData.email}</span>
              </>
            )}
          </button>
        </div>

        {/* Links das Redes Sociais */}
        <div className="pt-6 border-t border-[var(--border-color)]/60 flex flex-wrap gap-4">
          {contactData.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group flex items-center gap-2.5
                px-3.5 py-2 rounded-lg
                border border-[var(--border-color)]
                bg-[var(--bg-surface)]/50
                hover:border-[var(--accent-primary)]/60
                hover:bg-[var(--bg-surface)]
                transition-all duration-200
              "
            >
              <span className="text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors">
                {social.icon === 'github' && <Github size={18} />}
                {social.icon === 'linkedin' && <Linkedin size={18} />}
              </span>
              <span className="font-mono text-xs text-[var(--text-primary)] font-medium">
                {social.name}
              </span>
              <ExternalLink size={12} className="text-[var(--text-secondary)] opacity-50 group-hover:opacity-100 group-hover:text-[var(--accent-primary)] transition-all" />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};