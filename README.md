# NOIRVA STUDIO

Architecture and interior-design frontend. Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, Radix, Lucide and Motion. Content, fonts and images are local. No backend or external runtime image dependencies.

## Run

```powershell
npm install
npm run dev
```

```powershell
npm test
npm run typecheck
npm run lint
npm run build
node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3047
```

## Configuration

Edit `src/data/site-config.ts`. `contactEmail`, `instagramUrl` and `websiteUrl` are intentionally empty. Set a real recipient to enable email drafts. Without one, the form copies a validated project brief and provides a selectable-text fallback when clipboard access fails. Reference files stay local; mailto cannot attach them. No website action sends a message.

Set `websiteUrl` to the deployed origin before public launch so social-image URLs use the correct hostname. No invented address, telephone, social account or business response-time claim is included.

## Content and photography

Projects are editorial concept studies, not commissioned-building claims. Team members are fictional editorial personas with clearly labelled illustrative stock portraits. Replace them with authorised real identities and portraits before representing an operating practice.

`docs/asset-credits.json` records the source, photographer, license, dimensions and use of all 56 images. Unsplash standard-license images were selected from free results; no Unsplash+ files are included. Portraits do not assert the pictured people's names or employment. Local image files use descriptive project paths. Fonts are self-hosted with their OFL licenses in `public/fonts/`.

Asset reproduction: `python scripts/source-assets.py` requires Pillow, reads the curated assignments and source catalog, downloads images, verifies decoding and regenerates the asset manifests. It is not required to run or build the website.

## Reference and validation

See `docs/implementation.md` for reference measurements, deliberate mobile/accessibility corrections and verification evidence. Development screenshots and browser-check output belong in the ignored `artifacts/` folder.

With the production server running, execute browser checks in PowerShell:

```powershell
Get-Content scripts/browser-check.py -Raw | browser-harness
```

The browser check requires Browser Harness and a connected Chromium browser. `QA_ORIGIN` overrides the isolated preview address.
