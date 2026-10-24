# NOIRVA STUDIO

## Design contract

Reference inspected on 24 October 2026: homepage, About, Journal, twelve projects, five articles. Core pages measured at 1440, 1280, 768, 390 and 375px. Source uses Playfair Display and Inter, fixed navigation, five hero slides, six-second autoplay, three-column 4:5 portfolio with 6px gaps, alternating numbered portraits, two-column project galleries and narrow article text.

Preserve these proportions. Replace all identity, photography and copy. Use the supplied charcoal, ivory and warm beige palette. Mobile navigation in the reference overflows; replace it with an accessible Sheet. Collaborators are absent and stay absent. No fabricated clients, awards, credentials, contacts or completed commissions.

Energy 1 / Rhythm 2 / Motion 1. The photographic hero is the focal point. Serif typography, fine separators and numbered profiles form the repeated identity. No decorative UI additions.

## Boundaries

Local TypeScript content only. No backend, CMS, uploads, authentication or database. Contact defaults to copying a project brief. Email and social links appear only when configured. Files stay in the browser and cannot be attached through mailto. Project galleries are editorial concept studies, not documentation of commissioned buildings. Team profiles are explicitly fictional editorial personas; portraits illustrate the profiles, not actual staff identities.

## Validation

Run npm test, npm run typecheck, npm run lint, npm run build. Then verify the production server in the browser at the five target widths. Static checks do not establish visual fidelity. Record remaining deviations and asset provenance before delivery.

## Verified implementation

- All 19 content pages return HTTP 200: homepage, About, Journal, twelve project details and four article details. Three unknown-route checks return HTTP 404.
- Production browser checks pass across 25 page/viewport combinations: five core page types at 1440, 1280, 768, 390 and 375px. No horizontal overflow, broken images or captured runtime/hydration errors in the checked pages.
- Portfolio filtering returns 12 / 8 / 4 projects. Hero indicators, mobile menu focus trapping, Escape dismissal, focus restoration and navigation work. Reduced motion suppresses autoplay.
- Contact checks cover empty-field errors, valid input, rejected file types, local PDF selection/removal, copied brief contents and a denied-clipboard fallback. A reproduced regression confirms that a rejected, cleared optional file no longer blocks a valid brief; the rejected filename is not included. Clipboard success is simulated within the page to avoid overwriting the user's system clipboard. No message or file was sent.
- Eight assert-based tests cover content, image provenance, filters, input and attachment validation, brief generation and configured email drafts. Type checking, ESLint and the production build pass.
- Self-hosted Latin WOFF2 variable fonts replace six full TTF files, preserving the reference typefaces while reducing the font payload substantially.

Evidence: `artifacts/browser-check.json`, viewport screenshots, `artifacts/build.log` and `artifacts/lint.log`. Run `Get-Content scripts/browser-check.py -Raw | browser-harness` in PowerShell to reproduce browser checks against the production preview. The isolated default origin avoids stale pages on shared localhost ports.

## Deliberate differences and launch settings

- The reference's mobile header clips its desktop links; the implementation uses an accessible menu below 768px. Team profiles stack explicitly in reading order on phones.
- Project galleries contain four photographs each. These are curated editorial studies, not claims that stock photographs document one commissioned property. Concept status and illustrative fictional profiles are visible without adding demo banners.
- The original floating WhatsApp/social controls and address/contact blocks are absent because no authorised endpoints were supplied. Working brief actions and neutral practice information occupy the contact section instead. Visible labels and honest attachment guidance make the contact section taller than the reference.
- Home and secondary pages preserve the observed type families, container gutters, major hero heights, narrow portfolio gaps and gallery ratios. No claim of identical pixels is made across replacement imagery and original copy.
- Set `site.websiteUrl` before deployment. Until configured, Next.js warns that absolute social-image URLs fall back to localhost; this does not prevent the build. Set a real `contactEmail` to enable mailto drafts. No public domain, recipient or social account is invented.
- Standard-license photo provenance is in `docs/asset-credits.json`; Google font OFL licenses are included beside the self-hosted fonts. Real staff identities/portraits should replace the explicitly fictional profiles when launching an operating studio.
