import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Tag, ArrowRight, Share2, Copy } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Note {
  id: number;
  date: string;
  title: string;
  tag: string;
  hash: string;
}

interface DigitalGardenDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note | null;
}

export const DigitalGardenDrawer: React.FC<DigitalGardenDrawerProps> = ({ isOpen, onClose, note }) => {
  const { t } = useTranslation('garden');

  if (!note) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-[2px]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[101] w-full md:w-[40%] bg-[var(--bg-surface)] border-l border-[var(--accent-primary)] shadow-2xl flex flex-col"
          >
            {/* Header */}
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

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              
              {/* Fake Markdown Content */}
              <div className="prose prose-invert max-w-none">
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  React 19 introduces <span className="text-[var(--text-primary)] font-medium">Server Actions</span>, a paradigm shift in how we handle data mutations. Instead of creating API endpoints for every interaction, we can now call functions that run exclusively on the server, directly from our components.
                </p>

                <h3 className="text-lg font-bold text-[var(--text-primary)] mt-6 mb-3">The Problem with API Routes</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Traditional API routes require context switching. You define the logic in one file, the fetch call in another, and state management in a third. This separation of concerns, while useful, often leads to boilerplate fatigue.
                </p>

                {/* Code Block */}
                <div className="mt-6 mb-6 rounded-lg overflow-hidden border border-[var(--border-color)] bg-[#0d1117]">
                  <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[var(--border-color)]">
                    <span className="text-xs font-mono text-gray-400">actions.ts</span>
                    <Copy size={12} className="text-gray-500 hover:text-white cursor-pointer" />
                  </div>
                  <div className="p-4 font-mono text-xs md:text-sm overflow-x-auto text-gray-300">
                    <div className="flex">
                      <span className="text-purple-400 mr-2">async</span>
                      <span className="text-purple-400 mr-2">function</span>
                      <span className="text-blue-400">createPost</span>
                      <span className="text-gray-400">(formData)</span>
                      <span className="text-gray-400">{' {'}</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-purple-400">"use server"</span><span className="text-gray-400">;</span>
                    </div>
                    <div className="pl-4 mt-1">
                      <span className="text-purple-400">const</span>
                      <span className="text-blue-200 ml-2">title</span>
                      <span className="text-gray-400 ml-2">=</span>
                      <span className="text-blue-200 ml-2">formData</span>
                      <span className="text-gray-400">.</span>
                      <span className="text-yellow-200">get</span>
                      <span className="text-gray-400">('title');</span>
                    </div>
                    <div className="pl-4 mt-1">
                      <span className="text-purple-400">await</span>
                      <span className="text-blue-200 ml-2">db</span>
                      <span className="text-gray-400">.</span>
                      <span className="text-yellow-200">posts</span>
                      <span className="text-gray-400">.</span>
                      <span className="text-yellow-200">create</span>
                      <span className="text-gray-400">({'{'} title {'}'});</span>
                    </div>
                    <div>
                      <span className="text-gray-400">{'}'}</span>
                    </div>
                  </div>
                </div>

                 <p className="text-[var(--text-secondary)] leading-relaxed">
                  By marking the function with <code className="bg-[var(--bg-main)] px-1.5 py-0.5 rounded border border-[var(--border-color)] text-[var(--accent-primary)] font-mono text-xs">"use server"</code>, Next.js automatically creates a closure that can be invoked from the client, handling serialization and network transport transparently.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[var(--border-color)] bg-[var(--bg-surface)] flex items-center justify-between">
              <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2">
                <Share2 size={16} />
                <span className="text-sm font-medium">{t('drawer.share')}</span>
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-[var(--accent-primary)] text-[var(--bg-main)] rounded-md font-bold text-sm hover:opacity-90 transition-opacity">
                <span>{t('drawer.readFull')}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
