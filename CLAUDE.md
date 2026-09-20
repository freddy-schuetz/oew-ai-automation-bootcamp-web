# AI Automation Bootcamp (ÖW): n8n + Claude Code, Web-Variante

Diese Datei wird beim Öffnen des Projekts automatisch geladen und enthält Arbeitsweise, Standard-Prozess und die wichtigsten n8n-Konventionen. **Erst-Setup noch nicht erledigt?** → siehe [README.md](README.md).

## Was ist das?
Deine Arbeitsgrundlage für das **AI Automation Bootcamp** der **Österreich Werbung (ÖW)** in Kooperation mit **buildbar**. Du baust mit **Claude Code + n8n-mcp** Automatisierungs-Workflows in **n8n**, dazu optional Starter für **Frontend** (Next.js) und **Backend** (FastAPI). Die geladenen Skills helfen Claude, korrekte Workflows zu erzeugen.

- **Eigenes Vorhaben:** Jede:r Teilnehmende arbeitet am **eigenen** Vorhaben, im **eigenen** privaten Repository.
- **Ablauf über 4 Tage:** Tag 1 Planung im Sparring mit der KI (Skills `idee-klaeren` und `grill-me`), ab Tag 2 Umsetzung, Tag 4 Ergebnisse zeigen und Repository aufräumen.
- **Ziel:** eine erste funktionierende Workflow-Lösung, ein eigenes Code-Repository und ein klarer nächster Schritt.

> **Web-Variante:** Läuft in **Claude Code Web ([claude.ai/code](https://claude.ai/code))**, ohne lokale Installation. Die n8n ist per **HTTP-MCP** in `.mcp.json` angebunden: Der Hub (**[hub-oew.buildbar.at](https://hub-oew.buildbar.at)**) hat beim Anlegen des Repos eine Verbindungs-URL mit einem persönlichen Token eingetragen, der n8n-API-Key bleibt serverseitig beim Hub. Der Token wirkt wie ein Passwort (Zugriff auf die n8n über den Hub, Veröffentlichen), siehe Ergebnis-Regel Punkt 5. **Keine lokale Vorschau** (kein `localhost`): Frontends werden über den Hub veröffentlicht (`/deploy`) und sind danach unter einer Adresse wie `https://app-xxxx.buildbar.at` erreichbar.
>
> **Adressen:** Event-Seite [buildbar.at/oew](https://buildbar.at/oew) · Zugangsbereich mit Passwort [buildbar.at/oew#zugang](https://buildbar.at/oew#zugang) · Anleitung Web [buildbar.at/oew/starten/web](https://buildbar.at/oew/starten/web) · Themen [buildbar.at/oew/themen](https://buildbar.at/oew/themen) · Grundlagen [buildbar.at/oew/grundlagen](https://buildbar.at/oew/grundlagen)

## Arbeitsweise (WICHTIG: so verhältst du dich)

### Erster Kontakt: begrüßen und Verbindung automatisch bestätigen
Bei der **ersten Nachricht** der Person (egal was sie schreibt, z. B. „Los geht's", „Hallo" oder direkt eine Idee) führst du Folgendes **automatisch** aus. Die Person muss **kein** technisches Kommando kennen.
1. **Begrüße** kurz und freundlich (Einsteiger-Publikum).
2. Prüfe **still** die n8n-Verbindung (`n8n_health_check`) und bestätige in **einem** Satz: „Deine n8n ist verbunden ✅." Schlägt die Prüfung fehl:
   - Steht in `.mcp.json` noch `HIER-TRAEGT-DER-HUB-DEINEN-TOKEN-EIN`, wurde das Repo **nicht** über den Hub angelegt (z. B. die öffentliche Vorlage geöffnet). Dann freundlich auf **[hub-oew.buildbar.at](https://hub-oew.buildbar.at)** verweisen: Dort entsteht das eigene Repo mit fertiger Verbindung.
   - Sonst: freundlich sagen, dass die Verbindung noch nicht steht, und über **[hub-oew.buildbar.at](https://hub-oew.buildbar.at)** neu verbinden lassen (n8n-Adresse und API-Key prüfen; für die zentrale Bootcamp-n8n stehen sie im Zugangsbereich).
3. **Orientiere:** Hat die Person schon ein Vorhaben genannt → leg los (bei vager Idee zuerst `idee-klaeren`). Wenn nicht → frag freundlich: „Sollen wir zuerst dein Vorhaben klären, oder hast du schon etwas Konkretes? Beschreib einfach, was dich im Arbeitsalltag Zeit kostet." (Ideen-Menü mit den Bootcamp-Themen: `docs/tourismus-ideen.md`.)
4. **Event-Infos bei Bedarf:** Fragt die Person nach **Agenda, Zeiten, Ort, Links, Themen oder Bausteinen** des Bootcamps → lies **[buildbar.at/oew/claude.md](https://buildbar.at/oew/claude.md)** per WebFetch (reines Markdown, aktuell, ohne Geheimnisse) und antworte daraus. **Zugangsdaten** stehen dort bewusst **nicht**: Sie liegen im passwortgeschützten **[Zugangsbereich](https://buildbar.at/oew#zugang)**. Den kann nur die Person selbst öffnen; bitte sie, die benötigten Werte von dort zu kopieren. Versuche nicht, den Zugangsbereich selbst abzurufen.

### Grundregeln
- **Zielgruppe sind Einsteiger:innen** aus Tourismusorganisationen (LTOs, DMOs, TVBs, Kulturbetriebe) mit wenig Code-Erfahrung. Erkläre in **einfacher Sprache**, ohne unerklärten Fachjargon.
- **Erst das Vorhaben klären (Tag 1 oder bei Unsicherheit):** Ist die Person unsicher, was sie bauen soll, beschreibt sie ihr Vorhaben vage, oder geht es direkt nach dem Setup los → nutze **zuerst** den Skill `idee-klaeren` (freundliches Interview → **Prozess-Steckbrief**), **bevor** du baust. Biete es proaktiv an. Steht der Steckbrief, darfst du **einmal** anbieten, den Plan mit `grill-me` abzuklopfen; die Grill-Session läuft nur, wenn die Person zustimmt oder selbst „grill mich" sagt.
- **Themen aus der Ausschreibung → passende Skills:** Passt das Vorhaben zu einem Bootcamp-Thema, weise auf den passenden Skill hin und nutze ihn:

  | Thema (Ausschreibung) | Skill |
  |---|---|
  | Meetingnotizen strukturieren | `meetingnotizen` |
  | E-Mail-Anfragen sortieren und Antwortentwürfe | `mail-triage-entwuerfe` |
  | Wiederkehrende Berichte | `bericht-zeitgesteuert` |
  | Terminfindung und Koordination | `terminkoordination` |
  | Daten analysieren und visualisieren | `daten-visualisieren` |
  | Präsentationen effizienter erstellen | `praesentation` |
  | Zugriff auf Postfach, Kalender, Teams oder Google-Konten | `m365-google-freigaben` |

  Die Skills liegen unter `.claude/skills/`, zu jedem Thema gibt es einen Beispiel-Workflow unter `examples/workflows/`. Überblick für Menschen: [buildbar.at/oew/themen](https://buildbar.at/oew/themen).
- **Freigaben früh prüfen (spätestens am Tag 1):** Braucht das Vorhaben Zugriff auf **Postfach, Kalender oder Teams** (Microsoft 365) oder auf ein **Google-Konto**, kläre sofort, ob eine **IT-Freigabe** nötig ist und wer bei der Organisation Admin ist (Skill `m365-google-freigaben`). Hintergrund:
  - Microsoft 365: Zugriff auf Outlook-Postfach und Kalender braucht in Standard-Tenants (von Microsoft empfohlene Consent-Policy) eine **Admin-Freigabe**. Der Teams-Node und Teams-Transkripte brauchen **immer** Admin-Consent. IMAP mit Passwort ist bei Exchange Online abgeschaltet.
  - Google: Auf einer selbst gehosteten n8n ist eine **eigene OAuth-App** nötig. Steht sie im Status „Testing", laufen die Refresh-Tokens nach **7 Tagen** ab.
  - Ist die Freigabe im Bootcamp nicht zu bekommen: mit **Beispieldaten** bauen (z. B. Beispiel-Mails in einer Data Table oder über ein Formular) und die Freigabe als **nächsten Schritt** im README festhalten.
- **Sei proaktiv:** Führe den Standard-Prozess **selbstständig** durch. Frag nicht für jeden Schritt um Erlaubnis.
- **Nach jedem Workflow AUTOMATISCH (ohne Nachfrage):** validieren → mit **Testdaten testen** (Skill `n8n-testdaten`) → mit **Sticky Notes dokumentieren** (Skill `n8n-dokumentation`) → **Security-Check** (Skill `n8n-security-audit`). Ist der Workflow fertig, zusätzlich einen kurzen **Prüfbericht** (Skill `n8n-pruefbericht`).
- **Silent Execution:** Werkzeuge ohne Zwischenkommentar ausführen, danach **kurz und verständlich** berichten, was gebaut, getestet und dokumentiert wurde.

### Ergebnis-Regel: am Ende liegt alles im eigenen Repository
Das Bootcamp-Ergebnis ist ein **eigenes Code-Repository**. Sorge dafür, dass spätestens am Tag 4 (besser nach jedem fertigen Zwischenstand) Folgendes im Repo liegt:
1. **Workflows als JSON** unter `workflows/`: je Workflow eine Datei `workflows/<kurzname>.json`, geholt mit `n8n_get_workflow`. Vor dem Speichern prüfen: keine Keys oder Passwörter im JSON, `pinData` mit echten Daten entfernen. Credential-Werte sind nicht enthalten, wohl aber Credential-Referenzen (`id` und `name`). Deshalb die `id` entfernen oder durch einen Platzhalter ersetzen und nur den Namen stehen lassen.
2. **Steckbrief** `mein-use-case.md` (aus `idee-klaeren`) und, falls erstellt, der **Prüfbericht**.
3. **README.md** des Repos mit: Was das Vorhaben tut, welche Workflows und Bausteine es nutzt, welche Credentials und Freigaben nötig sind, und einem Abschnitt **„Nächster Schritt"** (ein klarer, konkreter Schritt nach dem Bootcamp).
4. Änderungen **committen und pushen**, danach den Pull Request nach `main` übernehmen lassen (siehe unten). Erst dann ist das Ergebnis im eigenen Repository gesichert.
5. **Verbindungs-URL wie ein Passwort behandeln:** Der Token in der `url` von `.mcp.json` gibt über den Hub Zugriff auf die n8n (auf der zentralen n8n auf alle Workflows und Credentials) und erlaubt das Veröffentlichen. Das Repository bleibt **privat**. Will die Person es teilen oder öffentlich machen, weise sie darauf hin und ersetze vorher den Token in `.mcp.json` wieder durch den Platzhalter `HIER-TRAEGT-DER-HUB-DEINEN-TOKEN-EIN`. Den Token nie in README, Steckbrief, Prüfbericht oder Chat-Antworten zum Weitergeben kopieren.

### Frontend/App veröffentlichen (auf Zuruf, KEIN localhost)
In Claude Code Web gibt es **keine lokale Vorschau** (`npm run dev` bzw. `localhost:3000` ist nicht erreichbar). Will die Person ihre App **zeigen oder veröffentlichen**, gehst **du** so vor (sie tippt keine Befehle):
1. **Token holen:** Lies `.mcp.json`. Die `url` hat die Form `https://hub-oew.buildbar.at/g/<TOKEN>/mcp`; nimm den `<TOKEN>`-Teil. Steht dort noch der Platzhalter, ist kein Veröffentlichen möglich → auf [hub-oew.buildbar.at](https://hub-oew.buildbar.at) verweisen.
2. **Build prüfen:** im App-Ordner `npm install` und `npm run build` (fängt Fehler vor dem Veröffentlichen ab).
3. **Committen und pushen:** In claude.ai/code geht `git push` nur auf den **Arbeits-Branch der Sitzung**.
4. **Pull Request nach `main` übernehmen (Pflicht vor dem Deploy):** Veröffentlicht wird **aus `main`**. Schlage deshalb vor, jetzt einen Pull Request vom Arbeits-Branch nach `main` zu erstellen und zu mergen, und sag der Person genau, wo sie klickt: in claude.ai/code den Pull Request erstellen, dann auf GitHub im Pull Request auf **„Merge pull request"** und **„Confirm merge"**. Warte, bis die Person den Merge bestätigt.
5. **Veröffentlichen:** `curl -s -X POST https://hub-oew.buildbar.at/deploy -d "token=<TOKEN>" -d "base_dir=/frontend-starter"`. `base_dir` ist der Ordner mit der `package.json` der App (Standard `/frontend-starter`). Ein eigenes Frontend ebenfalls in einem Unterordner anlegen (z. B. `/mein-frontend`): Der Repo-Root wird beim Veröffentlichen über den Hub nicht unterstützt. **Braucht die App Env-Variablen** (z. B. n8n-Webhook-Adresse, Supabase-URL und anon-Key), gib sie **beim ersten Deploy** mit, sonst startet die App nicht: zusätzlich `--data-urlencode $'env=NEXT_PUBLIC_N8N_BASE=…\nNEXT_PUBLIC_SUPABASE_URL=…\nNEXT_PUBLIC_SUPABASE_ANON_KEY=…'` (je Zeile ein `KEY=VALUE`; alle `NEXT_PUBLIC_*`, die der Code nutzt, müssen dabei sein). Server-Secrets nur so übergeben, **nie ins Repo**.
6. Die JSON-Antwort enthält eine **`url`** (Form `https://app-xxxx.buildbar.at`). Nenne sie und sag dazu: Der **erste Build dauert einige Minuten**; zeigt die Seite solange eine Fehlermeldung (z. B. „no available server"), einfach warten und neu laden. Für jede weitere sichtbare Änderung: committen, pushen, Pull Request mergen **und** den `/deploy`-Aufruf wiederholen → Update unter derselben Adresse.

⚠️ **Offener KI-Proxy im Frontend-Starter:** `frontend-starter/app/api/chat/route.ts` hat **keinen Login**. Wer die Adresse der App kennt, kann darüber auf Kosten des hinterlegten `ANTHROPIC_API_KEY` mit Claude chatten. Deshalb:
- Den KI-Chat nur bewusst einschalten (`CHAT_ENABLED=true`) und **nie** mit einem echten Key öffentlich veröffentlichen, solange die App **keinen Schutz** hat (Login, Zugangscode). Das gilt besonders für den gemeinsamen Bootcamp-Key.
- Der Normalfall für KI im Bootcamp ist **n8n** (KI-Nodes mit der Credential „Anthropic"), nicht der Chat im Frontend.

## n8n, KI-Zugang und Datenbanken

### Welche n8n?
- **Zentrale Bootcamp-n8n:** `https://n8n-oew.buildbar.at`. Adresse, Login und API-Key stehen im [Zugangsbereich](https://buildbar.at/oew#zugang). Es gibt **einen gemeinsamen Login für alle**, und **alle sehen alle Workflows und Credentials**. Deshalb: Workflow- und Tabellennamen mit **eigenem Kürzel** beginnen (z. B. `mk_anfragen-sortieren`). **Auch Webhook-Pfade mit eigenem Kürzel** (z. B. `mk-hello`): Ein Webhook-Pfad darf in einer n8n nur einmal aktiv sein, sonst lässt sich der Workflow nicht aktivieren. Keine privaten oder produktiven Zugänge (eigenes Postfach, echte Kundendaten) in der zentralen n8n hinterlegen, nur Test- und Beispielzugänge.
- **Eigene n8n** mit API-Zugang ist erlaubt (dort bleiben eigene Credentials privat).
- Die **kostenlose n8n-Cloud-Testversion reicht nicht**: Sie hat **keine öffentliche API**, n8n-mcp kann sich damit nicht verbinden.

### KI-Zugang
Im Zugangsbereich liegt ein **Anthropic-API-Key mit Ausgabelimit**. Trag ihn in n8n als Credential mit dem Namen **„Anthropic"** ein (falls es sie in der n8n noch nicht gibt) und nutze sie in den KI-Nodes. Den Key **nie** in Workflow-Parameter, Code, Repo oder Chat-Frontend schreiben.

### Datenbank: nach Bedarf einbinden
Für die meisten Fälle reichen **n8n Data Tables** (eingebaut, `n8n_manage_datatable`): nutze sie als **Default**. Darüber hinaus stehen Bausteine bereit. **Biete sie aktiv an, wenn das Vorhaben sie braucht**, dräng sie aber niemandem auf:

- **NocoDB** (sichtbare Tabellen mit Oberfläche, Self-Service): `https://nocodb.buildbar.at`. Sinnvoll, wenn Daten auch außerhalb von n8n angesehen oder gepflegt werden sollen. So bindest du es ein:
  1. Bitte die Person, auf **`https://nocodb.buildbar.at`** einen eigenen Account anzulegen, eine **Base/Tabelle** zu erstellen und unter **Account → Tokens** einen **API-Token** zu erzeugen.
  2. Lege in der n8n eine **NocoDB-Credential** an (Host `https://nocodb.buildbar.at` + API-Token) und nutze die **NocoDB-Nodes** (Zeilen lesen/schreiben).
  3. Erkläre kurz und einfach, wozu das gut ist.
- **ÖW-Supabase** (Postgres, Login/Auth, Datei-Storage, Vektoren): Project-URL, `anon`-Key und `service_role`-Key stehen im [Zugangsbereich](https://buildbar.at/oew#zugang). Sinnvoll, wenn eine **App** eine Datenbank, Login, Dateien oder Vektorsuche braucht.
  1. `anon`-Key + Project-URL dürfen ins Frontend (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, beim Deploy mitgeben), **aber nur zusammen mit Row Level Security** (Punkt 2).
  2. ⚠️ **Row Level Security (RLS):** Aus dem Frontend nur Tabellen mit aktivierter Row Level Security (RLS) und passenden Policies ansprechen. Ohne RLS die Daten nur über n8n lesen und schreiben (Supabase-Node mit service_role). Ohne RLS kann jede Person, die die App-Adresse kennt, mit dem anon-Key alle Tabellen (und Storage-Buckets ohne Policy) aller Teilnehmenden lesen und beschreiben; das Präfix schützt davor nicht. **Deine Anweisung:** Bevor du Frontend-Code schreibst, der die Supabase direkt anspricht, lass RLS mit passenden Policies für die eigene Tabelle einschalten (im Zweifel beim Trainer nachfragen) oder wähle den Weg über n8n (das Frontend ruft dann nur den n8n-Webhook auf).
  3. Der `service_role`-Key gehört **nur serverseitig in n8n** (Supabase-Credential), **nie** ins Frontend, ins Repo oder in eine Env-Liste einer öffentlichen App.
  4. ⚠️ **Gemeinsame Instanz:** Alle nutzen dieselben Keys. Eigene Tabellen mit **eigenem Präfix** anlegen, **keine echten personenbezogenen Daten**, fremde Tabellen sind sichtbar. Sag das klar dazu.
- **Frontend veröffentlichen:** siehe Abschnitt **„Frontend/App veröffentlichen"** oben.

## Workflow-Erstellung: Standard-Prozess
Diesen Ablauf führst du **automatisch** durch (Schritte 6 bis 9 und 11 ohne Extra-Aufforderung):

1. `tools_documentation()`: Best Practices laden
2. `search_templates({query: "..."})`: passende Vorlage prüfen
3. Passt eine Vorlage: `n8n_deploy_template({templateId})`, **Autor nennen**
4. Sonst: `search_nodes()` → `get_node({detail: "standard"})` → `n8n_create_workflow()`
5. Iterativ erweitern: `n8n_update_partial_workflow({id, intent, operations})`
6. Validieren: `n8n_validate_workflow({id})` → `n8n_autofix_workflow({id})`
7. Testdaten generieren und **in der Instanz testen**; das fängt Laufzeitfehler, die der statische Validator nicht sieht (Skill: `n8n-testdaten`)
8. **Workflow dokumentieren** mit Sticky Notes (Skill: `n8n-dokumentation`)
9. Security-Checkliste (Skill: `n8n-security-audit`)
10. Aktivieren: `n8n_update_partial_workflow({operations: [{type: "activateWorkflow"}]})`
11. **Prüfbericht** erstellen, sobald der Workflow fertig ist (Skill: `n8n-pruefbericht`), und den Workflow nach `workflows/` exportieren (Ergebnis-Regel)

## Kritische Konventionen

### nodeType-Formate (je nach Tool unterschiedlich!)
| Tool-Kategorie | Format | Beispiel |
|---------------|--------|----------|
| Search/Validate | `nodes-base.*` | `nodes-base.slack` |
| Workflow-Tools | `n8n-nodes-base.*` | `n8n-nodes-base.slack` |
| AI/LangChain | `@n8n/n8n-nodes-langchain.*` | `@n8n/n8n-nodes-langchain.agent` |

### Webhook-Datenstruktur
Webhook-Daten liegen unter `.body`:
```
FALSCH:  {{$json.email}}
RICHTIG: {{$json.body.email}}
```

### Expression-Syntax
- Expressions immer mit `{{}}`: `{{$json.field}}`
- In **Code Nodes KEIN** `{{}}`: `$json.field`
- Node-Namen mit Leerzeichen in Quotes: `{{$node["HTTP Request"].json.data}}`
- Node-Namen sind case-sensitive

### IF-Node Multi-Output Routing (KRITISCH!)
IF-Nodes haben zwei Outputs. `branch` setzen, sonst landen beide Connections am selben Output:
```json
{type: "addConnection", source: "If", target: "True Handler", sourcePort: "main", targetPort: "main", branch: "true"}
{type: "addConnection", source: "If", target: "False Handler", sourcePort: "main", targetPort: "main", branch: "false"}
```
Switch-Node: `case: 0`, `case: 1`, …

### addConnection-Syntax (vier separate String-Parameter!)
```json
{ "type": "addConnection", "source": "Webhook", "target": "Slack", "sourcePort": "main", "targetPort": "main" }
```
`removeConnection` hat dasselbe Format.

### AI-Workflow-Connections
Für LangChain/AI-Nodes `sourceOutput` nutzen: `ai_languageModel`, `ai_tool`, `ai_memory`, `ai_embedding`, `ai_vectorStore`, `ai_outputParser`, `ai_document`, `ai_textSplitter`.

⚠️ **AI-Tool-Node-Namen:** Der Name eines als Tool verbundenen Nodes (`ai_tool`) wird zum **Funktionsnamen fürs LLM**. Daher **nur Buchstaben, Ziffern und Unterstriche** (kein Leerzeichen, Bindestrich, keine Klammer, kein Umlaut, nicht mit Ziffer beginnen). Beispiel: `hello_webhook_aufrufen`, nicht „hello-webhook aufrufen".

⚠️ **AI-Sub-Nodes haben kein „Execute":** Tool-, Modell- und Memory-Nodes laufen **nur, wenn der Agent sie aufruft**. Den Workflow über den **Chat** starten, **nicht** einen Sub-Node einzeln per „Test step" ausführen (sonst Fehler „has a supplyData method but no execute method").

⚠️ **HTTP-Tool für Agents:** den **regulären HTTP Request als Tool** verwenden (`n8n-nodes-base.httpRequestTool`, v4.x) mit `$fromAI('feld','Beschreibung','string')` für vom LLM gefüllte Werte, **nicht** den Legacy-Node `@n8n/n8n-nodes-langchain.toolHttpRequest` (v1.1, deprecated). Allgemein gilt: Fast jeder Standard-Node kann als Tool an den Agent gehängt werden.

### Ein grüner Lauf ist kein Beweis

Die teuersten Fehler in n8n melden **keinen Fehler**. Der Ablauf läuft durch, ist
grün, und das Ergebnis ist trotzdem falsch. Beim Vorabbau der Bootcamp-Use-Cases
waren das **neun von dreizehn** gefundenen Stolperstellen.

**Deshalb nach jedem Abruf prüfen, ob das ERWARTETE Ergebnis da ist**, nicht ob der
Aufruf funktioniert hat:

```javascript
const zeilen = $input.all();
if (zeilen.length < ERWARTET) {
  throw new Error('Nur ' + zeilen.length + ' statt ' + ERWARTET + '. Nicht weiterarbeiten.');
}
```

Diese fünf kosten sonst je eine halbe Stunde Suche (alle am 19.09.2026 gemessen):

| Wo | Was still passiert |
|---|---|
| **HTTP-Node, Query-Parameter** | Ein Parameter lässt sich **nicht mehrfach** senden. Wer `parameters=a`, `parameters=b` einzeln anlegt, sendet nur den letzten. Als Komma-Liste schreiben: `parameters=a,b` |
| **Datei-Upload** | n8n hängt einen **Index** an den Feldnamen: hochgeladen als `datei`, angekommen als `datei0`. Und die Endung wird aus dem **MIME-Typ** geraten, nicht aus dem Namen — `report.xlsx` kann als `bin` ankommen |
| **PDF einlesen** | Ein **eingescanntes** PDF hat keine Textebene. `extractFromFile` liefert einen leeren String, ohne zu scheitern. Auf Mindestlänge prüfen |
| **Leeres Ergebnis** | **0 Items stoppen die ganze Kette.** Ein korrekt leeres Ergebnis (etwa: kein Feiertag in dieser Woche) sieht dann aus wie ein Absturz. `alwaysOutputData` setzen |
| **Zählfelder von APIs** | Felder wie `total_rows` meinen oft den **Gesamtbestand**, nicht die Treffer der Abfrage. Nie als Trefferzahl lesen, immer die Liste selbst zählen |

**Und für Logik, die man prüfen kann:** erst ausserhalb von n8n testen, dann
einbauen. n8n speichert kaputten Code stillschweigend, der Fehler kommt zur
Laufzeit — und vor Publikum ist das der schlechteste Zeitpunkt.

### Workflows ohne Webhook: von Hand starten

Über den Web-Weg kannst du nur Workflows **mit Webhook** selbst auslösen. Der Hub stellt die
Verbindung zur n8n her, gibt aber den zusätzlichen Schlüssel nicht weiter, den n8n für das
Starten anderer Trigger verlangt. Bei einem Workflow mit **Zeitplan (Schedule Trigger)** oder
**manuellem Trigger** antwortet `n8n_test_workflow` deshalb mit
`Workflow cannot be triggered externally`. Das ist **kein** Fehler im Workflow, sondern eine
Grenze des Web-Wegs. Aus demselben Grund lassen sich Spalten einer bestehenden Data Table nicht
nachträglich per MCP ändern; das geht im n8n-Editor.

**So testest du trotzdem, es gibt zwei Wege:**
- **Im n8n-Editor von Hand starten:** Bitte die Person, den Workflow in
  `https://n8n-oew.buildbar.at` zu öffnen und auf **Execute workflow** zu klicken. Danach
  siehst du unter **Executions**, was jeder Knoten geliefert hat. Das ist der Normalweg für
  Berichte und alles Zeitgesteuerte.
- **Zum Entwickeln einen Webhook danebenhängen:** zusätzlich einen Webhook-Trigger an den ersten
  Verarbeitungsschritt hängen (Pfad mit eigenem Kürzel, z. B. `mk-test`). Dann kannst du den
  Ablauf per MCP auslösen und das Ergebnis selbst prüfen. Vor der Übergabe den Test-Webhook
  wieder entfernen, sonst ist der Ablauf für jeden auslösbar, der die Adresse kennt.

**Sag klar, wenn du einen Workflow nicht selbst starten konntest**, und bitte um den Klick im
Editor. Eine grüne Validierung ist kein Testlauf.

### Mailversand: Brevo, nicht SMTP

**Mailversand funktioniert.** Das Credential **„Brevo"** liegt auf der zentralen Bootcamp-n8n
und ist einsatzbereit. Nimm den Node **`n8n-nodes-base.sendInBlue`** (heisst im Editor „Brevo"),
`resource: "email"`, `operation: "send"`:

```
sender        <Absender aus dem Zugangsbereich>  (muss in Brevo verifiziert sein)
receipients   empfaenger@example.com           (Achtung: n8n schreibt das Feld falsch,
                                                mit "ei" statt "i" — receipients)
subject       {{ $json.betreff }}
textContent   {{ $json.bericht }}
sendHTML      false, oder true für HTML
```

Kontingent: **300 Mails pro Tag**, für das Bootcamp reichlich.

⚠️ **Nimm nicht den Node „Send Email".** Der spricht SMTP, und die Ports 25, 465 und 587 sind
auf dem Server gesperrt (wie bei fast allen Hostern, gegen Spam-Versand). Der Node wartet
**240 Sekunden** und meldet dann nur `Connection timeout` — er sieht also nicht nach einem
Konfigurationsfehler aus, sondern nach einem hängenden Workflow. Brevo läuft über HTTPS und
hat das Problem nicht.

**Eigener Absender?** In Brevo muss jede Absenderadresse verifiziert sein. Wer eine eigene
verwenden will, trägt sie unter Senders ein und bestätigt die Mail. Für alles andere den
Absender aus dem Zugangsbereich nehmen.

**Ohne Versand geht es auch:** Ergebnis in eine Data Table schreiben oder den Webhook die
fertige Liste zurückgeben lassen und im Frontend anzeigen. Für Berichte, die jemand prüfen
soll, bevor sie rausgehen, eignet sich zusätzlich ein Outlook- oder Gmail-**Entwurf**
(`resource: "draft"`).

## Best Practices

### Do
- **Template-First**: immer Templates prüfen, bevor von Grund auf gebaut wird
- **Explicit Parameters**: ALLE Parameter explizit setzen (Default-Werte sind die häufigste Fehlerquelle)
- Workflows **iterativ** bauen, `intent` bei Updates angeben
- Nach signifikanten Änderungen validieren; Validation-Profil `runtime`
- Batch-Operationen in **einem** `n8n_update_partial_workflow`-Call
- `includeExamples: true` für echte Konfigurationsbeispiele

### Don't
- nodeType-Prefix vergessen
- Validation vor Aktivierung überspringen
- Expression-Syntax in Code Nodes verwenden
- **Code Nodes nutzen, wenn Standard-Nodes verfügbar sind** (Code ist der letzte Ausweg)

## Sicherheit
1. **API-Keys niemals** in Workflow-Parametern: n8n **Credentials** nutzen!
2. Security-Checkliste vor Aktivierung (Skill: `n8n-security-audit`)
3. Keine personenbezogenen Daten in Node-Namen oder Notes; in gemeinsamen Instanzen (zentrale n8n, NocoDB, Supabase) nur **Test- oder Beispieldaten**
4. Keine Secrets ins Repo: nicht in Workflow-JSON unter `workflows/`, nicht in `.env`-Dateien, nicht in README oder Steckbrief
5. Keinen offenen KI-Chat mit echtem Key veröffentlichen (siehe Warnung oben)
6. Workflow-Änderungen werden während der Sitzung in `backup/` protokolliert (nicht im Repo). Dauerhaft gesichert ist nur, was unter `workflows/` committet und nach `main` übernommen ist.
7. Die Verbindungs-URL in `.mcp.json` ist wie ein Passwort: Repository privat lassen, vor dem Teilen den Token durch den Platzhalter ersetzen (Ergebnis-Regel Punkt 5)

## Geladene Skills
**Am Anfang (Tag 1):** `idee-klaeren`: Vorhaben mit der Person klären → klarer Bau-Auftrag (Steckbrief); Ideen-Menü in `docs/tourismus-ideen.md` · `grill-me`: Härtetest für einen **fertigen** Plan (nach dem Steckbrief einmal anbieten, sonst auf Wunsch).
**Bootcamp-Themen:** `meetingnotizen`, `mail-triage-entwuerfe`, `bericht-zeitgesteuert`, `terminkoordination`, `daten-visualisieren`, `praesentation`, `m365-google-freigaben`.
**n8n:** `n8n-mcp-tools-expert`, `n8n-workflow-patterns`, `n8n-node-configuration`, `n8n-expression-syntax`, `n8n-validation-expert`, `n8n-code-javascript`, `n8n-code-python` (von czlonkowski/n8n-skills) · `n8n-testdaten`, `n8n-dokumentation`, `n8n-security-audit`, `n8n-pruefbericht`
**Frontend/Backend (optional):** `frontend-build`, `frontend-scaffold`, `backend-fastapi`; lauffähige Beispiele in `frontend-starter/` und `backend-example/`.
