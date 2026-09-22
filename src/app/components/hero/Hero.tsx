import React from 'react';
import { motion } from 'motion/react';
import { Activity, Terminal, Award, Cpu } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Hero: React.FC = () => {
  const { t } = useTranslation('hero');

  return (
    <section className="pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <div className="font-mono text-xs text-[var(--text-secondary)] mb-6 flex items-center gap-2">
        <span className="text-[var(--accent-primary)]">root</span>
        <span className="text-[var(--border-color)]">/</span>
        <span>gabriella</span>
        <span className="text-[var(--border-color)]">/</span>
        <span className="text-[var(--text-secondary)]">overview.md</span>
      </div>

      <div className="grid md:grid-cols-3 gap-10 items-stretch">
        {/* Coluna da Esquerda */}
        <div className="md:col-span-2 flex flex-col justify-between">
          <div>
            {/* H1 Principal */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[var(--text-primary)] tracking-tight leading-none mb-4"
            >
              Gabriella Pio Correa
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-mono text-lg sm:text-xl md:text-2xl text-[var(--accent-primary)] font-medium mb-10 tracking-tight"
            >
              {t('title.line1')} &amp; {t('title.line2')}
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="font-mono text-sm space-y-5 text-[var(--text-secondary)]"
          >
            {/* Status Online */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-md shadow-lg shadow-[var(--accent-secondary)]/5">
              <span className="text-[var(--accent-secondary)] animate-pulse">●</span>
              <span className="text-[var(--accent-secondary)] font-bold tracking-wider">{t('status')}</span>
            </div>
            
            {/* Terminal Specs */}
            <div className="border-l border-[var(--border-color)] pl-6 py-2 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <span className="text-[var(--accent-primary)] min-w-[8.5rem] shrink-0 opacity-70">{t('operations.currentOp')}</span>
                <span className="text-[var(--text-primary)] font-medium">{t('operations.status')}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <span className="text-[var(--accent-primary)] min-w-[8.5rem] shrink-0 opacity-70">{t('operations.stackCore')}</span>
                <span className="text-[var(--text-primary)]">REACT, TYPESCRIPT, PYTHON, DJANGO, DOCKER</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <span className="text-[var(--accent-primary)] min-w-[8.5rem] shrink-0 opacity-70">{t('operations.location')}</span>
                <span className="text-[var(--text-secondary)]">{t('operations.locationValue')}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Coluna da Direita */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="hidden md:flex md:flex-col justify-between bg-[var(--bg-surface)]/60 backdrop-blur-md border border-[var(--border-color)] p-6 rounded-xl font-mono text-xs text-[var(--text-secondary)] shadow-[var(--shadow-surface)] relative overflow-hidden"
        >
          <div>
            <div className="flex justify-between items-center mb-5 pb-4 border-b border-[var(--border-color)]">
              <span className="text-[var(--accent-primary)] font-bold flex items-center gap-2">
                <Terminal size={14} />
                <span>{t('metrics.title')}</span>
              </span>
              <Activity size={14} className="text-[var(--accent-primary)] animate-pulse" />
            </div>

            <div className="space-y-4">
              {/* Item 1: ZEISS Program */}
              <div className="space-y-1.5 p-3 rounded-lg bg-[var(--bg-main)]/50 border border-[var(--border-color)]/60">
                <div className="flex items-center justify-between text-[var(--accent-secondary)] font-bold">
                  <span className="flex items-center gap-1.5">
                    <Award size={13} />
                    <span>{t('telemetry.zeissTitle')}</span>
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--accent-secondary)]/10 border border-[var(--accent-secondary)]/30">TOP 5</span>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  {t('telemetry.zeissDesc')}
                </p>
              </div>

              {/* Item 2: Focus Area */}
              <div className="space-y-1.5 p-3 rounded-lg bg-[var(--bg-main)]/50 border border-[var(--border-color)]/60">
                <div className="flex items-center justify-between text-[var(--accent-primary)] font-bold">
                  <span className="flex items-center gap-1.5">
                    <Cpu size={13} />
                    <span>{t('telemetry.coreDomainTitle')}</span>
                  </span>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  {t('telemetry.coreDomainDesc')}
                </p>
              </div>
            </div>
          </div>

          {/* Footer metrics */}
          <div className="grid grid-cols-2 gap-3 pt-4 mt-4 border-t border-[var(--border-color)]">
            <div className="bg-[var(--bg-main)] p-2.5 rounded border border-[var(--border-color)] text-center">
              <div className="text-[9px] text-[var(--text-secondary)] uppercase">{t('telemetry.languagesLabel')}</div>
              <div className="text-[var(--text-primary)] font-bold mt-0.5">PT / EN / DE</div>
            </div>
            <div className="bg-[var(--bg-main)] p-2.5 rounded border border-[var(--border-color)] text-center">
              <div className="text-[9px] text-[var(--text-secondary)] uppercase">{t('telemetry.degreeLabel')}</div>
              <div className="text-[var(--text-primary)] font-bold mt-0.5">Software Eng.</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};