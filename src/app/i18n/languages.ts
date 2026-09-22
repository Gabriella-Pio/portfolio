export const languages = [
  {
    code: 'pt-BR',
    label: 'Portuguese',
    nativeLabel: 'Portugues BR',
    shortLabel: 'PT',
  },
  {
    code: 'en',
    label: 'English',
    nativeLabel: 'English',
    shortLabel: 'EN',
  },
  {
    code: 'de',
    label: 'German',
    nativeLabel: 'Deutsch',
    shortLabel: 'DE',
  },
] as const;

export type LanguageCode = typeof languages[number]['code'];

export const defaultLanguage: LanguageCode = 'pt-BR';

export const supportedLanguages = languages.map(language => language.code);
