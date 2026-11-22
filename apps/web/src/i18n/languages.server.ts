import { isLanguage, languageNames, type LanguageSettings } from "./languages";

export function readLanguageSettings(): LanguageSettings {
  const configured = process.env.ENABLED_LANGUAGES?.split(",")
    .map((code) => code.trim().toLowerCase())
    .filter(isLanguage);
  const enabledLanguages = configured?.length
    ? [...new Set(configured)]
    : Object.keys(languageNames).filter(isLanguage);

  const requestedDefault = process.env.DEFAULT_LANGUAGE?.trim().toLowerCase() ?? "en";
  const defaultLanguage =
    isLanguage(requestedDefault) && enabledLanguages.includes(requestedDefault)
      ? requestedDefault
      : enabledLanguages.includes("en")
        ? "en"
        : enabledLanguages[0];

  return { defaultLanguage, enabledLanguages };
}
