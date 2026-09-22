import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { skills, SkillCategory } from '@/app/data/skills';
import { SkillBadge } from '@/app/components/skills/SkillBadge';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import { Cpu, Terminal } from 'lucide-react';

const CATEGORIES: { id: SkillCategory | 'all'; translationKey: string }[] = [
  { id: 'all', translationKey: 'categories.all' },
  { id: 'frontend', translationKey: 'categories.frontend' },
  { id: 'backend', translationKey: 'categories.backend' },
  { id: 'cloud', translationKey: 'categories.cloud' },
  { id: 'tools', translationKey: 'categories.tools' },
  { id: 'metrology', translationKey: 'categories.metrology' },
];

export const Skills: React.FC = () => {
  const { t } = useTranslation('skills');
  const { preferences } = useAccessibility();
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all');

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  // Garante itens suficientes no trilho para não quebrar o loop em telas Ultra-Wide
  const repeatCount = Math.ceil(15 / Math.max(1, filteredSkills.length));
  const marqueeSkills = Array(repeatCount).fill(filteredSkills).flat();

  return (
    <section
      id="skills"
      className="py-16 px-4 md:px-8 max-w-7xl mx-auto border-t border-[var(--border-color)] overflow-hidden"
    >
      {/* Cabeçalho da Seção */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div className="flex items-center gap-3">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
            {t('heading')}
          </h2>
          <span className="px-2 py-0.5 rounded bg-[var(--bg-surface)] text-[var(--text-secondary)] text-[10px] font-mono border border-[var(--border-color)]">
            {t('badge')}
          </span>
        </div>

        {/* Status do Barramento */}
        <div className="flex items-center gap-2 font-mono text-[10px] text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 px-2.5 py-1 rounded border border-[var(--accent-primary)]/20">
          <Cpu size={12} className="animate-pulse" />
          <span>STREAM_STATUS :: {activeCategory.toUpperCase()}</span>
        </div>
      </div>

      {/* Tabs de Filtragem com Rótulos Traduzidos */}
      <div 
        role="tablist"
        aria-label={t('heading')}
        className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none border-b border-[var(--border-color)]"
      >
        <Terminal size={14} className="text-[var(--accent-primary)] shrink-0 mr-1" />
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(cat.id)}
              className={`
                font-mono text-xs px-3 py-1 rounded-md transition-all duration-200 border whitespace-nowrap focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]
                ${isActive
                  ? 'bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border-[var(--accent-primary)] shadow-[0_0_10px_-4px_var(--accent-glow)] font-bold'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent-primary)]/40 hover:text-[var(--text-primary)]'
                }
              `}
            >
              [ {t(cat.translationKey)} ]
            </button>
          );
        })}
      </div>

      {/* ESTEIRA DINÂMICA FILTRADA */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="relative w-full overflow-hidden py-6 bg-[var(--bg-surface)]/20 rounded-xl border border-[var(--border-color)]/60"
        >
          {/* Fades laterais para suavizar o aparecimento dos itens */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[var(--bg-main)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[var(--bg-main)] to-transparent z-10 pointer-events-none" />

          {preferences.reduceMotion ? (
            // Acessibilidade: Versão estática lado a lado
            <div className="flex flex-wrap gap-3 px-4 justify-center">
              {filteredSkills.map((skill, index) => (
                <SkillBadge key={`${skill.name}-${index}`} skill={skill} />
              ))}
            </div>
          ) : (
            // Esteira Animada (Pausa no Hover E no Foco do Teclado)
            <div className="flex w-max space-x-4">
              <motion.div
                className="flex space-x-4 py-1 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                  ease: 'linear',
                  duration: Math.max(12, filteredSkills.length * 3),
                  repeat: Infinity,
                }}
              >
                {marqueeSkills.map((skill, i) => (
                  <SkillBadge key={`${skill.name}-${i}`} skill={skill} />
                ))}
              </motion.div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};