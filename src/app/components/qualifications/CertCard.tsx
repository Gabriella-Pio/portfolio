import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Certification } from '@/app/data/certifications';

interface CertCardProps {
  cert: Certification;
  index: number;
}

// Mapeamento de cores padronizado para instituições
const INSTITUTION_COLORS: Record<string, string> = {
  AWS: '#FF9900',
  Origamid: '#7C3AED',
  Alura: '#00C86F',
  Microsoft: '#00A4EF',
  DIO: '#E24329',
  SENAI: '#005CA9',
  ZEISS: '#002E6D',
};

export const CertCard: React.FC<CertCardProps> = ({ cert, index }) => {
  const { t } = useTranslation('qualifications');
  const accentColor = INSTITUTION_COLORS[cert.institution] ?? 'var(--accent-primary)';

  // Formatação do índice no formato ID // 01, 02...
  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="
        group relative flex flex-col justify-between
        p-5 rounded-xl border border-[var(--border-color)]
        bg-[var(--bg-surface)]/60 backdrop-blur-md
        hover:bg-[var(--bg-surface)]
        hover:border-[var(--accent-primary)]/60
        shadow-[var(--shadow-surface)]
        hover:shadow-[var(--shadow-hover)]
        transition-all duration-300
      "
    >
      {/* Barra superior com iluminação suave */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
      />

      {/* Top Header: CERT ID + Badge da Instituição */}
      <div>
        <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-[var(--text-secondary)]">
          <span className="opacity-70 group-hover:text-[var(--accent-primary)] transition-colors">
            CERT_ID // {formattedIndex}
          </span>
          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: accentColor }}
            />
            <span className="opacity-60">{cert.year}</span>
          </div>
        </div>

        {/* Tag da Instituição + Ícone */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-current/25 tracking-wide"
            style={{ color: accentColor, backgroundColor: `${accentColor}12` }}
          >
            {cert.institution}
          </span>
          <ShieldCheck
            size={15}
            className="text-[var(--text-secondary)] opacity-30 group-hover:opacity-90 group-hover:text-[var(--accent-primary)] transition-all duration-300"
          />
        </div>

        {/* Título / Nome do Certificado */}
        <h3 className="font-sans font-bold text-sm text-[var(--text-primary)] leading-snug group-hover:text-[var(--text-primary)] transition-colors">
          {cert.name}
        </h3>
      </div>

      {/* Footer: Credencial / Botão de Verificação */}
      <div className="flex items-center justify-between mt-5 pt-3 border-t border-[var(--border-color)]/50">
        <span className="font-mono text-[10px] text-[var(--text-secondary)] opacity-70 group-hover:opacity-100 transition-opacity">
          VERIFIED_RECORD
        </span>

        {cert.credentialUrl ? (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver credencial de ${cert.name}`}
            className="
              inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold
              px-2.5 py-1 rounded bg-[var(--bg-main)]
              border border-[var(--border-color)]
              text-[var(--text-secondary)]
              hover:text-[var(--accent-primary)]
              hover:border-[var(--accent-primary)]/60
              hover:shadow-[0_0_10px_var(--accent-glow)]
              transition-all duration-200
            "
          >
            <span>{t('verify', 'VERIFICAÇÃO')}</span>
            <ExternalLink size={11} className="shrink-0" />
          </a>
        ) : (
          <span className="font-mono text-[10px] text-[var(--text-secondary)] opacity-40">
            N/A
          </span>
        )}
      </div>
    </motion.div>
  );
};