import React from 'react';
import { motion } from 'motion/react';
import { Activity, Server, Cpu } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Hero: React.FC = () => {
  const { t } = useTranslation('hero');

  return (
    <section className="pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <div className="font-mono text-xs text-[var(--text-secondary)] mb-8 flex items-center gap-2">
        <span className="text-[var(--accent-primary)]">root</span>
        <span className="text-[var(--border-color)]">/</span>
        <span>home</span>
        <span className="text-[var(--border-color)]">/</span>
        <span className="text-[var(--text-secondary)]">readme.md</span>
      </div>

      <div className="grid md:grid-cols-3 gap-12 items-start">
        <div className="md:col-span-2">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-bold text-[var(--text-primary)] tracking-tighter mb-8 leading-[1.1]"
          >
            {t('title.line1')} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-secondary)] to-[var(--text-primary)] opacity-70">&</span> {t('title.line2')}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="font-mono text-sm space-y-4 text-[var(--text-secondary)]"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-md shadow-lg shadow-[var(--accent-secondary)]/5">
              <span className="text-[var(--accent-secondary)] animate-pulse">●</span>
              <span className="text-[var(--accent-secondary)] font-bold tracking-wider">{t('status')}</span>
            </div>
            
            <div className="border-l border-[var(--border-color)] pl-6 py-2 space-y-2">
               <div className="flex items-center gap-3">
                <span className="text-[var(--accent-primary)] w-24 opacity-70">{t('operations.currentOp')}</span>
                <span className="text-[var(--text-primary)]">{t('operations.available')}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[var(--accent-primary)] w-24 opacity-70">{t('operations.protocol')}</span>
                <span className="text-[var(--text-primary)]">REACT, NODE, PYTHON, R3F</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Abstract System Stats / Decoration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="hidden md:block bg-[var(--bg-surface)]/50 backdrop-blur-sm border border-[var(--border-color)] p-6 rounded-xl font-mono text-xs text-[var(--text-secondary)] shadow-xl"
        >
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-[var(--border-color)]">
            <span className="text-[var(--accent-primary)]">{t('metrics.title')}</span>
            <Activity size={14} className="text-[var(--accent-primary)]" />
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>{t('metrics.uptime')}</span>
                <span className="text-[var(--accent-secondary)]">99.98%</span>
              </div>
              <div className="h-1 w-full bg-[var(--bg-main)] rounded overflow-hidden">
                <div className="h-full bg-[var(--accent-secondary)] w-[99.98%] shadow-[0_0_8px_var(--accent-secondary)]"></div>
              </div>
            </div>
            
             <div className="space-y-2">
              <div className="flex justify-between">
                <span>{t('metrics.cpuLoad')}</span>
                <span className="text-[#FFD600]">42%</span>
              </div>
              <div className="h-1 w-full bg-[var(--bg-main)] rounded overflow-hidden">
                <div className="h-full bg-[#FFD600] w-[42%] shadow-[0_0_8px_#FFD600]"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--border-color)]">
              <div className="bg-[var(--bg-main)] p-3 rounded border border-[var(--border-color)] text-center">
                 <Server size={16} className="mx-auto mb-2 text-[var(--text-secondary)]" />
                 <div className="text-[10px] text-[var(--text-secondary)]">{t('metrics.nodes')}</div>
                 <div className="text-[var(--text-primary)] font-bold">12</div>
              </div>
               <div className="bg-[var(--bg-main)] p-3 rounded border border-[var(--border-color)] text-center">
                 <Cpu size={16} className="mx-auto mb-2 text-[var(--text-secondary)]" />
                 <div className="text-[10px] text-[var(--text-secondary)]">{t('metrics.cores')}</div>
                 <div className="text-[var(--text-primary)] font-bold">8</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
