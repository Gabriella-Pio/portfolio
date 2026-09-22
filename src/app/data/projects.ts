export interface Project {
  id: number;
  name: string;
  domain: string;
  stack: string[];
  year: string;
  status: string;
  color: string;
  description?: string;
  architecture?: string;
  liveUrl?: string;
  repoUrl?: string;
  image?: string;
}

/**
 * Static portfolio project data.
 * Content is kept in English as the industry standard for technical portfolios.
 */
export const projects: Project[] = [
  {
    id: 1,
    name: 'Metrology Report Pipeline',
    domain: 'Industrial / Desktop',
    stack: ['Python', 'PyQt6', 'PyMuPDF', 'ReportLab', 'SQLite'],
    year: '2026',
    status: 'Production',
    color: '#00F0FF',
    repoUrl: 'https://github.com/Gabriella-Pio/pos-processador-metrologia',
    description:
      'Desktop tool built for the SENAI ZEISS technical challenge: turn raw CALYPSO PDFs from ZEISS equipment into a clear, traceable, versioned professional report.',
    architecture:
      'Hexagonal layout — domain, application and infrastructure layers. PyMuPDF extracts measurement data into a typed schema; ReportLab generates the enriched PDF; SQLite stores export history. UI is PyQt6 with a three-step project wizard, split workspace (preview + section editor) and batch export.',
  },
  {
    id: 2,
    name: 'Jessica Aurora — Clinical Psychology',
    domain: 'Client / Web',
    stack: ['Next.js 15', 'Tailwind', 'Hygraph', 'Motion', 'Brevo'],
    year: '2026',
    status: 'Production',
    color: '#7C3AED',
    liveUrl: 'https://www.psicologajessicaaurora.com.br/',
    repoUrl: 'https://github.com/Gabriella-Pio/portfolio-jessica',
    description:
      'Production site for a clinical psychologist: content-driven pages, newsletter, and comments, with accessibility and a calm visual language.',
    architecture:
      'Next.js App Router with Server Actions instead of classic API routes. Hygraph as headless CMS; Brevo for newsletter. Custom GraphQL client retries 429s with exponential backoff. Comment pipeline sanitizes HTML and filters profanity before persist.',
  },
  {
    id: 3,
    name: 'Jessica & Lucas',
    domain: 'Event / Web',
    stack: ['Netlify'],
    year: '2026',
    status: 'Production',
    color: '#F472B6',
    liveUrl: 'https://jessicaelucas.netlify.app/',
    description:
      'Event site for a housewarming / wedding gathering — a private guest space with RSVP-style participation, live on Netlify.',
    architecture:
      'Static frontend hosted on Netlify. Source repository is private; the public surface is the live site.',
  },
  {
    id: 4,
    name: 'Bikcraft',
    domain: 'E-commerce / Study',
    stack: ['HTML', 'CSS', 'JavaScript'],
    year: '2025',
    status: 'Production',
    color: '#FFD600',
    liveUrl: 'https://gabriella-pio.github.io/bikcraft/',
    repoUrl: 'https://github.com/Gabriella-Pio/bikcraft',
    description:
      'Fictional handmade e-bike store from the Origamid course — catalog, insurance pages and a quote form, with a modular CSS architecture and responsive layouts.',
    architecture:
      'Semantic HTML5 with CSS split by context (global, page, component, utilities). Flexbox and Grid for layout. Small JS layer for interaction and a lightweight animation plugin. Deployed on GitHub Pages.',
  },
];
