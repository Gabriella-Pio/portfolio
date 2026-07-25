import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Github, Circle } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface Project {
  id: number;
  name: string;
  domain: string;
  stack: string[];
  year: string;
  status: string;
  image: string;
  color: string;
  description?: string;
  architecture?: string;
  liveUrl?: string;
  repoUrl?: string;
}

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export const ProjectDetailsModal: React.FC<
  ProjectDetailsModalProps
> = ({ isOpen, onClose, project }) => {
  const { t } = useTranslation('projects');

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl bg-[var(--bg-main)]/90 backdrop-blur-2xl border border-[var(--accent-primary)]/30 rounded-2xl shadow-[0_0_60px_-15px_var(--accent-glow)] overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)] bg-[var(--bg-main)]/50">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                  {project.name}
                </h2>
                <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-secondary)]/10 border border-[var(--accent-secondary)]/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-secondary)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-secondary)]"></span>
                  </span>
                  <span className="text-[10px] font-mono text-[var(--accent-secondary)] tracking-wider font-bold">
                    {t('modal.livePreview')}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                {/* Left Column: Media */}
                <div className="space-y-6">
                  <div className="aspect-video w-full rounded-xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-surface)] relative group">
                    <img
                      src={project.image}
                      alt={project.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <span className="font-mono text-xs text-[var(--accent-primary)]">
                        media_asset_01.jpg
                      </span>
                    </div>
                  </div>

                  {/* Gallery Thumbs (Visual filler) */}
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="aspect-video rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] opacity-50 hover:opacity-100 hover:border-[var(--accent-primary)]/50 transition-all cursor-pointer"
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Right Column: The Logic */}
                <div className="space-y-8">
                  {/* Tags */}
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

                  {/* The Challenge */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                      <Circle
                        size={8}
                        className="text-[var(--accent-primary)] fill-[var(--accent-primary)]"
                      />
                      {t('modal.challenge')}
                    </h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed text-sm md:text-base">
                      {project.description ||
                        "The client required a high-performance headless commerce solution capable of handling 50k+ SKUs with sub-second page loads. The existing monolithic architecture was causing significant downtime during high-traffic events."}
                    </p>
                  </div>

                  {/* System Architecture */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                      <Circle
                        size={8}
                        className="text-[var(--accent-primary)] fill-[var(--accent-primary)]"
                      />
                      {t('modal.architecture')}
                    </h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed text-sm md:text-base">
                      {project.architecture ||
                        "Implemented a Next.js frontend with Incremental Static Regeneration (ISR) hosted on Vercel Edge Network. The backend utilizes a federated GraphQL layer specifically designed to cache inventory states in Redis, reducing database load by 85%."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-[var(--border-color)] bg-[var(--bg-main)]/50 flex flex-col sm:flex-row gap-4 justify-end">
              <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[var(--border-color)] hover:bg-[var(--bg-surface)] text-[var(--text-primary)] transition-all font-mono text-sm group">
                <Github size={16} />
                <span>{t('modal.inspectCode')}</span>
              </button>

              <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--accent-primary)] text-[var(--bg-main)] font-bold hover:opacity-90 transition-all font-mono text-sm shadow-[0_0_20px_-5px_var(--accent-glow)]">
                <span>{t('modal.launchDemo')}</span>
                <ExternalLink size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};