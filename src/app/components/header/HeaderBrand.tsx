import React from 'react';

export const HeaderBrand: React.FC = () => {
  return (
    <div className="font-mono text-[var(--text-primary)] text-sm tracking-tighter flex items-center gap-2">
      <div className="w-2 h-2 bg-[var(--accent-primary)] rounded-full shadow-[0_0_8px_var(--accent-glow)]"></div>
      <span>
        GABRIELLA<span className="text-[var(--accent-primary)]">.SYS</span>
      </span>
    </div>
  );
};
