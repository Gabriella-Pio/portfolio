export interface GardenNote {
  id: number;
  date: string;
  title: string;
  category: string;
  hash: string;
  tag: string;
  body: string;
  repoUrl?: string;
}

export const OLDER_LOGS_URL = 'https://github.com/orgs/college-soft-eng-repos/repositories';

export const gardenNotes: GardenNote[] = [
  {
    id: 1,
    date: 'Aug 18, 2026',
    title: 'Mobile map of a community food bank',
    category: 'Mobile',
    hash: '3d9b12',
    tag: 'TypeScript',
    repoUrl: 'https://github.com/college-soft-eng-repos/instituto-mao-amiga',
    body: `Construção de Software II is supposed to produce a "mobile app". The useful version of that brief is a map of collection and distribution points for Instituto Mão Amiga — a community food bank that needs visibility in the field, not another in-memory CRUD.

The point of the repo is the product constraint: people need to find where to drop off or pick up food. Screens follow that job. The stack is TypeScript on the college org; the design problem is more interesting than the framework choice.

I am treating this as field software, not a classroom clone of a todo list.`,
  },
  {
    id: 2,
    date: 'Aug 16, 2026',
    title: 'Parsing ZEISS CALYPSO PDFs into a versioned report pipeline',
    category: 'Architecture',
    hash: 'a1c4e8',
    tag: 'Python',
    repoUrl: 'https://github.com/Gabriella-Pio/pos-processador-metrologia',
    body: `The SENAI ZEISS challenge is a 15-day sprint with a real artifact: take a CALYPSO PDF from a CMM and emit a report a metrologist can actually hand to a client.

The codebase is split the way a desktop product should be — domain, application, infrastructure — so the parser, the ReportLab generator and the SQLite history are not tangled into the PyQt windows. PyMuPDF reads the source; a schema holds measurements; export is a separate use case, including batch.

Checkpoint 1 was architecture and a working PDF read. Checkpoint 2 froze new features. Day 15 is bugs, tests and a 10-minute demo. That calendar is the design constraint, not a decoration.`,
  },
  {
    id: 3,
    date: 'May 23, 2026',
    title: 'GCS on a Spring + Angular library',
    category: 'Quality',
    hash: 'b4c811',
    tag: 'Java',
    repoUrl: 'https://github.com/college-soft-eng-repos/my-library',
    body: `MyLibrary is the SENAI GCS (software quality) exercise: Spring Boot 3, JPA, DTOs and a service layer on one side; Angular 17 with reactive forms and a dashboard on the other.

The assignment is not "make a library screen". It is to put layers, tests and a predictable API between the UI and the database so the thing can be graded as engineering, not as a demo.

H2 keeps the local loop small. The interesting part is the discipline of DTOs and a service layer instead of leaking entities into the controller.`,
  },
  {
    id: 4,
    date: 'May 8, 2026',
    title: 'Server Actions, Hygraph, and 429 backoff',
    category: 'Web',
    hash: '7e2f90',
    tag: 'Next.js',
    repoUrl: 'https://github.com/Gabriella-Pio/portfolio-jessica',
    body: `The Jessica Aurora site is a production Next.js 15 app: no pages/api folder for newsletter or comments. Server Actions talk to Brevo and Hygraph directly.

Hygraph rate-limits during static generation. The GraphQL client retries 429s with exponential backoff and jitter so a build does not die on a burst of requests. Comments are sanitized and run through a PT-BR profanity filter before they hit the CMS.

That is the difference between a brochure and a site that has to stay up with a real client.`,
  },
  {
    id: 5,
    date: 'Apr 29, 2026',
    title: 'First GitHub Actions pipeline that actually gates a push',
    category: 'DevOps',
    hash: '5a0d33',
    tag: 'CI',
    repoUrl: 'https://github.com/college-soft-eng-repos/meu-projeto-ci',
    body: `meu-projeto-ci is a hello-world on purpose. The artifact that matters is the workflow: tests run on every push, the badge is honest, and a red X is allowed to block the branch.

The lesson is the habit, not the JavaScript. Once a pipeline exists, adding Docker, GHCR or a real test suite is a diff — not a new religion.

College CI homework is easy to fake with a screenshot. A public Actions run is not.`,
  },
];
