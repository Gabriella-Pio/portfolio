# Gabriella's Portfolio

A personal developer portfolio built with a dark, cyberpunk-inspired design system. Features a fully interactive UI with 3D simulation mode, multilingual support, and an accessibility panel.

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS v4 + CSS Variables
- **Animation:** Motion (Framer Motion)
- **UI Primitives:** Radix UI
- **i18n:** i18next + react-i18next (pt-BR, en, es, de)
- **Command Palette:** cmdk

## Features

- 🌐 Multilingual UI — Portuguese, English, Spanish and German
- ♿ Accessibility panel — high contrast, font scale, reduce motion
- 🎨 Light / Dark theme toggle
- 📦 3D simulation mode toggle
- ⌨️ Command palette (`Cmd+K` / `Ctrl+K`)
- 📋 Project index with detail modal
- 📝 Logic Logs (digital garden / dev notes)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── app/
│   ├── components/       # UI components
│   │   └── header/       # Header subcomponents
│   ├── context/          # React contexts (Accessibility)
│   ├── data/             # Static data (projects)
│   ├── i18n/             # Internationalization
│   │   └── locales/      # Translation files (pt-BR, en, es, de)
│   └── types/            # TypeScript types
└── styles/               # Global CSS
```

## i18n — Adding Translations

UI labels are fully translated. To add a new language, create a folder under `src/app/i18n/locales/<code>/` mirroring the existing JSON files, then register it in `resources.ts` and `languages.ts`.

Project content (descriptions, architecture notes) is intentionally kept in English as the industry standard for technical portfolios.