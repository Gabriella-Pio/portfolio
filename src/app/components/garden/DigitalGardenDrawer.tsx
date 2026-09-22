import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, ArrowRight, Share2, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import { GardenNote } from '@/app/data/garden';

interface DigitalGardenDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  note: GardenNote | null;
}

export const DigitalGardenDrawer: React.FC<DigitalGardenDrawerProps> = ({ isOpen, onClose, note }) => {
  const { t } = useTranslation('garden');
  const { theme } = useAccessibility();
  const [copied, setCopied] = useState(false);

  if (!note) return null;

  const paragraphs = note.body.split('\n\n').filter(Boolean);

  const handleShare = () => {
    if (!note.repoUrl) return;
    void navigator.clipboard.writeText(note.repoUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={`fixed inset-0 z-[100] backdrop-blur-[2px] ${
              theme === 'dark' ? 'bg-black/40' : 'bg-slate-900/20'
            }`}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[101] w-full md:w-[40%] bg-[var(--bg-surface)] border-l border-[var(--accent-primary)] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[var(--accent-primary)] border border-[var(--accent-primary)] px-2 py-0.5 rounded bg-[var(--accent-primary)]/10">
                    {note.tag}
                  </span>
                  <span className="font-mono text-xs text-[var(--text-secondary)] flex items-center gap-1">
                    <Calendar size={12} />
                    {note.date}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] leading-tight">
                  {note.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-[var(--bg-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              <div className="space-y-4">
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-[var(--text-secondary)] leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {note.repoUrl && (
              <div className="p-6 border-t border-[var(--border-color)] bg-[var(--bg-surface)] flex items-center justify-between">
                <button
                  onClick={handleShare}
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2"
                >
                  {copied ? <Check size={16} /> : <Share2 size={16} />}
                  <span className="text-sm font-medium">{copied ? t('drawer.copied') : t('drawer.share')}</span>
                </button>

                <a
                  href={note.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--accent-primary)] text-[var(--bg-main)] rounded-md font-bold text-sm hover:opacity-90 transition-opacity"
                >
                  <span>{t('drawer.readFull')}</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
