import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Certification } from '@/app/data/certifications';

interface CertListProps {
  certs: Certification[];
}

export const CertList: React.FC<CertListProps> = ({ certs }) => (
  <div className="border-l border-[var(--border-color)] pl-4 space-y-1.5 font-mono text-xs">
    {certs.map((cert) => (
      <div
        key={cert.id}
        className="
          group flex items-center justify-between gap-3 p-2 rounded-md
          hover:bg-[var(--bg-surface)]/80 transition-colors duration-200
        "
      >
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <span className="text-[var(--accent-primary)] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
          <span className="text-[var(--accent-primary)] font-medium shrink-0">{cert.institution}</span>
          <span className="text-[var(--border-color)]">::</span>
          <span className="text-[var(--text-primary)] truncate">{cert.name}</span>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-[var(--text-secondary)] text-[11px]">
          <span>{cert.year}</span>
          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent-primary)] transition-colors p-1"
              aria-label={`Ver credencial de ${cert.name}`}
            >
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    ))}
  </div>
);