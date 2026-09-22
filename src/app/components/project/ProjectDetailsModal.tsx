import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, Circle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Project } from '@/app/data/projects';

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  const { t } = useTranslation('projects');

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl bg-[var(--bg-main)]/90 backdrop-blur-2xl border border-[var(--accent-primary)]/30 rounded-2xl shadow-[0_0_60px_-15px_var(--accent-glow)] overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)] bg-[var(--bg-main)]/50">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                  {project.name}
                </h2>
                {project.liveUrl && (
                  <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-secondary)]/10 border border-[var(--accent-secondary)]/20">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-secondary)] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-secondary)]" />
                    </span>
                    <span className="text-[10px] font-mono text-[var(--accent-secondary)] tracking-wider font-bold">
                      {t('modal.livePreview')}
                    </span>
                  </div>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto p-6 md:p-8">
              <div className={`grid grid-cols-1 gap-8 md:gap-12 ${project.image ? 'lg:grid-cols-2' : ''}`}>
                {project.image && (
                  <div className="space-y-6">
                    <div className="aspect-video w-full rounded-xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-surface)] relative group">
                      <img
                        src={project.image}
                        alt={project.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-8">
                  <div>
                    <span className="text-xs font-mono text-[var(--text-secondary)] mb-3 block uppercase tracking-wider">
                      {t('techStack')}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 rounded-md text-xs font-mono bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--accent-primary)] shadow-[0_0_10px_-5px_var(--accent-glow)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.description && (
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                        <Circle
                          size={8}
                          className="text-[var(--accent-primary)] fill-[var(--accent-primary)]"
                        />
                        {t('modal.challenge')}
                      </h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed text-sm md:text-base">
                        {project.description}
                      </p>
                    </div>
                  )}

                  {project.architecture && (
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                        <Circle
                          size={8}
                          className="text-[var(--accent-primary)] fill-[var(--accent-primary)]"
                        />
                        {t('modal.architecture')}
                      </h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed text-sm md:text-base">
                        {project.architecture}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {(project.repoUrl || project.liveUrl) && (
              <div className="p-6 border-t border-[var(--border-color)] bg-[var(--bg-main)]/50 flex flex-col sm:flex-row gap-4 justify-end">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[var(--border-color)] hover:bg-[var(--bg-surface)] text-[var(--text-primary)] transition-all font-mono text-sm"
                  >
                    <Github size={16} />
                    <span>{t('modal.inspectCode')}</span>
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--accent-primary)] text-[var(--bg-main)] font-bold hover:opacity-90 transition-all font-mono text-sm shadow-[0_0_20px_-5px_var(--accent-glow)]"
                  >
                    <span>{t('modal.launchDemo')}</span>
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
