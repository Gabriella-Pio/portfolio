import React, { useState } from 'react';
import { GitCommit, GitPullRequest } from 'lucide-react';
import { DigitalGardenDrawer } from '@/app/components/DigitalGardenDrawer';
import { useTranslation } from 'react-i18next';

const logs = [
  { 
    id: 1, 
    date: 'Feb 02, 2026', 
    title: 'Optimizing React 19 Server Actions', 
    category: 'Performance',
    hash: '8f3a2c',
    tag: 'React'
  },
  { 
    id: 2, 
    date: 'Jan 28, 2026', 
    title: 'Exploring 3D Physics in R3F', 
    category: '3D/WebGL',
    hash: '2b4e5d',
    tag: 'Three.js'
  },
  { 
    id: 3, 
    date: 'Jan 15, 2026', 
    title: 'System Design: Microservices Patterns', 
    category: 'Architecture',
    hash: '9c1d4a',
    tag: 'System'
  },
];

export const DigitalGarden: React.FC = () => {
  const [selectedNote, setSelectedNote] = useState<typeof logs[0] | null>(null);
  const { t } = useTranslation('garden');

  return (
    <section id="notes" className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-[var(--border-color)]">
      <div className="flex items-center gap-3 mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] tracking-tight">{t('heading')}</h2>
        <span className="px-2 py-0.5 rounded bg-[var(--bg-surface)] text-[var(--text-secondary)] text-[10px] font-mono border border-[var(--border-color)]">
          master • origin/main
        </span>
      </div>

      <div className="relative pl-2">
        {/* Continuous Vertical Line */}
        <div className="absolute left-[19px] top-2 bottom-6 w-px bg-[var(--border-color)]"></div>

        <div className="space-y-8">
          {logs.map((log) => (
            <div 
              key={log.id} 
              onClick={() => setSelectedNote(log)}
              className="relative flex items-start gap-4 group cursor-pointer"
            >
              {/* Left: Commit Icon */}
              <div className="relative z-10 mt-1.5 p-1 bg-[var(--bg-main)] rounded-full border border-[var(--border-color)] group-hover:border-[var(--accent-primary)] group-hover:shadow-[0_0_10px_var(--accent-glow)] transition-all duration-300">
                <GitCommit size={14} className="text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors" />
              </div>

              {/* Content Area */}
              <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-2 p-3 -mt-2 rounded-lg hover:bg-[var(--bg-surface)]/50 border border-transparent hover:border-[var(--border-color)] transition-all">
                
                {/* Middle: Title + Meta */}
                <div className="space-y-1">
                  <h3 className="text-base font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                    {log.title}
                  </h3>
                  <div className="flex items-center gap-3 font-mono text-xs text-[var(--text-secondary)]">
                    <span>{log.date}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                    <span>{t('category', { category: log.category })}</span>
                  </div>
                </div>

                {/* Right: Commit Hash */}
                <div className="mt-2 md:mt-0">
                  <span className="font-mono text-[10px] text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 px-3 py-1 rounded-full border border-[var(--accent-primary)]/20 group-hover:bg-[var(--accent-primary)] group-hover:text-[var(--bg-main)] transition-colors font-bold">
                    {log.hash}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Footer of the log */}
          <div className="relative flex items-center gap-4 pt-2">
             <div className="relative z-10 p-1 bg-[var(--bg-main)]">
                <div className="w-4 h-4 rounded-full border border-[var(--border-color)] flex items-center justify-center">
                  <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                </div>
             </div>
             <button className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--accent-primary)] cursor-pointer transition-colors">
                <GitPullRequest size={14} />
                <span>{t('olderLogs')}</span>
             </button>
          </div>
        </div>
      </div>

      <DigitalGardenDrawer 
        isOpen={!!selectedNote} 
        onClose={() => setSelectedNote(null)} 
        note={selectedNote} 
      />
    </section>
  );
};
