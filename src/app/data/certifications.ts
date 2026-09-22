export interface Certification {
  id: number;
  name: string;
  institution: string;
  year: string;
  /** true → large CertCard; false → compact CertList row */
  featured: boolean;
  credentialUrl?: string;
}

/**
 * Certifications data.
 * featured: true  → displayed as a prominent card
 * featured: false → displayed in the compact "Also completed" list
 *
 * Replace placeholder names/urls with your real credential info.
 */
export const certifications: Certification[] = [
  {
    id: 1,
    name: 'AWS Cloud Quest: Generative AI Practitioner - Training Badge',
    institution: 'AWS',
    year: '2026',
    featured: true,
    credentialUrl: 'https://www.credly.com/badges/91007938-2025-42eb-9247-8b210fc880fe/public_url',
  },
  {
    id: 2,
    name: 'AWS Academy Graduate - Generative AI Foundations - Training Badge',
    institution: 'AWS',
    year: '2026',
    featured: true,
    credentialUrl: 'https://www.credly.com/badges/400a704d-55b5-440a-a5bc-0c0c83bb27a3/linked_in_profile',
  },
  {
    id: 3,
    name: 'AWS Academy Graduate - Cloud Foundations - Training Badge',
    institution: 'AWS',
    year: '2025',
    featured: true,
    credentialUrl: 'https://www.credly.com/badges/2961952b-30af-4260-bad5-c57b50b11232/linked_in_profile',
  },
  {
    id: 4,
    name: 'HTML e CSS para Iniciantes',
    institution: 'Origamid',
    year: '2025',
    featured: true,
    credentialUrl: 'https://www.origamid.com/certificate/e3bc2651',
  },

  // ── Also completed
  { id: 5,  name: 'Imersão Frontend 2° Edição',              institution: 'Alura',       year: '2025', featured: false },
  { id: 6,  name: 'Introdução ao Git',      institution: 'Microsoft Learn',         year: '2024', featured: false },
  { id: 7,  name: 'Imersão Python: do Excel à Análise de Dados',           institution: 'Alura',         year: '2024', featured: false },
  { id: 8,  name: 'Formação Github Certification',         institution: 'DIO',       year: '2024', featured: false },
];
