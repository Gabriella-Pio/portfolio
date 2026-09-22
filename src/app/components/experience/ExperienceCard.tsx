import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Terminal } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Experience } from '@/app/data/experience';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index }) => {
  const { t } = useTranslation('experience');
  const [isExpanded, setIsExpanded] = useState(false);

  const hasHighlights = experience.highlights && experience.highlights.length > 0;

  const toggleExpand = () => {
    if (hasHighlights) {
      setIsExpanded((prev) => !prev);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (hasHighlights && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      toggleExpand();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative flex items-start gap-4 group"
    >
      {/* Marcador da Timeline */}
      <div
        className={`
          relative z-10 mt-1.5 w-4 h-4 rounded-full border-2 shrink-0 transition-all duration-300
          ${experience.current
            ? 'bg-[var(--accent-primary)] border-[var(--accent-primary)] shadow-[0_0_12px_var(--accent-glow)]'
            : 'bg-[var(--bg-surface)] border-[var(--border-color)] group-hover:border-[var(--accent-primary)]'
          }
        `}
      >
        {/* Pulso para o emprego atual */}
        {experience.current && (
          <span className="absolute inset-0 rounded-full bg-[var(--accent-primary)] animate-ping opacity-30" />
        )}
      </div>

      {/* Container do Card */}
      <div className="flex-1 pb-8">
        <div
          role={hasHighlights ? 'button' : undefined}
          tabIndex={hasHighlights ? 0 : undefined}
          aria-expanded={hasHighlights ? isExpanded : undefined}
          onClick={toggleExpand}
          onKeyDown={handleKeyDown}
          className={`
            p-5 rounded-xl border border-[var(--border-color)]
            bg-[var(--bg-surface)]/60 hover:bg-[var(--bg-surface)]
            shadow-[var(--shadow-surface)] hover:shadow-[var(--shadow-hover)]
            hover:border-[var(--accent-primary)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]
            transition-all duration-300
            ${hasHighlights ? 'cursor-pointer' : ''}
          `}
        >
          {/* Cabeçalho do Card: Período + Botão Expandir */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <p className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-wider">
              {experience.period.replace('present', t('present'))}
            </p>

            {hasHighlights && (
              <div className="flex items-center gap-1 font-mono text-[10px] text-[var(--accent-primary)] group-hover:underline">
                <span>{isExpanded ? t('hideDetails') : t('showDetails')}</span>
                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </div>
            )}
          </div>

          {/* Cargo + Empresa */}
          <h3 className="font-sans font-bold text-base md:text-lg text-[var(--text-primary)] leading-tight">
            {experience.role}
          </h3>
          <p className="font-mono text-sm text-[var(--accent-primary)] mt-0.5 font-medium">
            {experience.company}
          </p>

          {/* Resumo/Descrição */}
          <p className="font-sans text-sm text-[var(--text-secondary)] leading-relaxed mt-3 max-w-2xl">
            {experience.description}
          </p>

          {/* Seção Expansível de Highlights */}
          <AnimatePresence>
            {isExpanded && hasHighlights && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-[var(--border-color)]/60 mt-4 pt-4 space-y-2.5"
              >
                <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--accent-primary)] mb-1">
                  <Terminal size={13} />
                  <span>{t('keyDeliverables')}</span>
                </div>
                {experience.highlights.map((highlight, hIndex) => (
                  <div key={hIndex} className="flex items-start gap-2.5 font-sans text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
                    <span className="text-[var(--accent-primary)] font-mono text-xs mt-0.5 shrink-0">›</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tags de Tecnologias */}
          <div className="flex flex-wrap gap-1.5 mt-4 pt-2 border-t border-[var(--border-color)]/30">
            {experience.stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] px-2 py-0.5 rounded border border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--text-secondary)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};