---
name: frontend-build
description: Standard-Stack, Backend-Anbindung (n8n-Webhook / FastAPI / AI-Streaming) und Veröffentlichen über buildbar für Next.js/React-Frontends. Verwenden beim Bauen oder Debuggen von UI, bei Tailwind, bei n8n-Webhook- oder FastAPI-Anbindung, beim KI-Chat-Streaming und beim Veröffentlichen einer App. Lauffähiges Beispiel: frontend-starter/.
---

# Frontend bauen und veröffentlichen

Verbindliche Konventionen für Web-Frontends. Ziel: keine Stack-Drift, keine bekannten Fehler wiederholen. Für **neue** Projekte siehe Skill `frontend-scaffold`. Lauffähiges Beispiel in diesem Repo: **`frontend-starter/`**.

## Standard-Stack (nicht abweichen ohne Grund)

| Bereich | Festlegung |
|---------|-----------|
| Framework | **Next.js 16** (App Router), `next@16.x` |
| UI | **React 19**, `react`/`react-dom@^19` |
| Sprache | **TypeScript 5.9** (neuestes 5.x, **kein** TS 6), `strict: true` |
| Styling | **Tailwind CSS 4** (CSS-first: `@import "tailwindcss"` in der globalen CSS, **kein** `tailwind.config.ts`; PostCSS-Plugin `@tailwindcss/postcss`) |
| Paketmanager | **npm** (kein pnpm/yarn/bun) |
| Pfad-Alias | `@/*` → `./*` |
| Karten-Apps | `maplibre-gl@^4.7`, **dynamisch** importiert (SSR-sicher), OSM-Raster ohne API-Key |

`tsconfig` Eckwerte: `noEmit`, `jsx: react-jsx` (setzt Next.js 16 selbst), `moduleResolution: bundler`, `module: esnext`, `skipLibCheck`, `paths: {"@/*": ["./*"]}`.

### Versions-Policy
Auf **current-stable** pinnen und bewusst nachziehen: nicht Bleeding-Edge jagen, aber auch nicht Majors zurückfallen lassen. Konkret: Framework, React und Tailwind auf dem aktuellen stabilen Major (Stand 2026-06: Next 16, React 19, Tailwind 4), **TypeScript** bewusst auf dem neuesten **5.x** halten, bis sich der jüngste TS-Major (6.x) gesetzt hat. Tailwind 3→4 ist Breaking (CSS-first, kein JS-Config).

Ordnerkonvention: `app/` (Routes) · `components/` (UI) · `lib/` (`n8n.ts` bzw. `api.ts`, `types.ts`).

## Backend-Anbindung: Eskalationsleiter

**n8n ist Backend Nummer 1.** Erst wenn n8n für den Fall nicht sinnvoll ist, eine Stufe weiter:

1. **Muster A: n8n-Webhook** (*immer zuerst*): Orchestrierung, Integrationen, zeitgesteuerte Abläufe, **auch nicht-streamende KI** (LangChain/AI-Agent-Nodes mit der Credential „Anthropic").
2. **Muster B: FastAPI**, wenn eigene Rechen-, Datenbank- oder Geo-Logik n8n sprengt. Service-Seite (Struktur, Docker, Betrieb) → Skill `backend-fastapi` (+ Beispiel `backend-example/`).
3. **Muster C: Next-natives KI-Streaming**, *nur* für **Token-Streaming** einer Chat-Oberfläche im eigenen Frontend (n8n-Webhooks geben *eine* fertige Antwort und streamen keine Tokens).

### Muster A: n8n-Webhook (Standard)
- Env: `NEXT_PUBLIC_N8N_BASE=https://…` (clientseitig, Adresse der n8n).
- URL-Builder gebündelt in `lib/n8n.ts`, z. B. `${NEXT_PUBLIC_N8N_BASE}/webhook/<pfad>`.
- ⚠️ **Webhook-Payload liegt n8n-seitig unter `.body`** (vgl. CLAUDE.md): Der n8n-Workflow muss das berücksichtigen, nicht das Frontend.
- ⚠️ Ein öffentlicher Webhook ist für alle erreichbar: im n8n-Workflow Eingaben prüfen und bei schreibenden Aktionen absichern (Skill `n8n-security-audit`).

### Muster B: FastAPI-Proxy / Monorepo
- Struktur: `frontend/` (Next.js) + `backend/` (FastAPI, Docker auf eigenem Server). Die **Service-Seite** steht im Skill `backend-fastapi`; hier nur die Frontend- und Proxy-Seite.
- `frontend/next.config.mjs` leitet `/api/*` an den Backend-Service weiter → **kein CORS**:

```js
// frontend/next.config.mjs
const backend = process.env.BACKEND_URL || "http://127.0.0.1:8080";
/** @type {import('next').NextConfig} */
export default {
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${backend}/:path*` }];
  },
};
```

- Frontend ruft immer **relativ** `/api/...` auf (nie die Backend-URL hart codieren).
- Veröffentlicht: `BACKEND_URL` beim Veröffentlichen als Env mitgeben (Adresse des Backend-Servers). Der buildbar-Deploy ist für die Next.js-App gedacht (`base_dir` = Ordner mit `package.json`); für das FastAPI-Backend einen eigenen Server einplanen.

### Muster C: Next-natives KI-Streaming (AI SDK)

**Nur** wenn eine Chat-Oberfläche **Token-Streaming** ins eigene Frontend braucht (sonst KI über n8n!). Dünner Route Handler, kein eigenes Backend. Provider: **Anthropic direkt** (Key als serverseitige Env).

Pakete: `ai@^6`, `@ai-sdk/anthropic@^3`, `@ai-sdk/react@^3`. Env: `ANTHROPIC_API_KEY` (nie als `NEXT_PUBLIC_*`).

⚠️ **Offener KI-Proxy:** Ein Route Handler wie unten hat **keinen Login**. Veröffentlicht mit echtem Key kann jede Person, die die Adresse kennt, auf Kosten des Keys chatten. Deshalb nur mit Schutz (Login, Zugangscode) öffentlich betreiben, einen Schalter wie `CHAT_ENABLED` vorsehen und Anfragegröße sowie `maxOutputTokens` begrenzen (siehe `frontend-starter/app/api/chat/route.ts`). Den gemeinsamen Bootcamp-Key nie ungeschützt veröffentlichen.

`lib/ai/model.ts`: eine Stelle für Provider und Modell:
```ts
import { anthropic } from "@ai-sdk/anthropic"; // liest ANTHROPIC_API_KEY aus der Env
// Günstig wegen gemeinsamem Bootcamp-Key (Claude Sonnet 5: 2 $ Input / 10 $ Output pro 1 Mio. Tokens).
export const getModel = () => anthropic("claude-sonnet-5");
```

`app/api/chat/route.ts`: Streaming-Endpoint (Kern, im Starter zusätzlich mit Schalter und Grenzen):
```ts
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { getModel } from "@/lib/ai/model";

export async function POST(req: Request) {
  if (process.env.CHAT_ENABLED !== "true") return new Response("aus", { status: 403 });
  const { messages }: { messages: UIMessage[] } = await req.json();
  const result = streamText({
    model: getModel(),
    messages: await convertToModelMessages(messages),
    maxOutputTokens: 1024,
  });
  return result.toUIMessageStreamResponse();
}
```

Client (`"use client"`) mit `useChat` aus `@ai-sdk/react` (Standard-Endpoint `POST /api/chat`):
```tsx
const { messages, sendMessage, status, error } = useChat();
// senden:  sendMessage({ text: input })
// rendern: message.parts.filter(p => p.type === "text").map(p => p.text).join("")
```

- ⚠️ **Persistenz NICHT über SQLite:** Das Dateisystem einer veröffentlichten App ist flüchtig; eine lokale `.sqlite` ist nach dem nächsten Veröffentlichen weg. Chatverlauf und Daten → Supabase/Postgres oder n8n (Data Tables).

## Veröffentlichen über buildbar

Apps werden über **buildbar** veröffentlicht, nicht über einen anderen Hosting-Dienst. Ergebnis ist eine öffentliche Adresse wie `https://app-xxxx.buildbar.at`. Den genauen Ablauf mit allen Parametern beschreibt die **`CLAUDE.md` deines Repos**; in Kürze:

- **Web-Variante (claude.ai/code):** `npm run build` → committen und auf den Arbeits-Branch pushen → **Pull Request nach `main` mergen** (veröffentlicht wird aus `main`) → `POST https://hub-oew.buildbar.at/deploy` mit `token` (aus `.mcp.json`), `base_dir` (Standard `/frontend-starter`) und `env` (je Zeile `KEY=VALUE`).
- **Desktop-Variante:** `POST https://deploy-oew.buildbar.at/prepare` (mit `repo` und `password`) liefert `deployId` und `public_key`; danach `POST https://deploy-oew.buildbar.at/publish` (mit `deployId`, `base_dir`, `env`, `password`) liefert die `url`. `password` ist das Bootcamp-Passwort aus dem Zugangsbereich. Was zwischen beiden Aufrufen zu tun ist (u. a. mit dem `public_key`), gehört zur Desktop-Variante und ist nicht Teil dieses Repos: siehe https://buildbar.at/oew/starten/desktop und die CLAUDE.md des Desktop-Repos https://github.com/freddy-schuetz/oew-ai-automation-bootcamp.
- `base_dir` ist der Ordner mit der `package.json` der App (Monorepo: z. B. `/frontend`). Beim Web-Deploy über den Hub immer einen Unterordner nutzen, der Repo-Root wird dort nicht unterstützt; beim Desktop-Deploy geht auch `/`.
- ⚠️ **`NEXT_PUBLIC_*` ist build-time:** Env **beim Veröffentlichen** mitgeben; nach einer Änderung **neu veröffentlichen**, sonst greift der alte Wert.
- Der **erste Build dauert einige Minuten**; eine Fehlermeldung wie „no available server" in dieser Zeit ist normal.
- Secrets nur über den `env`-Parameter bzw. `.env.local` (lokal, nicht committet), **nie** ins Repo. Der Supabase-`service_role`-Key gehört nie in ein Frontend.

## Vor dem Veröffentlichen verifizieren (Pflicht)

1. **`npm run build`**: Build muss grün sein (fängt SSR- und Type-Fehler vor dem Veröffentlichen ab).
2. Nur **Desktop:** `npm run dev` für eine lokale Vorschau. Im **Web** gibt es kein `localhost`; die Vorschau ist die veröffentlichte Adresse.
3. Erst dann committen, pushen (Web: Pull Request mergen) und veröffentlichen.

## Env-Var-Checkliste

- n8n-Webhook (Muster A): `NEXT_PUBLIC_N8N_BASE` (Frontend-Starter zusätzlich `NEXT_PUBLIC_HELLO_PATH`, auf der zentralen Bootcamp-n8n mit eigenem Kürzel, z. B. `mk-hello`)
- FastAPI-/Monorepo-App (Muster B): `BACKEND_URL`
- KI-Streaming (Muster C): `ANTHROPIC_API_KEY` + `CHAT_ENABLED` (nur mit Schutz)
- Supabase: `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` (nur anon-Key, nur für Tabellen mit aktivierter Row Level Security und passenden Policies; sonst Daten über n8n)
- App-eigene Secrets: nur in `.env.local` bzw. im `env`-Parameter beim Veröffentlichen, nie im Repo.

## a11y-Mini-Checkliste (vor dem Veröffentlichen)

- Semantische Elemente (`<button>`, `<nav>`, `<main>`, `<label for>`) statt klickbarer `<div>`.
- Jedes Interaktionselement per Tastatur erreichbar; sichtbarer `:focus`-Zustand.
- Bilder mit `alt`; Buttons nur mit Icon bekommen `aria-label`.
- Farbkontrast ≥ 4.5:1 für Text; Status nie nur über Farbe kommunizieren.
- Formularfehler als Text + `aria-invalid`/`aria-describedby`.

## QA vor dem Veröffentlichen (manuell, leichtgewichtig)

- Normalfall und ein Fehlerfall je zentralem Ablauf im Browser durchklicken.
- Netzwerk-Tab: keine 4xx/5xx auf den `/api`- bzw. Webhook-Aufrufen.
- Mobile-Ansicht (375px) prüfen: Layout bricht nicht.
- Konsole frei von Errors und Warnings; **keine `console.log`-Reste** committen.
