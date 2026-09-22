import React from 'react';
import { motion } from 'motion/react';

interface ProfileImageProps {
  src: string;
  alt: string;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({ src, alt }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="relative w-full max-w-[280px] mx-auto md:mx-0"
  >
    {/* Accent corner decoration */}
    <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[var(--accent-primary)] rounded-tl-sm" />
    <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-[var(--accent-primary)] rounded-br-sm" />

    <div className="overflow-hidden rounded-xl border border-[var(--accent-primary)]/30 shadow-[var(--shadow-surface)] transition-transform duration-500 hover:scale-[1.02] hover:shadow-[var(--shadow-hover)]">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover aspect-[3/4]"
      />
    </div>
  </motion.div>
);
