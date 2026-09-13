---
name: frontend-scaffold
description: Rezept zum Anlegen eines NEUEN Frontends (Next.js 16 + React 19 + TS + Tailwind 4). Verwenden wenn ein neues Web-Frontend gestartet/gescaffolded werden soll, oder wenn entschieden werden muss welches Backend-Muster (n8n-Webhook vs. FastAPI-Proxy vs. AI-Streaming vs. statisch) passt.
---

# Neues Frontend anlegen

Damit neue Frontends nicht vom etablierten Stack abweichen. Laufende Konventionen und Veröffentlichen: Skill `frontend-build`.

## Zuerst: vom Beispiel ausgehen statt from-scratch

Schnellster Weg: das lauffähige **`frontend-starter/`** in diesem Repo als Startpunkt kopieren (bringt Muster A und optional Muster C bereits mit) oder mit **`npx create-next-app@latest`** frisch beginnen und die Konventionen unten anwenden.

Nach dem Kopieren: `node_modules/` und `.next/` entfernen, `name` in der `package.json` anpassen. Die neue App bleibt als eigener Ordner **im selben Repository**; beim Veröffentlichen ist dieser Ordner das `base_dir`.

## Entscheidungsbaum

1. **Wo lebt die Logik?** (**n8n ist Default #1!**)
   - n8n-Workflows → Muster A (nur Frontend, `NEXT_PUBLIC_N8N_BASE`).
   - Eigene Rechen-/DB-/Geo-Logik (Python) → Muster B (Monorepo `frontend/` + `backend/` FastAPI; Service-Seite → Skill `backend-fastapi`).
   - **Chat-UI mit Token-Streaming** (n8n streamt keine Tokens) → Muster C (Next-nativer AI-SDK-Route-Handler, Anthropic; Code im Skill `frontend-build`).
   - Rein statisch → Next.js ohne `/api`-Proxy.
   - ⚠️ Muster C mit echtem Key ist ein **offener KI-Proxy**, solange die App keinen Login hat: nur mit Schutz öffentlich betreiben (Details im Skill `frontend-build`).
2. **Karte nötig?** → `maplibre-gl` ergänzen, Map-Komponente **dynamisch** importieren (`next/dynamic`, `ssr: false`).
3. **Voice/Realtime?** → OpenAI Realtime über ephemeren Token (n8n liefert Token). Nicht Teil des Bootcamp-Zugangs, bräuchte einen eigenen OpenAI-Key (der KI-Zugang im Bootcamp ist nur der Anthropic-Key).

## Starter-Artefakte (exakte Versionen)

`package.json` (Muster A, minimal, aktuelle Baseline):
```json
{
  "name": "<projekt>-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": { "dev": "next dev", "build": "next build", "start": "next start" },
  "dependencies": { "next": "^16.2.0", "react": "^19.2.0", "react-dom": "^19.2.0" },
  "devDependencies": {
    "@types/node": "^22.0.0", "@types/react": "^19.2.0", "@types/react-dom": "^19.2.0",
    "@tailwindcss/postcss": "^4.3.0", "tailwindcss": "^4.3.0", "typescript": "^5.9.0"
  }
}
```
> Kein `lint`-Script mit `next lint`: Das Kommando gibt es in Next.js 16 nicht mehr. Wer Linting braucht, richtet ESLint separat ein (`"lint": "eslint ."` plus eslint-devDependencies) und aktualisiert danach die `package-lock.json` mit `npm install`.
> Tailwind 4 braucht **kein** `autoprefixer`/`postcss` mehr (das Plugin `@tailwindcss/postcss` bündelt Lightning CSS). Exakte Patch-Versionen vor dem Festschreiben mit `npm view <pkg> version` prüfen.
- Map-App: zusätzlich `"maplibre-gl": "^4.7.1"` unter dependencies.
- AI-Streaming (Muster C): zusätzlich `"ai": "^6.0.0"`, `"@ai-sdk/anthropic": "^3.0.0"`, `"@ai-sdk/react": "^3.0.0"` unter dependencies (Code-Snippets im Skill `frontend-build`).
- Prosa/Markdown-lastig: `"@tailwindcss/typography": "^0.5.15"` unter devDependencies, in TW4 via `@plugin "@tailwindcss/typography";` in der globalen CSS aktivieren.

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"], "allowJs": true, "skipLibCheck": true,
    "strict": true, "noEmit": true, "esModuleInterop": true, "module": "esnext",
    "moduleResolution": "bundler", "resolveJsonModule": true, "isolatedModules": true,
    "jsx": "react-jsx", "incremental": true, "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

`next.config.mjs`, **nur Muster B** (Proxy):
```js
const backend = process.env.BACKEND_URL || "http://127.0.0.1:8080";
/** @type {import('next').NextConfig} */
export default {
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${backend}/:path*` }];
  },
};
```
Muster A: eine leere `next.config.mjs` (`export default {};`) genügt.

**Tailwind 4 (CSS-first, kein `tailwind.config.ts` mehr):**

`postcss.config.mjs`:
```js
export default { plugins: { "@tailwindcss/postcss": {} } };
```

`app/globals.css` (Kopf): Content wird automatisch erkannt, Theme und Markenfarben über `@theme`:
```css
@import "tailwindcss";

@theme {
  --color-brand: #0ea5e9;   /* eigene Brand-Farben als CSS-Variablen */
}
```
- Liegen Quellen außerhalb der Standardpfade: `@source "../pfad";` in der CSS ergänzen.
- `@import "tailwindcss";` ersetzt die alten `@tailwind base/components/utilities;`-Direktiven (TW3).

## Ordnergerüst
```
app/            # page.tsx, layout.tsx, globals.css (@import "tailwindcss") (+ ggf. /api Routes)
components/      # wiederverwendbare UI
lib/            # n8n.ts | api.ts, types.ts (+ ai/model.ts bei Muster C)
postcss.config.mjs  next.config(.mjs|.ts)  tsconfig.json  .env.local.example
```

## Vor dem ersten Veröffentlichen
- `.env.local.example` mit allen benötigten Variablen, nur Platzhalter (siehe Env-Checkliste in `frontend-build`).
- `npm install && npm run build` muss grün sein.
- Veröffentlicht wird über **buildbar** (kein anderer Hosting-Dienst): `base_dir` = Ordner der App (Monorepo z. B. `/frontend`), Env beim Veröffentlichen mitgeben. Ablauf für Web und Desktop: Skill `frontend-build` und die `CLAUDE.md` des Repos (Web: vorher den Pull Request nach `main` mergen).
