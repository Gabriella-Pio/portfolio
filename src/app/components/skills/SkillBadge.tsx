import React from 'react';
import { Skill } from '@/app/data/skills';
import { SkillIcon } from '@/app/components/skills/SkillIcon';

interface SkillBadgeProps {
  skill: Skill;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({ skill }) => {
  return (
    <div
      className="
        group flex items-center gap-3
        px-5 py-2.5 rounded-xl
        border border-[var(--border-color)]
        bg-[var(--bg-surface)]/90 backdrop-blur-md
        hover:border-[var(--accent-primary)]
        hover:shadow-[var(--shadow-hover)]
        hover:-translate-y-0.5
        transition-all duration-300 select-none whitespace-nowrap cursor-pointer
      "
    >
      {/* Ícone */}
      <span className="grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center shrink-0">
        <SkillIcon name={skill.name} className="w-5 h-5 md:w-6 md:h-6" />
      </span>

      {/* Nome da Stack */}
      <span className="font-mono text-sm text-[var(--text-primary)] font-medium tracking-wide">
        {skill.name}
      </span>

      {/* Tag de Contexto (se houver) */}
      {skill.tag && (
        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20 uppercase tracking-wider">
          {skill.tag}
        </span>
      )}
    </div>
  );
};