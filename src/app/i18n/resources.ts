import deAbout from './locales/de/about.json';
import deAccessibility from './locales/de/accessibility.json';
import deApp from './locales/de/app.json';
import deCommand from './locales/de/command.json';
import deCommon from './locales/de/common.json';
import deContact from './locales/de/contact.json';
import deExperience from './locales/de/experience.json';
import deFooter from './locales/de/footer.json';
import deGarden from './locales/de/garden.json';
import deHeader from './locales/de/header.json';
import deHero from './locales/de/hero.json';
import deProjects from './locales/de/projects.json';
import deQualifications from './locales/de/qualifications.json';
import deSkills from './locales/de/skills.json';

import enAbout from './locales/en/about.json';
import enAccessibility from './locales/en/accessibility.json';
import enApp from './locales/en/app.json';
import enCommand from './locales/en/command.json';
import enCommon from './locales/en/common.json';
import enContact from './locales/en/contact.json';
import enExperience from './locales/en/experience.json';
import enFooter from './locales/en/footer.json';
import enGarden from './locales/en/garden.json';
import enHeader from './locales/en/header.json';
import enHero from './locales/en/hero.json';
import enProjects from './locales/en/projects.json';
import enQualifications from './locales/en/qualifications.json';
import enSkills from './locales/en/skills.json';

import ptBRAbout from './locales/pt-BR/about.json';
import ptBRAccessibility from './locales/pt-BR/accessibility.json';
import ptBRApp from './locales/pt-BR/app.json';
import ptBRCommand from './locales/pt-BR/command.json';
import ptBRCommon from './locales/pt-BR/common.json';
import ptBRContact from './locales/pt-BR/contact.json';
import ptBRExperience from './locales/pt-BR/experience.json';
import ptBRFooter from './locales/pt-BR/footer.json';
import ptBRGarden from './locales/pt-BR/garden.json';
import ptBRHeader from './locales/pt-BR/header.json';
import ptBRHero from './locales/pt-BR/hero.json';
import ptBRProjects from './locales/pt-BR/projects.json';
import ptBRQualifications from './locales/pt-BR/qualifications.json';
import ptBRSkills from './locales/pt-BR/skills.json';

export const resources = {
  'pt-BR': {
    about: ptBRAbout,
    accessibility: ptBRAccessibility,
    app: ptBRApp,
    command: ptBRCommand,
    common: ptBRCommon,
    contact: ptBRContact,
    experience: ptBRExperience,
    footer: ptBRFooter,
    garden: ptBRGarden,
    header: ptBRHeader,
    hero: ptBRHero,
    projects: ptBRProjects,
    qualifications: ptBRQualifications,
    skills: ptBRSkills,
  },
  en: {
    about: enAbout,
    accessibility: enAccessibility,
    app: enApp,
    command: enCommand,
    common: enCommon,
    contact: enContact,
    experience: enExperience,
    footer: enFooter,
    garden: enGarden,
    header: enHeader,
    hero: enHero,
    projects: enProjects,
    qualifications: enQualifications,
    skills: enSkills,
  },
  de: {
    about: deAbout,
    accessibility: deAccessibility,
    app: deApp,
    command: deCommand,
    common: deCommon,
    contact: deContact,
    experience: deExperience,
    footer: deFooter,
    garden: deGarden,
    header: deHeader,
    hero: deHero,
    projects: deProjects,
    qualifications: deQualifications,
    skills: deSkills,
  },
} as const;
