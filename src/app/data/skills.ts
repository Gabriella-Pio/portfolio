export type SkillCategory = 'frontend' | 'backend' | 'cloud' | 'tools' | 'metrology';

export interface Skill {
  name: string;
  category: SkillCategory;
  tag?: string; // Opcional: ex "Primary", "PoC", "Hardware"
}

export const skills: Skill[] = [
  // Frontend
  { name: 'React', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'Vite', category: 'frontend' },
  { name: 'Angular', category: 'frontend'},
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'shadcn/ui', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },

  // Backend
  { name: 'Django / DRF', category: 'backend' },
  { name: 'Spring Boot', category: 'backend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'FastAPI', category: 'backend' },
  { name: 'PostgreSQL', category: 'backend' },
  { name: 'MongoDB', category: 'backend' },

  // Cloud & DevOps
  { name: 'Docker', category: 'cloud' },
  { name: 'CI/CD (GHCR)', category: 'cloud' },
  { name: 'AWS', category: 'cloud' },

  // Tools & Languages
  { name: 'Java', category: 'tools' },
  { name: 'JavaScript', category: 'tools'},
  { name: 'Python', category: 'tools'},
  { name: 'Git / GitHub', category: 'tools' },
  { name: 'Linux / Bash', category: 'tools' },

  // 3D & Industrial Metrology
  { name: 'Duramax', category: 'metrology', tag: 'CMM' },
  { name: 'O-Inspect', category: 'metrology', tag: 'CMM' },
  { name: 'Prismo', category: 'metrology', tag: 'CMM' },
  { name: 'Atos Q', category: 'metrology', tag: 'Scanning' },
  { name: 'T-Scan', category: 'metrology', tag: 'Scanning' },
  { name: 'Zeiss Reverse Engineering', category: 'metrology', tag: 'Software' },
];