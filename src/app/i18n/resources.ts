import deAccessibility from './locales/de/accessibility.json';
import deApp from './locales/de/app.json';
import deCommand from './locales/de/command.json';
import deCommon from './locales/de/common.json';
import deFooter from './locales/de/footer.json';
import deGarden from './locales/de/garden.json';
import deHeader from './locales/de/header.json';
import deHero from './locales/de/hero.json';
import deProjects from './locales/de/projects.json';
import enAccessibility from './locales/en/accessibility.json';
import enApp from './locales/en/app.json';
import enCommand from './locales/en/command.json';
import enCommon from './locales/en/common.json';
import enFooter from './locales/en/footer.json';
import enGarden from './locales/en/garden.json';
import enHeader from './locales/en/header.json';
import enHero from './locales/en/hero.json';
import enProjects from './locales/en/projects.json';
import esAccessibility from './locales/es/accessibility.json';
import esApp from './locales/es/app.json';
import esCommand from './locales/es/command.json';
import esCommon from './locales/es/common.json';
import esFooter from './locales/es/footer.json';
import esGarden from './locales/es/garden.json';
import esHeader from './locales/es/header.json';
import esHero from './locales/es/hero.json';
import esProjects from './locales/es/projects.json';
import ptBRAccessibility from './locales/pt-BR/accessibility.json';
import ptBRApp from './locales/pt-BR/app.json';
import ptBRCommand from './locales/pt-BR/command.json';
import ptBRCommon from './locales/pt-BR/common.json';
import ptBRFooter from './locales/pt-BR/footer.json';
import ptBRGarden from './locales/pt-BR/garden.json';
import ptBRHeader from './locales/pt-BR/header.json';
import ptBRHero from './locales/pt-BR/hero.json';
import ptBRProjects from './locales/pt-BR/projects.json';

export const resources = {
  'pt-BR': {
    accessibility: ptBRAccessibility,
    app: ptBRApp,
    command: ptBRCommand,
    common: ptBRCommon,
    footer: ptBRFooter,
    garden: ptBRGarden,
    header: ptBRHeader,
    hero: ptBRHero,
    projects: ptBRProjects,
  },
  en: {
    accessibility: enAccessibility,
    app: enApp,
    command: enCommand,
    common: enCommon,
    footer: enFooter,
    garden: enGarden,
    header: enHeader,
    hero: enHero,
    projects: enProjects,
  },
  es: {
    accessibility: esAccessibility,
    app: esApp,
    command: esCommand,
    common: esCommon,
    footer: esFooter,
    garden: esGarden,
    header: esHeader,
    hero: esHero,
    projects: esProjects,
  },
  de: {
    accessibility: deAccessibility,
    app: deApp,
    command: deCommand,
    common: deCommon,
    footer: deFooter,
    garden: deGarden,
    header: deHeader,
    hero: deHero,
    projects: deProjects,
  },
} as const;
