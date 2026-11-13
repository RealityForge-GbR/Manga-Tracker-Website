# Website acquisition contract

The download links on `https://mangatracker.de` identify the website-to-Google-Play handoff. The website supplies both explicit Play UTM parameters and an encoded `referrer` containing the same parameters for Firebase campaign attribution.

| Parameter | Value |
| --- | --- |
| `utm_source` | `mangatracker.de` |
| `utm_medium` | `referral` |
| `utm_campaign` | `website` |
| `utm_content` | `homepage_header`, `homepage_hero`, `homepage_download`, `manga_detail`, `manga_footer`, or `error_page` |

The three homepage buttons and both manga detail download buttons use this contract. Unavailable manga pages also provide a tagged download link. The existing www redirect leads to the canonical website. Links on the legacy `manga.realityforge.eu` host remain unchanged. Cache versions are advanced so older untagged HTML is not reused by the Worker.

This campaign records the website handoff. It does not preserve an earlier Instagram, QR, or advertising source, count website visits, count button clicks, or identify individual people. Incoming query parameters do not overwrite the fixed campaign. Do not classify every website acquisition as unpaid: users may have reached the website through advertising. More detailed upstream campaign handling is a separate extension.

## Daily marketing collector integration

The Windows Marketing-Intelligence pipeline lives outside this repository. Its collector and Excel still need the following integration:

1. Query the production GA4 app stream through the existing Data API connection. Use `firstUserSource=mangatracker.de`, `firstUserMedium=referral`, and `firstUserCampaignName=website`. Count `newUsers` for each exact overall, week, and month window. Validate that the underlying app first-open attribution matches these fields before publishing the new KPI. Label this metric "Erfasste Erstöffnungsnutzer über die Website". It describes observed app first opens, with the existing analytics-consent and data-coverage limitations; it is not a complete installation count. Do not add it again to the existing total users.
2. Read the existing Google Play acquisition reports by UTM source and campaign. Select `mangatracker.de` and `website`. Use the metric definition actually present in the exported report: Store visitors, install-button clicks, and Store acquisitions are distinct. If the report exposes acquisitions, label them "Play-Store-Akquisitionen über die Website" and retain its definition and actual period. Do not substitute Google's ad-attributed downloads or infer acquisitions from first opens.
3. Include these rows in the overall, weekly, and monthly Excel views with measured period, source, retrieval time, and source availability. No historical backfill before deployment. Distinguish an unavailable or not-yet-delivered report from a confirmed zero. The downloaded Play GCS reports can lag the Console by several days.
4. Run through the normal isolated daily source collection and single Excel publication. Reuse existing credentials and integrations. Windsor continues providing advertising performance; it does not generate these website attribution tags. No new browser step is required to query supported GA4 and Play GCS fields.

An Android installation via a tagged link, followed by an analytics-enabled first app open and subsequent report inspection, is the end-to-end acceptance test. The website tests and public deployment checks validate the delivered links; they do not claim that a production installation has already been attributed. Avoid generating artificial production conversions solely for testing.

## Implementation and references

`src/acquisition.js` is the central link builder. There are no new cookies, user identifiers, scripts, bindings, dependencies, or backend routes. Existing Android App Links and production API consumers are unchanged.

- Firebase campaign attribution and Play Install Referrer: https://support.google.com/analytics/answer/9353532
- Play acquisition reporting: https://support.google.com/googleplay/android-developer/answer/9859173
- Downloadable Play reports: https://support.google.com/googleplay/android-developer/answer/6135870
- GA4 Data API schema: https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema
