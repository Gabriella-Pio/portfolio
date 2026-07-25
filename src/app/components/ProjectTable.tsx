import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Box } from 'lucide-react';
import { ProjectDetailsModal, Project } from '@/app/components/ProjectDetailsModal';
import { projects } from '@/app/data/projects';
import { useTranslation } from 'react-i18next';

export const ProjectTable: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { t } = useTranslation('projects');

  return (
    <section id="projects" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-10 border-b border-[var(--border-color)] pb-4">
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2 tracking-tight">{t('heading')}</h2>
          <p className="font-mono text-xs text-[var(--text-secondary)]">
            {t('subheading')}
          </p>
        </div>
        <div className="font-mono text-xs text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 px-2 py-1 rounded border border-[var(--accent-primary)]/20">
          {t('totalRecords', { count: projects.length })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <motion.button
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.01 }}
            onClick={() => setSelectedProject(project)}
            className="group relative bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl overflow-hidden hover:border-[var(--accent-primary)]/50 transition-all duration-300 hover:shadow-[0_0_30px_-10px_var(--accent-glow)] cursor-pointer text-left w-full focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-main)]"
          >
            {/* Header */}
            <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-start bg-[var(--bg-main)]/50">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] group-hover:border-[var(--accent-primary)]/30 transition-colors">
                  <Box size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">{project.name}</h3>
                  <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider">ID: 0{project.id} // {t(`status.${project.status}`, project.status)}</span>
                </div>
              </div>
              <ArrowUpRight className="text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors" />
            </div>

            {/* Content / Tech Sheet */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-[var(--text-secondary)] block mb-1">{t('domain')}</span>
                  <span className="text-[var(--text-primary)] opacity-80">{project.domain}</span>
                </div>
                <div>
                  <span className="text-[var(--text-secondary)] block mb-1">{t('year')}</span>
                  <span className="text-[var(--text-primary)] opacity-80">{project.year}</span>
                </div>
              </div>

              {/* Badges */}
              <div>
                <span className="text-[10px] font-mono text-[var(--text-secondary)] block mb-2 uppercase">{t('techStack')}</span>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map(tech => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded text-[10px] font-mono bg-transparent border transition-colors"
                      style={{
                        borderColor: `${project.color}40`,
                        color: project.color,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Hover Image Overlay (Subtle) */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none">
              <div className="w-full h-full bg-gradient-to-bl from-[var(--accent-primary)] to-transparent"></div>
            </div>

            {/* Bottom Line */}
            <div className="absolute bottom-0 left-0 h-[1px] bg-[var(--accent-primary)] w-0 group-hover:w-full transition-all duration-500"></div>
          </motion.button>
        ))}
      </div>

      <ProjectDetailsModal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        project={selectedProject} 
      />
    </section>
  );
};
