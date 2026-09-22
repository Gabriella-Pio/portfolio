# Gabriella's Portfolio

Personal developer portfolio with a terminal-inspired design system, multilingual UI, accessibility controls, and a command palette.

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS v4 + CSS Variables
- **Animation:** Motion
- **UI Primitives:** Radix UI
- **i18n:** i18next + react-i18next (pt-BR, en, de)
- **Command Palette:** cmdk

## Features

- Multilingual UI — Portuguese, English and German
- Accessibility panel — high contrast, font scale, reduce motion, simplified mode, keyboard focus
- Light / Dark theme (respects `prefers-color-scheme` on first visit)
- Command palette (`Cmd+K` / `Ctrl+K`)
- Project index with detail modal
- Logic logs (digital garden)

The 3D simulation toggle is in the codebase (`ENABLE_3D_SIMULATION`) but off until a Three.js scene exists.

## Getting Started

```bash
npm install
npm run dev
npm run build
npm test
```

## Project Structure

```
src/
├── app/
│   ├── components/       # Feature folders (about, hero, garden, …)
│   │   ├── header/
│   │   └── ui/           # Radix primitives actually in use
│   ├── context/          # Accessibility
│   ├── data/             # Projects, garden notes, skills, contact
│   ├── hooks/
│   ├── i18n/             # pt-BR, en, de
│   └── types/
└── styles/
```

## i18n

UI labels are translated. To add a language, create `src/app/i18n/locales/<code>/` mirroring the existing JSON files, then register it in `resources.ts` and `languages.ts`.

Project copy, experience and garden notes stay in English on purpose.
