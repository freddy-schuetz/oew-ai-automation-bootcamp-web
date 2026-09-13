# 🚀 AI Automation Bootcamp (ÖW): **Web-Variante** mit Claude Code Web + n8n

Die Arbeitsgrundlage für das **AI Automation Bootcamp** der **Österreich Werbung (ÖW)** in Kooperation mit **buildbar**: 21. bis 24.09.2026 bei der ÖW, Vordere Zollamtsstraße 13, 1030 Wien. Online-Kick-off am Mittwoch, 16.09.2026, um 10:30 Uhr. Trainer: Friedemann Schütz.

Die **Web-Variante** ist für alle, die **nichts installieren können oder wollen** (z. B. ohne Admin-Rechte auf dem Firmen-Laptop). Alles läuft im Browser über **[claude.ai/code](https://claude.ai/code)**: Du beschreibst dein Vorhaben, **Claude baut** die Automatisierung in **n8n** (und bei Bedarf eine kleine Web-Oberfläche).

**Wie das Bootcamp läuft:** Jede:r arbeitet am **eigenen Vorhaben**. Tag 1 planst du im Sparring mit der KI, ab Tag 2 wird umgesetzt, am Tag 4 zeigst du dein Ergebnis und räumst dein Repository auf. Am Ende hast du **eine erste funktionierende Workflow-Lösung, ein eigenes Code-Repository und einen klaren nächsten Schritt**.

> 🌐 **Alles Aktuelle zum Bootcamp:** [buildbar.at/oew](https://buildbar.at/oew) · Zugangsdaten (mit Passwort): [buildbar.at/oew#zugang](https://buildbar.at/oew#zugang) · Anleitung Web: [buildbar.at/oew/starten/web](https://buildbar.at/oew/starten/web) · Themen: [buildbar.at/oew/themen](https://buildbar.at/oew/themen) · Grundlagen: [buildbar.at/oew/grundlagen](https://buildbar.at/oew/grundlagen)

> 📝 **Vor dem Bootcamp: [Use-Case-Vorbereitung als PDF](docs/Use-Case-Vorbereitung.pdf)**: ein paar Leitfragen (was kostet Zeit?), womit du arbeitest, welche Freigaben und Daten du brauchst, plus ein kurzer Steckbrief zum Mitbringen. Kein Technik-Wissen nötig. *(Auch als [Druckversion](docs/Use-Case-Vorbereitung-Druck.pdf) mit hellem Hintergrund, zum Ausfüllen per Hand.)*
>
> 📄 **Zum ersten Mal hier? → [Schritt-für-Schritt-Anleitung als PDF](docs/Anleitung-ClaudeCode_n8n_Setup.pdf)**: vom Einloggen bis zur veröffentlichten App, in einfacher Sprache, ohne Installation. *(Auch als [Druckversion](docs/Anleitung-ClaudeCode_n8n_Setup-Druck.pdf) mit hellem Hintergrund.)*

> 🧭 **Vorhaben noch unklar oder schwer zu beschreiben?** Sag **„Hilf mir, meine Idee zu klären"**: Claude stellt dir ein paar einfache Fragen und macht daraus einen fertigen Bau-Plan. Ideen und die sechs Bootcamp-Themen zum Stöbern: **[docs/tourismus-ideen.md](docs/tourismus-ideen.md)**.

> ℹ️ **Kannst du installieren?** Dann gibt es auch die **Desktop-Variante** (lokale Vorschau deiner App): [buildbar.at/oew/starten/desktop](https://buildbar.at/oew/starten/desktop).

---

## ✅ Was du brauchst

- Einen **Browser** und Internet.
- Einen **eigenen GitHub-Account**.
- Einen **Claude-Plan mit Claude Code**: Pro, Max, Team oder Enterprise. Die kostenlose Stufe reicht nicht. **Cowork** eignet sich nicht als Bauumgebung für das Repository.
- Eine **n8n mit API-Zugang**: entweder die **zentrale Bootcamp-n8n** (`https://n8n-oew.buildbar.at`, Adresse, Login und API-Key im [Zugangsbereich](https://buildbar.at/oew#zugang)) oder deine **eigene** n8n. Die **kostenlose n8n-Cloud-Testversion reicht nicht**, weil sie keine öffentliche API hat.
- Das **Bootcamp-Passwort** für den Zugangsbereich.

---

## ✨ So legst du los (keine Installation)

1. **Zugangsdaten holen:** Öffne den [Zugangsbereich](https://buildbar.at/oew#zugang) mit dem Bootcamp-Passwort. Dort stehen n8n-Adresse, Login und API-Key der zentralen Bootcamp-n8n, der Anthropic-Key und die Supabase-Keys.
2. **Repo über den Hub anlegen:** Öffne **[hub-oew.buildbar.at](https://hub-oew.buildbar.at)**, trag deine n8n-Adresse und deinen n8n-API-Key ein und melde dich mit deinem GitHub-Account an. Der Hub legt in deinem Account ein **privates Repository `ai-automation-bootcamp`** an, erzeugt aus dieser Vorlage und mit fertiger n8n-Verbindung. Die ausführliche Anleitung steht unter [buildbar.at/oew/starten/web](https://buildbar.at/oew/starten/web).
3. **Projekt öffnen:** Öffne **dein** Repository `ai-automation-bootcamp` in **[claude.ai/code](https://claude.ai/code)**. Nicht die öffentliche Vorlage: In die kannst du nicht speichern.
4. **Loslegen:** Tippe einfach
   > **Los geht's**

   Claude begrüßt dich, prüft die Verbindung und fragt nach deinem Vorhaben. Hast du schon eine Idee? Beschreib sie direkt. Noch unsicher? Sag **„Hilf mir, meine Idee zu klären"**.

Claude baut, testet, dokumentiert und sichert alles **automatisch**.

---

## 🔌 Deine n8n-Verbindung

Die Verbindung steht in der Datei `.mcp.json` (per HTTP). Beim Anlegen deines Repos trägt der Hub dort eine **Verbindungs-URL mit deinem persönlichen Token** ein (`https://hub-oew.buildbar.at/g/<token>/mcp`). **Dein n8n-API-Key liegt beim Hub, nicht im Repo.** In der öffentlichen Vorlage steht an dieser Stelle nur ein Platzhalter.

> ⚠️ **Die Verbindungs-URL in `.mcp.json` ist wie ein Passwort.** Wer sie hat, kommt über den Hub an deine n8n (bei der zentralen Bootcamp-n8n an alle Workflows und Credentials) und kann veröffentlichen. Lass dein Repository **privat**. Bevor du es teilst oder öffentlich machst, ersetze den Token wieder durch den Platzhalter `HIER-TRAEGT-DER-HUB-DEINEN-TOKEN-EIN` (Claude hilft dir dabei).

Claude bestätigt die Verbindung automatisch bei der Begrüßung. Prüfen kannst du sie jederzeit mit **„prüfe meine n8n-Verbindung"**. Meldet sie einen Fehler, richte sie über **[hub-oew.buildbar.at](https://hub-oew.buildbar.at)** neu ein.

**Zentrale Bootcamp-n8n:** Alle nutzen denselben Login und sehen alle Workflows und Credentials. Gib deinen Workflows, Tabellen und Webhook-Pfaden ein **eigenes Kürzel** (z. B. `mk-hello`) und hinterlege dort nur Test- und Beispielzugänge. Für private Zugänge nimm deine eigene n8n.

---

## 🗂️ Die Bootcamp-Themen und passende Skills

| Thema | Skill (wird ergänzt) |
|---|---|
| Meetingnotizen strukturieren | `meetingnotizen` |
| E-Mail-Anfragen sortieren und Antwortentwürfe | `mail-triage-entwuerfe` |
| Wiederkehrende Berichte | `bericht-zeitgesteuert` |
| Terminfindung und Koordination | `terminkoordination` |
| Daten analysieren und visualisieren | `daten-visualisieren` |
| Präsentationen effizienter erstellen | `praesentation` |
| Zugriff auf Postfach, Kalender, Teams, Google | `m365-google-freigaben` |

Beispiele aus dem Tourismus: [docs/tourismus-ideen.md](docs/tourismus-ideen.md) · Überblick: [buildbar.at/oew/themen](https://buildbar.at/oew/themen)

> 🔐 **Freigaben früh klären:** Soll dein Workflow auf ein **Outlook-Postfach, einen Kalender oder Teams** (Microsoft 365) zugreifen, braucht es in üblich eingerichteten Organisationen eine **Freigabe durch die IT (Admin)**; bei Teams immer. Auch Google-Konten brauchen Vorbereitung. Frag deine IT möglichst **vor** dem Bootcamp, wer Admin ist und ob eine Freigabe möglich ist. Ohne Freigabe baust du mit **Beispieldaten** und hältst die Freigabe als nächsten Schritt fest.

---

## 📦 Was ist drin? (und was es für dich tut)

### Die Skills: das „Wissen", das Claude automatisch nutzt
Skills sind Spickzettel, die Claude **von selbst** heranzieht, sobald sie zum Thema passen. Du musst sie nicht aufrufen.

**Am Anfang: dein Vorhaben klären** (Tag 1):
- `idee-klaeren`: macht aus einer vagen oder schwer beschreibbaren Idee einen klaren Bau-Plan, inklusive Freigaben, Datenlage und Wahl der n8n.
- `grill-me`: klopft deinen **fertigen** Plan Frage für Frage ab, bevor gebaut wird (Claude bietet es nach dem Steckbrief einmal an, oder du sagst „grill mich").

**Bootcamp-Themen:** siehe Tabelle oben.

**Workflows richtig bauen** (von [czlonkowski](https://github.com/czlonkowski/n8n-skills)):
- `n8n-mcp-tools-expert`: wie man die n8n-Werkzeuge richtig bedient (Nodes suchen, Workflow anlegen, prüfen).
- `n8n-workflow-patterns`: bewährte Baumuster: Webhook, API-Aufruf, Datenbank, KI-Agent, Zeitplan.
- `n8n-node-configuration`: wie man einen einzelnen Baustein (Node) korrekt einstellt.
- `n8n-expression-syntax`: die `{{ }}`-Ausdrücke, mit denen Daten durch den Workflow fließen.
- `n8n-validation-expert`: findet Fehler im Workflow und erklärt sie.
- `n8n-code-javascript` / `n8n-code-python`: falls mal eigener Code in einem Node nötig ist.

**Qualität sichern und verständlich machen:**
- `n8n-testdaten`: erzeugt Testfälle und probiert den Workflow durch.
- `n8n-dokumentation`: schreibt **Sticky Notes in einfacher Sprache** in den Workflow, damit du auf einen Blick siehst, was wo passiert.
- `n8n-security-audit`: Sicherheits-Check vor dem Aktivieren (keine offenen Keys, Webhooks abgesichert …).
- `n8n-pruefbericht`: erstellt am Ende einen kurzen, verständlichen Bericht zum Workflow.

**Optional: eigene Oberfläche oder eigenes Backend**
- `frontend-build` / `frontend-scaffold`: **vollwertige** Web-Apps (Next.js) bauen: Formulare, Dashboards, Tabellen, Karten …, angebunden an n8n, FastAPI oder KI-Streaming.
- `backend-fastapi`: ein eigenes Python-Backend, wenn n8n für schwere Rechen- oder Datenlogik nicht reicht.

### Die Dateien und Ordner
| Pfad | Was es ist |
|------|-----------|
| `CLAUDE.md` | Die Spielregeln für Claude (lädt automatisch): sorgt dafür, dass Workflows korrekt gebaut, getestet **und automatisch dokumentiert** werden. |
| `.mcp.json` | Die Verbindung zu deiner n8n (per HTTP). Der Hub trägt die Verbindungs-URL mit deinem Token ein; dein Key bleibt beim Hub. Die URL ist wie ein Passwort. |
| `workflows/` | **Dein Ergebnis:** deine fertigen Workflows als JSON-Export (legt Claude an). |
| `mein-use-case.md` | Dein Steckbrief aus der Planung am Tag 1 (legt Claude an). |
| `examples/workflows/` | Importierbare Lern-Beispiele (alle mit Sticky-Notes-Erklärung): **`n8n-grundlagen.json`** (Grundlogik, Trigger-Arten und wichtigste Bausteine), **`ai-agent-grundlagen.json`** (KI-Agent mit Sprachmodell, Memory und Tool), **`ai-agent-datatable.json`** (KI-Agent → Antwort in eine n8n Data Table speichern), **`ai-agent-tool-webhook.json`** (KI-Agent ruft per Tool den hello-webhook auf), **`hello-webhook.json`** (Mini-Workflow). |
| `frontend-starter/` | Lauffähige Web-App: Formular → n8n-Webhook (+ optionaler KI-Chat). |
| `backend-example/` | Lauffähiges FastAPI-Backend (`/health` + Beispiel-Endpoint). |
| `docs/datenbank.md` | Wann welche Datenbank (Data Tables, NocoDB, Supabase). |
| `docs/tourismus-ideen.md` | Ideen-Menü: die Bootcamp-Themen und weitere Tourismus-Use-Cases. |
| `docs/*.pdf` | Vorbereitung und Schritt-für-Schritt-Anleitung (Quellen: `docs/*.quelle.html`). |

---

## 🧪 Dein erster Workflow

**Noch unsicher, was und wie?** Sag zuerst **„Hilf mir, meine Idee zu klären"**. Weißt du schon, was du willst, sag es einfach direkt, z. B.:
> „Bau mir einen Workflow: Ein Webhook empfängt einen Namen und antwortet mit einer freundlichen Begrüßung."

Claude baut den Workflow und **validiert, testet mit Beispieldaten, dokumentiert ihn mit Sticky Notes und macht einen Sicherheits-Check, automatisch**, ohne dass du extra darum bitten musst (so ist es in `CLAUDE.md` festgelegt). Am Ende berichtet Claude verständlich, was gemacht wurde.

**Lieber erst lernen?** Importiere diese Workflows in n8n (Workflows → Import from File). Alle erklären sich selbst per **Sticky Notes**:
- `examples/workflows/n8n-grundlagen.json`: Grundlogik, die **Trigger-Arten** und die wichtigsten Bausteine (Set, IF, Webhook, HTTP, Code, Switch, Filter …).
- `examples/workflows/ai-agent-grundlagen.json`: ein **KI-Agent** mit Sprachmodell (Claude), Memory und einem Tool, inklusive der speziellen `ai_*`-Verbindungen.
- `examples/workflows/ai-agent-datatable.json`: praxisnah: **Chat → KI-Agent → Ergebnis in eine n8n Data Table speichern** (Persistenz ganz ohne externe Datenbank).
- `examples/workflows/ai-agent-tool-webhook.json`: der **KI-Agent benutzt ein Tool** und ruft live den `hello-webhook` (oder jede andere API) auf. Schön in Kombination mit `hello-webhook.json`.
- `examples/workflows/hello-webhook.json`: ein Mini-Workflow zum schnellen Ausprobieren (und als Ziel des Agent-Tools oben). Auf der zentralen Bootcamp-n8n änderst du vor dem Aktivieren den Pfad im Webhook-Node auf `<kürzel>-hello` (z. B. `mk-hello`), denn jeder Webhook-Pfad darf dort nur einmal aktiv sein.

Die KI-Beispiele brauchen in n8n eine Credential **„Anthropic"**: den Key dafür findest du im [Zugangsbereich](https://buildbar.at/oew#zugang).

---

## 🎨 Optional: eigene Oberfläche (Frontend)

Die Skills **`frontend-build`** + **`frontend-scaffold`** befähigen Claude, **vollwertige Next.js-Frontends** zu bauen: Multi-Page-Apps, Dashboards, Tabellen und Diagramme, **Karten (MapLibre)**, Chat-Oberflächen usw. Angebunden wahlweise an **n8n-Webhooks** (Muster A), ein **FastAPI-Backend** (Muster B) oder **KI-Streaming** (Muster C). Stack: Next.js 16 · React 19 · TypeScript · Tailwind 4.

Sag z. B. *„Bau mir ein Dashboard, das die Ergebnisse aus meinem n8n-Workflow anzeigt"*.

### 👀 So siehst du deine App: öffentliche Adresse über buildbar
Im Web gibt es **keine lokale Vorschau** (`localhost` läuft nur auf einem eigenen Rechner). Stattdessen bekommst du **auf Zuruf eine öffentliche Internet-Adresse**.

**So geht's:** Sag **„Veröffentliche meine App"**. Claude prüft den Build, speichert deine Änderungen (Commit und Push auf den Arbeits-Branch der Sitzung) und bittet dich dann, den **Pull Request nach `main` zu übernehmen**: Veröffentlicht wird nur, was in `main` liegt. Claude sagt dir, wo du klickst. Danach stößt Claude beim Hub die Veröffentlichung an (`https://hub-oew.buildbar.at/deploy`) und du bekommst eine Adresse wie **`https://app-xxxx.buildbar.at`**. Der **erste Build dauert einige Minuten**; eine Fehlermeldung wie „no available server" in dieser Zeit ist normal. Nach jeder Änderung einfach neu veröffentlichen lassen.

> Braucht deine App Zugänge (z. B. Supabase oder einen n8n-Webhook)? Claude gibt sie **direkt beim Veröffentlichen** mit, nie ins Repo.

> ⚠️ **KI-Chat nicht ungeschützt veröffentlichen:** Der optionale Chat im `frontend-starter` (`/chat`) hat **keinen Login**. Mit einem echten `ANTHROPIC_API_KEY` könnte jede Person, die die Adresse kennt, auf Kosten dieses Keys chatten. Deshalb ist er standardmäßig aus (`CHAT_ENABLED`) und darf nur mit Schutz (Login, Zugangscode) öffentlich laufen. KI gehört im Bootcamp in n8n.

### Die Vorlagen zum Draufaufbauen
- **`frontend-starter/`**: minimales Beispiel: Formular → n8n-Webhook + optionaler KI-Chat. Details: `frontend-starter/README.md`.
- **`backend-example/`**: FastAPI-Service (`/health` + Beispiel-Endpoint), falls n8n für schwere Rechen-, Datenbank- oder Geo-Logik nicht reicht. Start: siehe `backend-example/README.md`.

---

## 🗄️ Brauche ich eine Datenbank?

Meistens reicht, was schon **bereitsteht**. Sag Claude einfach, was du brauchst:
- **Daten im Workflow** → **n8n Data Tables** (eingebaut, null Setup): der Standard.
- **Sichtbare Tabelle mit Oberfläche** → **NocoDB** (`https://nocodb.buildbar.at`, Self-Service): Du legst dir dort selbst einen **Account und API-Token** an, Claude bindet das als NocoDB-Credential in deine n8n ein.
- **App-Datenbank, Login, Dateien, Vektoren** → **ÖW-Supabase**: Project-URL, anon-Key und service_role-Key stehen im [Zugangsbereich](https://buildbar.at/oew#zugang). Der service_role-Key gehört **nur serverseitig in n8n**, nie ins Frontend oder Repo. Aus dem Frontend nur Tabellen mit aktivierter **Row Level Security (RLS)** und passenden Policies ansprechen. Ohne RLS die Daten nur über n8n lesen und schreiben (Supabase-Node mit service_role).

> **Gemeinsame Instanzen:** Nutze **eigene Tabellen bzw. ein eigenes Präfix** und verarbeite **keine echten personenbezogenen Daten**. Andere Teilnehmende können gemeinsam genutzte Tabellen sehen.

Details: **[docs/datenbank.md](docs/datenbank.md)**.

---

## 🏁 Am Ende: dein Repository

Am Tag 4 räumt Claude mit dir das Repository auf. Sag z. B. **„Räum mein Repository auf und exportiere meine Workflows"**. Danach liegt im Repo:
- `workflows/`: alle fertigen Workflows als JSON (ohne Keys, ohne echte Testdaten),
- `mein-use-case.md`: dein Steckbrief, ggf. der Prüfbericht,
- `README.md`: was dein Vorhaben tut, welche Zugänge und Freigaben es braucht, und ein klarer **nächster Schritt**.

Zum Schluss den Pull Request nach `main` übernehmen, dann ist alles in deinem Repository gesichert.

---

## ⚠️ Sicherheit
- **Niemals** API-Keys (n8n, Anthropic, Supabase service_role) in Workflow-Parameter, Code oder Repo schreiben: dafür gibt es **n8n-Credentials**.
- In der `.mcp.json` steht eine **Verbindungs-URL mit deinem persönlichen Token**. Dein **n8n-API-Key liegt beim Hub**, nicht im Repo, aber die URL ist **wie ein Passwort**. Dein Repository ist **privat** in deinem eigenen GitHub-Account: Lass es privat. Bevor du es teilst oder öffentlich machst, ersetze den Token wieder durch den Platzhalter `HIER-TRAEGT-DER-HUB-DEINEN-TOKEN-EIN`.
- Gemeinsame Instanzen (zentrale n8n, NocoDB, Supabase): **keine echten Kunden- oder personenbezogenen Daten**, nur **Test- oder Beispieldaten**.
- Keinen KI-Chat mit echtem Key ohne Schutz veröffentlichen (siehe oben).

## 👤 Gebaut von
**Friedemann Schütz**: **(KI-)Automatisierung, KI-Agenten, Frontends, Infrastruktur, Datenmanagement und Prozessoptimierung** (n8n Ambassador, Essen). Beratung · Umsetzung · Workshops und Schulungen.

Im Bootcamp arbeitest du mit bereitgestellten Bausteinen. Für **Unternehmen** setze ich Lösungen **self-hosted, DSGVO-konform** und produktionsreif um. Kostenloser Einstieg per **[KI-Check](https://ki-check.friedemann-schuetz.de)**.
→ **[friedemann-schuetz.de](https://friedemann-schuetz.de)** · [KI-Check](https://ki-check.friedemann-schuetz.de) · [LinkedIn](https://www.linkedin.com/in/friedemann-schuetz)

## 📄 Lizenz und Dank
MIT (siehe `LICENSE`).

Mit großem Dank an:
- **[Romuald Członkowski / czlonkowski](https://github.com/czlonkowski)**: die gebündelten n8n-Kern-Skills und der **n8n-MCP-Server**, auf dem das Ganze läuft.
- **[Matt Pocock](https://github.com/mattpocock/skills)**: Vorlage für den Skill `grill-me`.
- **[snipKI](https://snipki.de)**: Grundlage und Idee dieser Vorlage.

Details in `ATTRIBUTION.md`.
