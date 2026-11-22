import { isLanguage, languageNames, type Language, type LanguageSettings } from "./languages";

export function readLanguageSettings(): LanguageSettings {
  const configured = process.env.ENABLED_LANGUAGES?.split(",")
    .map((code) => code.trim().toLowerCase())
    .filter(isLanguage);
  const enabledLanguages = [...new Set<Language>([
    "en",
    ...(configured?.length ? configured : Object.keys(languageNames).filter(isLanguage)),
  ])];

  const requestedDefault = process.env.DEFAULT_LANGUAGE?.trim().toLowerCase() ?? "en";
  const defaultLanguage =
    isLanguage(requestedDefault) && enabledLanguages.includes(requestedDefault)
      ? requestedDefault
      : "en";

  return { defaultLanguage, enabledLanguages };
}
