import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useDisclosure } from "@/hooks/use-disclosure";
import { isLanguage, languageNames, type Language, type LanguageSettings } from "./languages";
import { createDocumentTranslator, type Catalog } from "./translate-document";

const catalogs = {
  en: () => Promise.resolve({ default: {} as Catalog }),
  fr: () => import("./locales/fr.json"),
  es: () => import("./locales/es.json"),
  de: () => import("./locales/de.json"),
  ar: () => import("./locales/ar.json"),
  ru: () => import("./locales/ru.json"),
  it: () => import("./locales/it.json"),
  pt: () => import("./locales/pt.json"),
};

const storageKey = "luxury-chauffeur:language";

const languageLabels: Record<Language, string> = {
  en: "Choose language",
  fr: "Choisir la langue",
  es: "Elegir idioma",
  de: "Sprache wählen",
  ar: "اختر اللغة",
  ru: "Выбрать язык",
  it: "Scegli la lingua",
  pt: "Escolher idioma",
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
  const disclosure = useDisclosure();
  const trigger = useRef<HTMLButtonElement | null>(null);
  if (!state || state.enabledLanguages.length < 2) return null;

  return (
    <div
      className="site-language-menu"
      translate="no"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) disclosure.close();
      }}
    >
      <button
        type="button"
        className="site-language-trigger"
        {...disclosure.triggerProps}
        ref={(node) => {
          trigger.current = node;
          disclosure.triggerProps.ref(node);
        }}
        aria-label={languageLabels[state.language]}
      >
        <Globe size={18} aria-hidden="true" />
        <span aria-hidden="true">{state.language.toUpperCase()}</span>
        <ChevronDown className="site-language-chevron" size={13} aria-hidden="true" />
      </button>
      {disclosure.isOpen && (
        <ul className="site-language-panel" {...disclosure.panelProps}>
          {state.enabledLanguages.map((code) => (
            <li key={code}>
              <button
                type="button"
                lang={code}
                aria-pressed={state.language === code}
                onClick={() => {
                  state.chooseLanguage(code);
                  disclosure.close();
                  trigger.current?.focus();
                }}
              >
                <span dir="auto">{languageNames[code]}</span>
                {state.language === code && <Check size={16} aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}
      {state.unavailable && (
        <span className="site-language-error" role="status">Translation unavailable. Please try again.</span>
      )}
    </div>
  );
}
