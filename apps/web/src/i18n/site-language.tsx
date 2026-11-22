import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Globe } from "lucide-react";
import { isLanguage, languageNames, type Language, type LanguageSettings } from "./languages";
import { createDocumentTranslator, type Catalog } from "./translate-document";

const catalogs = {
  en: () => Promise.resolve({ default: {} as Catalog }),
  fr: () => import("./locales/fr.json"),
  es: () => import("./locales/es.json"),
  de: () => import("./locales/de.json"),
  ar: () => import("./locales/ar.json"),
};

const storageKey = "luxury-chauffeur:language";

const languageLabels: Record<Language, string> = {
  en: "Choose language",
  fr: "Choisir la langue",
  es: "Elegir idioma",
  de: "Sprache wählen",
  ar: "اختر اللغة",
};

const LanguageContext = createContext<{
  language: Language;
  enabledLanguages: Language[];
  chooseLanguage: (language: Language) => void;
  unavailable: boolean;
} | null>(null);

export function SiteLanguageProvider({ settings, children }: { settings: LanguageSettings; children: ReactNode }) {
  const { defaultLanguage, enabledLanguages } = settings;
  const [language, setLanguage] = useState<Language>("en");
  const [requested, setRequested] = useState<Language | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const translator = useRef<ReturnType<typeof createDocumentTranslator> | null>(null);

  useEffect(() => {
    let saved = "";
    try {
      saved = localStorage.getItem(storageKey) ?? "";
    } catch {
      // Translation selection still works for this visit when storage is unavailable.
    }
    if (isLanguage(saved) && enabledLanguages.includes(saved)) {
      setRequested(saved);
    } else {
      setRequested(defaultLanguage);
    }
  }, [defaultLanguage, enabledLanguages]);

  useEffect(() => {
    const instance = createDocumentTranslator();
    translator.current = instance;
    return () => {
      instance.apply({}, "en");
      instance.disconnect();
      translator.current = null;
    };
  }, []);

  useEffect(() => {
    if (!requested) return;
    let active = true;

    setUnavailable(false);
    catalogs[requested]().then(({ default: messages }) => {
      if (!active) return;
      translator.current?.apply(messages, requested);
      setLanguage(requested);
      try {
        localStorage.setItem(storageKey, requested);
      } catch {
        // The current translation does not depend on storage access.
      }
    }).catch(() => {
      if (!active) return;
      setUnavailable(true);
      setRequested(null);
    });

    return () => { active = false; };
  }, [requested]);

  return (
    <LanguageContext.Provider value={{ language, enabledLanguages, chooseLanguage: setRequested, unavailable }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function SiteLanguageMenu() {
  const state = useContext(LanguageContext);
  if (!state || state.enabledLanguages.length < 2) return null;

  return (
    <label className="site-language-menu" translate="no">
      <Globe size={19} aria-hidden="true" />
      <span aria-hidden="true">{state.language.toUpperCase()}</span>
      <select
        aria-label={languageLabels[state.language]}
        value={state.language}
        onChange={(event) => {
          const language = event.currentTarget.value;
          if (isLanguage(language)) state.chooseLanguage(language);
        }}
      >
        {state.enabledLanguages.map((code) => (
          <option key={code} value={code} lang={code}>{languageNames[code]}</option>
        ))}
      </select>
      {state.unavailable && (
        <span className="site-language-error" role="status">Translation unavailable. Please try again.</span>
      )}
    </label>
  );
}
