import React from 'react';
import { Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const DownloadCVButton: React.FC = () => {
  const { t } = useTranslation('experience');

  return (
    <a
      href="/cv.pdf"
      download="Gabriella_Correa_CV.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="
        group inline-flex items-center gap-2
        font-mono text-xs font-medium
        px-3.5 py-2 rounded-lg
        border border-[var(--accent-primary)]
        text-[var(--accent-primary)]
        hover:bg-[var(--accent-primary)] hover:text-[var(--bg-main)]
        transition-all duration-200 select-none
        shadow-[0_0_10px_-5px_var(--accent-glow)]
        hover:shadow-[0_0_18px_-3px_var(--accent-glow)]
      "
    >
      <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
      <span>{t('downloadCV')}</span>
    </a>
  );
};