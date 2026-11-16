import { useCookieBanner } from "@/hooks/use-cookie-banner";

export function CookieBanner() {
  const banner = useCookieBanner();
  if (!banner.isOpen) return null;
  return (
    <section
      className="cookie-banner"
      role="dialog"
      aria-label="Your cookie preferences"
    >
      <div>
        <strong>Your visit, your choice.</strong>
        <p>
          Essential cookies keep this website working. Optional cookies are only
          used with your consent.
        </p>
      </div>
      {banner.isCustomizing && (
        <fieldset className="cookie-choices">
          <legend>Optional cookies</legend>
          <label>
            <input
              type="checkbox"
              checked={banner.choices.analytics}
              onChange={(e) => banner.setChoice("analytics", e.target.checked)}
            />
            <span>
              Website analytics
              <small>Understand visits and improve your experience.</small>
            </span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={banner.choices.marketing}
              onChange={(e) => banner.setChoice("marketing", e.target.checked)}
            />
            <span>
              Marketing<small>Measure and personalise advertising.</small>
            </span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={banner.choices.platformAnalytics}
              onChange={(e) =>
                banner.setChoice("platformAnalytics", e.target.checked)
              }
            />
            <span>
              Platform analytics
              <small>
                Allow Hostinger to improve its platform without directly
                identifying you.
              </small>
            </span>
          </label>
        </fieldset>
      )}
      <div className="cookie-actions">
        <button
          className="button button-outline"
          onClick={banner.rejectOptional}
        >
          Reject optional
        </button>
        <button
          className="button button-outline"
          onClick={banner.isCustomizing ? banner.saveChoices : banner.customize}
        >
          {banner.isCustomizing ? "Save preferences" : "Customise"}
        </button>
        <button className="button button-blue" onClick={banner.acceptAll}>
          Accept all
        </button>
      </div>
    </section>
  );
}