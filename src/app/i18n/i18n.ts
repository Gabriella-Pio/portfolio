import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { defaultLanguage, supportedLanguages, type LanguageCode } from './languages';
import { resources } from './resources';

const STORAGE_KEY = 'portfolio-language';

const isSupportedLanguage = (language: string): language is LanguageCode => {
  return supportedLanguages.some(supportedLanguage => supportedLanguage === language);
};

const getInitialLanguage = () => {
  if (typeof window === 'undefined') {
    return defaultLanguage;
  }

  const savedLanguage = window.localStorage.getItem(STORAGE_KEY);

  if (savedLanguage && isSupportedLanguage(savedLanguage)) {
    return savedLanguage;
  }

  return defaultLanguage;
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: defaultLanguage,
    supportedLngs: supportedLanguages,
    defaultNS: 'common',
    ns: [
      'about',
      'accessibility',
      'app',
      'command',
      'common',
      'contact',
      'experience',
      'footer',
      'garden',
      'header',
      'hero',
      'projects',
      'qualifications',
      'skills',
    ],
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on('languageChanged', language => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, language);
  window.document.documentElement.lang = language;
});

if (typeof window !== 'undefined') {
  window.document.documentElement.lang = i18n.language;
}

export default i18n;
