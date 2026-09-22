import React from 'react';
import { SiReact, SiTypescript, SiVite, SiAngular, SiTailwindcss, SiShadcnui, SiNextdotjs, SiDjango, SiSpringboot, SiNodedotjs, SiFastapi, SiPostgresql, SiMongodb, SiDocker, SiGithubactions, SiJavascript, SiPython, SiGithub, SiLinux } from 'react-icons/si';
import { FaAws, FaJava } from 'react-icons/fa6';
import { Cpu, Wrench } from 'lucide-react';

interface SkillIconProps {
  name: string;
  className?: string;
}

export const SkillIcon: React.FC<SkillIconProps> = ({ name, className = 'w-4 h-4' }) => {
  const iconMap: Record<string, React.ReactNode> = {
    'React': <SiReact className={className} />,
    'TypeScript': <SiTypescript className={className} />,
    'Vite': <SiVite className={className} />,
    'Angular': <SiAngular className={className} />,
    'Tailwind CSS': <SiTailwindcss className={className} />,
    'Next.js': <SiNextdotjs className={className} />,
    'shadcn/ui': <SiShadcnui className={className} />,

    'Django / DRF': <SiDjango className={className} />,
    'Spring Boot': <SiSpringboot className={className} />,
    'Node.js': <SiNodedotjs className={className} />,
    'FastAPI': <SiFastapi className={className} />,
    'PostgreSQL': <SiPostgresql className={className} />,
    'MongoDB': <SiMongodb className={className} />,

    'AWS': <FaAws className={className} />,
    'Docker': <SiDocker className={className} />,
    'CI/CD (GHCR)': <SiGithubactions className={className} />,

    'Java': <FaJava className={className} />,
    'JavaScript': <SiJavascript className={className} />,
    'Python': <SiPython className={className} />,
    'Git / GitHub': <SiGithub className={className} />,
    'Linux / Bash': <SiLinux className={className} />,

    'Zeiss Reverse Engineering': <Wrench className={className} />,
  };

  return <>{iconMap[name] || <Cpu className={className} />}</>;
};
