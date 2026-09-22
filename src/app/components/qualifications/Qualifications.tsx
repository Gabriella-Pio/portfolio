import React from 'react';
import { useTranslation } from 'react-i18next';
import { certifications } from '@/app/data/certifications';
import { CertCard } from '@/app/components/qualifications/CertCard';
import { CertList } from '@/app/components/qualifications/CertList';

export const Qualifications: React.FC = () => {
  const { t } = useTranslation('qualifications');

  const featured = certifications.filter((c) => c.featured);
  const compact  = certifications.filter((c) => !c.featured);

  return (
    <section
      id="qualifications"
      className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-[var(--border-color)]"
    >
      {/* Section heading */}
      <div className="flex items-center gap-3 mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
          {t('heading')}
        </h2>
        <span className="px-2 py-0.5 rounded bg-[var(--bg-surface)] text-[var(--text-secondary)] text-[10px] font-mono border border-[var(--border-color)]">
          {t('badge')}
        </span>
      </div>

      {/* Featured certifications */}
      <div className="mb-10">
        <p className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest mb-4">
          {t('featuredTitle')}
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </div>

      {/* Also completed */}
      {compact.length > 0 && (
        <div>
          <p className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest mb-4">
            {t('alsoTitle')}
          </p>
          <CertList certs={compact} />
        </div>
      )}
    </section>
  );
};
