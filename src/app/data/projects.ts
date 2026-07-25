import { Project } from '@/app/components/ProjectDetailsModal';

/**
 * Static portfolio project data.
 *
 * When migrating to a CMS or API, replace this array with a fetch call
 * and update ProjectTable to handle async loading state accordingly.
 */
export const projects: Project[] = [
  {
    id: 1,
    name: 'System Archipelago',
    domain: 'OS / Interface',
    stack: ['React', 'Three.js', 'WebGL'],
    year: '2025',
    status: 'Stable',
    image: 'https://images.unsplash.com/photo-1764303017897-16f5009d2bb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    color: '#00F0FF',
    description: 'A portfolio design system mimicking a high-end operating system interface. The goal was to create an immersive environment for technical recruiters that balances aesthetics with information density.',
    architecture: 'Built on a custom React framework with a Three.js background layer. State management handles the seamless transition between 2D documentation mode and 3D exploration mode.',
  },
  {
    id: 2,
    name: 'Bikcraft E-commerce',
    domain: 'E-commerce',
    stack: ['Next.js', 'Stripe', 'Tailwind'],
    year: '2024',
    status: 'Production',
    image: 'https://images.unsplash.com/photo-1760801802787-86f7958c439e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    color: '#FFD600',
    description: 'Needed a high-performance headless store capable of handling complex product customizations while maintaining sub-second page loads for better SEO and user retention.',
    architecture: 'Implemented on-premise cache with Redis to store product configurations. The frontend uses Next.js Static Site Generation (SSG) for catalog pages, revalidated via webhooks from the CMS.',
  },
  {
    id: 3,
    name: 'Neural HUD',
    domain: 'Data Viz',
    stack: ['D3.js', 'Python', 'FastAPI'],
    year: '2024',
    status: 'Prototype',
    image: 'https://images.unsplash.com/photo-1647320293733-92affa4fa39c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    color: '#00FF94',
    description: 'A data visualization dashboard for displaying real-time neural network training metrics. Required efficient rendering of massive datasets without blocking the main thread.',
    architecture: 'Utilizes a Python FastAPI backend to stream WebSocket data to a React frontend. D3.js is used for SVG calculations, while WebGL handles the heavy rendering of scatter plots.',
  },
  {
    id: 4,
    name: 'Cyber Structure',
    domain: '3D Architecture',
    stack: ['Blender', 'UE5'],
    year: '2023',
    status: 'Archived',
    image: 'https://images.unsplash.com/photo-1649197912768-c31e73ef4ce6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    color: '#FF0055',
    description: 'Concept art for a cyberpunk city generator. The challenge was to create procedurally generated structures that felt cohesive and livable.',
    architecture: 'Developed using Blender Geometry Nodes for procedural generation, exported to Unreal Engine 5 for real-time lighting and rendering.',
  },
];
