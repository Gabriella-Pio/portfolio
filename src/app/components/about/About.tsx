import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Briefcase } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import { ProfileImage } from '@/app/components/about/ProfileImage';

export const About: React.FC = () => {
  const { t } = useTranslation('about');

  return (
    <section
      id="about"
      className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-[var(--border-color)]"
    >
      {/* Cabeçalho da Seção */}
      <div className="flex items-center gap-3 mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
          {t('heading')}
        </h2>
        <span className="px-2 py-0.5 rounded bg-[var(--bg-surface)] text-[var(--text-secondary)] text-[10px] font-mono border border-[var(--border-color)]">
          {t('badge')}
        </span>
      </div>

      {/* Grid: Foto (2/5) e Bio (3/5) */}
      <div className="grid md:grid-cols-5 gap-12 items-start">

        {/* Foto de Perfil */}
        <div className="md:col-span-2 flex justify-center md:justify-start">
          <ProfileImage src="/profile.jpg" alt={t('imageAlt')} />
        </div>

        {/* Bio e Detalhes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="md:col-span-3 space-y-5"
        >
          {/* Parágrafo 1 com destaques via i18next Trans */}
          <p className="font-sans text-base leading-relaxed text-[var(--text-primary)]">
            <Trans
              i18nKey="bio.p1"
              ns="about"
              components={{
                highlight: <span className="text-[var(--accent-primary)] font-semibold" />,
              }}
            />
          </p>

          {/* Parágrafo 2 */}
          <p className="font-sans text-base leading-relaxed text-[var(--text-secondary)]">
            <Trans
              i18nKey="bio.p2"
              ns="about"
              components={{
                highlight: <span className="text-[var(--text-primary)] font-medium" />,
              }}
            />
          </p>

          {/* Parágrafo 3 */}
          <p className="font-sans text-base leading-relaxed text-[var(--text-secondary)]">
            {t('bio.p3')}
          </p>

          {/* Divisor */}
          <div className="pt-2 border-t border-[var(--border-color)]/60" />

          {/* Cards de Status / Informações em Estilo Terminal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Cargo Atual */}
            <div className="p-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)]/60 backdrop-blur-sm flex items-start gap-3">
              <Briefcase size={16} className="text-[var(--accent-secondary)] shrink-0 mt-0.5" />
              <div className="font-mono text-xs space-y-0.5">
                <span className="text-[10px] text-[var(--text-secondary)] uppercase block opacity-70">
                  {t('labels.currentRole')}
                </span>
                <span className="text-[var(--text-primary)] font-medium leading-tight block">
                  {t('currentRole')}
                </span>
              </div>
            </div>

            {/* Formação Acadêmica */}
            <div className="p-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)]/60 backdrop-blur-sm flex items-start gap-3">
              <BookOpen size={16} className="text-[var(--accent-primary)] shrink-0 mt-0.5" />
              <div className="font-mono text-xs space-y-0.5">
                <span className="text-[10px] text-[var(--text-secondary)] uppercase block opacity-70">
                  {t('labels.education')}
                </span>
                <span className="text-[var(--text-primary)] font-medium leading-tight block">
                  {t('currentlyPursuing')}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};