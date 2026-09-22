import React from 'react';
import { useTranslation } from 'react-i18next';
import { experiences } from '@/app/data/experience';
import { ExperienceCard } from '@/app/components/experience/ExperienceCard';
import { DownloadCVButton } from '@/app/components/experience/DownloadCVButton';

export const Experience: React.FC = () => {
  const { t } = useTranslation('experience');

  return (
    <section
      id="experience"
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

        {/* CV download — right side of heading row */}
        <div className="ml-auto">
          <DownloadCVButton />
        </div>
      </div>

      {/* Timeline */}
      <div className="relative pl-2">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-2 bottom-6 w-px bg-[var(--border-color)]" />

        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} experience={exp} index={i} />
          ))}
        </div>

        {/* Timeline start dot */}
        <div className="relative flex items-center gap-4 pl-0.5">
          <div className="relative z-10 p-1 bg-[var(--bg-main)]">
            <div className="w-4 h-4 rounded-full border border-[var(--border-color)] flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[var(--border-color)] rounded-full" />
            </div>
          </div>
          <span className="font-mono text-[10px] text-[var(--text-secondary)]">init</span>
        </div>
      </div>
    </section>
  );
};
