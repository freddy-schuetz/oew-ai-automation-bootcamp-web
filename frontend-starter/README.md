# Frontend-Starter (Next.js 16 + React 19 + Tailwind 4)

Minimaler, lauffähiger Starter für Frontends im AI Automation Bootcamp.

## ⚠️ Zuerst lesen: der KI-Chat ist ein offener Proxy

`app/api/chat/route.ts` leitet Chat-Nachrichten **ohne Login** an Claude weiter. Ist die App öffentlich erreichbar und ein echter `ANTHROPIC_API_KEY` hinterlegt, kann **jede Person, die die Adresse kennt**, auf Kosten dieses Keys chatten und das Budget aufbrauchen.

- Der Chat ist deshalb **standardmäßig aus** und läuft nur mit `CHAT_ENABLED=true`.
- **Nie** mit echtem Key öffentlich veröffentlichen, solange die App **keinen Schutz** hat (Login, Zugangscode). Das gilt besonders für den gemeinsamen Anthropic-Key aus dem Bootcamp-Zugangsbereich.
- Die eingebauten Grenzen (Anfragegröße, Anzahl Nachrichten, Antwortlänge) dämpfen Missbrauch nur, sie verhindern ihn nicht.
- Für KI im Bootcamp ist **n8n** der Normalfall (KI-Nodes mit der Credential „Anthropic"); das Frontend ruft dann nur den n8n-Webhook auf.

## Start (Web-Variante: Veröffentlichen auf Zuruf über buildbar)
In Claude Code Web gibt es **keine lokale Vorschau**: `localhost` ist nicht erreichbar. So siehst du deine App:

**Sag Claude *„Veröffentliche meine App"***. Claude prüft den Build (`npm run build`), committet und pusht auf den Arbeits-Branch der Sitzung und bittet dich, den **Pull Request nach `main` zu mergen**: Veröffentlicht wird aus `main`. Danach stößt Claude beim Hub die Veröffentlichung an (`POST https://hub-oew.buildbar.at/deploy` mit `token`, `base_dir`, `env`). Du bekommst eine **öffentliche Adresse** wie `https://app-xxxx.buildbar.at`. Der **erste Build dauert einige Minuten**; eine Fehlermeldung wie „no available server" ist in dieser Zeit normal.

> Env wird **beim Veröffentlichen mitgegeben** (nichts auf Vorrat, nichts im Repo): Braucht die App z. B. `NEXT_PUBLIC_N8N_BASE` (deine n8n-Adresse) oder Supabase-URL und anon-Key, übergibt Claude sie beim `/deploy`-Aufruf. Der Supabase-`service_role`-Key gehört nie in ein Frontend.

## Was ist drin?
- **`/` (Muster A: n8n-Webhook):** Formular → POST an `${NEXT_PUBLIC_N8N_BASE}/webhook/${NEXT_PUBLIC_HELLO_PATH}` (ohne Angabe: `hello`).
  Baue dazu in n8n den Workflow aus `../examples/workflows/hello-webhook.json`. Auf der zentralen Bootcamp-n8n den Pfad mit eigenem Kürzel wählen (z. B. `mk-hello`) und beim Veröffentlichen `NEXT_PUBLIC_HELLO_PATH=mk-hello` mitgeben.
- **`/chat` (Muster C: KI-Chat, optional):** Token-Streaming von Claude über das AI SDK (Paket `ai`).
  Braucht `ANTHROPIC_API_KEY` **und** `CHAT_ENABLED=true`. Siehe Warnung oben.

## Struktur
```
app/page.tsx          Webhook-Formular (Muster A)
app/chat/page.tsx     KI-Chat (Muster C)
app/api/chat/route.ts Streaming-Endpoint (Muster C, ohne Login, standardmäßig aus)
lib/n8n.ts            Webhook-Helper
lib/ai/model.ts       LLM-Provider/Modell (Anthropic)
.env.local.example    Liste der Env-Variablen (Platzhalter)
```

## Deploy
`npm run build` muss grün sein, dann committen, pushen, Pull Request nach `main` mergen und über den Hub veröffentlichen lassen (`/deploy`, `base_dir=/frontend-starter`). Nötige Env (z. B. `NEXT_PUBLIC_N8N_BASE`) wird dabei mitgegeben.
Backend-Logik gehört nach n8n (Muster A); für eigene Rechen- oder Datenbanklogik siehe `../backend-example/`.
