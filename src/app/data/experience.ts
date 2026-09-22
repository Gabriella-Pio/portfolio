export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  current: boolean;
  description: string;
  highlights: string[];
  stack: string[];
}

/**
 * Work experience data — most recent first.
 * description: one-line summary (shown on the card)
 * highlights: key bullet points (shown on expand — future feature)
 * Keep content in English — intentionally not translated.
 */
export const experiences: Experience[] = [
  {
    id: 1,
    role: 'Software Development & Metrology Intern',
    company: 'SENAI ZEISS Center of Excellence',
    period: 'Feb 2026 – present',
    current: true,
    description:
      'Selected among candidates from 3 SENAI units as one of 5 participants in the SENAI ZEISS Program, competing for 2 internship placements in Oberkochen, Germany.',
    highlights: [
      'International Excellence Program: Selected among the top 5 interns in an exclusive SENAI ZEISS partnership initiative.',
      'Precision Metrology: Conducted reverse engineering and quality control using CMMs (ZEISS Duramax, Prismo, O-Inspect), NDT systems (Bosello), and 3D scanners (ATOS Q, T-SCAN).',
      'Software Proposal: Designed and prototyped a web-based corporate platform for the laboratory to enhance client acquisition and digital presence.',
      'Technical Deliverables in German: Solved engineering challenges using lab equipment and delivered technical presentations in German.',
    ],
    stack: ['CMM / Metrology', '3D Scanning', 'German', 'Web Development', 'PoC'],
  },
  {
    id: 2,
    role: 'Full-Stack Developer',
    company: 'Faculdade SENAI Fatesg',
    period: 'Jul 2025 – Jan 2026',
    current: false,
    description:
      'Engineered a full-stack AI-powered PropTech platform, approved in the Finep/2024 B+P Smart Factory Call, delivering end-to-end from UI to CI/CD pipelines.',
    highlights: [
      'Full-Stack Development: Built responsive UIs with React and Vite; developed REST APIs and business logic with Django and DRF.',
      'DevOps & CI/CD: Standardized environments with Docker; implemented automated pipelines with GHCR.',
      'Agile Execution: Active participation in Scrum ceremonies (sprint planning, refinements, and reviews).',
    ],
    stack: ['React', 'Vite', 'Django', 'DRF', 'Docker', 'CI/CD', 'GHCR', 'REST APIs', 'Scrum'],
  },
  {
    id: 3,
    role: 'Technical Support Intern',
    company: 'Soluti Digital',
    period: 'Nov 2024 – May 2025',
    current: false,
    description:
      'Provided multi-platform technical support for B2C clients, handling digital certificate issuances, driver installations, and remote diagnostics.',
    highlights: [
      'Cross-Platform Support: Troubleshot driver installations, system dependencies, and certificate issuances on Windows, Linux, and macOS.',
      'Remote Diagnostics: Conducted secure remote sessions for video-conferencing identity verification and certificate deployment.',
      'Client Communication: Guided non-technical users through setup procedures with high satisfaction rates.',
    ],
    stack: ['Windows', 'Linux', 'macOS', 'Remote Support', 'Digital Certificates'],
  },
];
