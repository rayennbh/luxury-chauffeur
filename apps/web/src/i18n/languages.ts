export const languageNames = {
  en: "English",
  fr: "Français",
  es: "Español",
  de: "Deutsch",
  ar: "العربية",
  ru: "Русский",
  it: "Italiano",
  pt: "Português",
} as const;

export type Language = keyof typeof languageNames;

export type LanguageSettings = {
  defaultLanguage: Language;
  enabledLanguages: Language[];
};

export function isLanguage(code: string): code is Language {
  return Object.hasOwn(languageNames, code);
}
