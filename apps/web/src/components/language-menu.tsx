import { useLocation } from "react-router";

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "de", label: "Deutsch" },
  { code: "ar", label: "العربية" },
];

// Both headers use this markup because the homepage renders legacy HTML.
export function languageMenuMarkup(pathname: string) {
  const page = new URL("https://www.luxury-chauffeur.com/");
  page.pathname = pathname;

  const options = languages.map(({ code, label }) => {
    if (code === "en") {
      const href = page.pathname.replace(/^\/+/, "/").replaceAll("&", "&amp;");
      return `<li><a href="${href}" lang="en" aria-current="true">${label}</a></li>`;
    }

    const params = new URLSearchParams({ sl: "en", tl: code, u: page.href });
    const href = `https://translate.google.com/translate?${params.toString().replaceAll("&", "&amp;")}`;
    return `<li><a href="${href}" lang="${code}" dir="auto" target="_blank" rel="noopener noreferrer">${label}</a></li>`;
  }).join("");

  return `<details class="language-menu" translate="no">
    <summary aria-label="Choose language">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></svg>
      <span>EN</span>
    </summary>
    <div class="language-menu-panel">
      <ul aria-label="Languages">${options}</ul>
      <p>Translations open in a new tab via Google Translate.</p>
    </div>
  </details>`;
}

export function LanguageMenu() {
  const { pathname } = useLocation();
  return <div dangerouslySetInnerHTML={{ __html: languageMenuMarkup(pathname) }} />;
}
