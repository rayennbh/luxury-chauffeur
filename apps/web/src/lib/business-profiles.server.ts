// Configure only verified public profiles that identify this exact business.
export function businessProfiles(): string[] {
  const profiles = new Set<string>();
  for (const entry of (process.env.BUSINESS_SAME_AS_URLS ?? "").split(",")) {
    try {
      const url = new URL(entry.trim());
      if (url.protocol === "https:" && !url.username && !url.password) {
        profiles.add(url.href);
      }
    } catch {
      // Invalid entries are omitted from JSON-LD.
    }
  }
  return [...profiles];
}
