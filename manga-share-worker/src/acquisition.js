export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=eu.realityforge.mangatracker";

// Shared by every download CTA. This identifies the website-to-store handoff,
// not the visitor's earlier advertising source or an individual person.
export function playStoreUrl(origin, placement) {
  if (origin !== "https://mangatracker.de") return PLAY_STORE_URL;
  const campaign = new URLSearchParams({
    utm_source: "mangatracker.de",
    utm_medium: "referral",
    utm_campaign: "website",
    utm_content: placement,
  });
  const url = new URL(PLAY_STORE_URL);
  // Explicit Store dimensions plus the encoded referrer consumed by Firebase.
  for (const [key, value] of campaign) url.searchParams.set(key, value);
  url.searchParams.set("referrer", campaign.toString());
  return url.href;
}

export function playStoreHref(origin, placement) {
  return playStoreUrl(origin, placement).replaceAll("&", "&amp;");
}
