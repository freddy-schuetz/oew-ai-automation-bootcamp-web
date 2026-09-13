---
name: meetingnotizen
description: Baut aus Besprechungsnotizen, Transkripten oder PDF-Protokollen einen n8n-Workflow, der Zusammenfassung, Entscheidungen, Aufgaben und offene Fragen strukturiert ausgibt. Verwenden, wenn jemand Meetingnotizen, Protokolle oder Teams-Transkripte automatisch auswerten, Aufgaben daraus ableiten oder in eine Tabelle, Outlook oder Teams bringen will.
---

# Meetingnotizen strukturieren

Ziel: Aus Rohtext (Notizen, Transkript, PDF) wird ein Kurzprotokoll mit festem Schema. Der erste Stand läuft ohne jede Freigabe, der Versand kommt später dazu.

**Startpunkt:** `examples/workflows/meetingnotizen-aufgaben.json` (Formular, PDF-Weiche, Information Extractor, Ergebnisseite, Data Table). Lesen, auf das Vorhaben zuschneiden, dann per n8n-mcp anlegen. Nicht alles neu erfinden.

## Wann verwenden
- Jour fixe, Leistungsträger-Treffen, Messe-Nachbesprechung, Vorstandssitzung: Notizen sollen zu Protokoll und Aufgabenliste werden.
- Teams- oder Zoom-Transkripte sollen ausgewertet werden (erst als Datei oder Text, später automatisch).
- Aufgaben aus Besprechungen sollen in einer Tabelle, in To Do oder als Mail landen.

Nicht passend: Terminfindung (eigener Ablauf), reine Audio-Transkription (braucht zusätzlich einen Speech-to-Text-Dienst).

## Empfohlener Aufbau (Knotenkette)
1. `n8n-nodes-base.formTrigger` (im Beispiel typeVersion 2.3): Felder `Besprechung` (text), `Notizen` (textarea), `Datei` (file, `multipleFiles: false`). `responseMode: "lastNode"`, eindeutiger Pfad in `options.path`.
2. `n8n-nodes-base.if` „Text eingefügt?“: `($json.Notizen || '').trim()` ist nicht leer.
3. Falsch-Zweig: `n8n-nodes-base.extractFromFile`, `operation: "pdf"`, `binaryPropertyName` = Feld-Label (`Datei`). Am Knoten `onError: "continueRegularOutput"` setzen: Bei leerem Formular gibt es kein Binärfeld, und der Knoten bricht sonst mit einem Fehler zu fehlenden Binärdaten ab. Das Formular zeigt dann eine Fehlermeldung statt der Hinweisseite.
   Sollen auch .txt oder .vtt gehen: `acceptFileTypes` auf `.pdf,.txt,.vtt` erweitern, vor dem Auslesen per `n8n-nodes-base.switch` auf `(($binary.Datei || {}).fileExtension || '').toLowerCase()` verzweigen (Fallback-Ausgang für „keine Datei“ zur Hinweisseite) und für Text einen zweiten Knoten mit `operation: "text"` und `destinationKey: "text"` nehmen. Ohne `destinationKey` landet der Text in `data`, nicht in `text`.
4. `n8n-nodes-base.set` je Zweig: einheitliche Felder `text`, `besprechung`, `quelle`. Im Datei-Zweig `text` als `{{ $json.text || '' }}`, damit ein Fehler-Item leeren Text liefert.
5. `n8n-nodes-base.if` „Genug Text?“ (Länge ab etwa 50 Zeichen). Sonst `n8n-nodes-base.form` mit `operation: "completion"` und klarer Fehlermeldung. Nie ein leeres Protokoll zeigen.
6. `@n8n/n8n-nodes-langchain.informationExtractor` mit `schemaType: "manual"` (JSON-Schema: `titel`, `datum`, `zusammenfassung`, `entscheidungen[]`, `aufgaben[{aufgabe, verantwortlich, faellig_bis, beleg}]`, `offene_fragen[]`) und `@n8n/n8n-nodes-langchain.lmChatAnthropic` an `ai_languageModel`. Ergebnis liegt unter `$json.output`. Alternative: `@n8n/n8n-nodes-langchain.chainLlm` mit `hasOutputParser: true` plus `@n8n/n8n-nodes-langchain.outputParserStructured`.
7. `n8n-nodes-base.splitOut` auf `output.aufgaben`, dann `n8n-nodes-base.dataTable` (`operation: "insert"`, Tabelle per `mode: "name"`), Spalten z. B. besprechung, aufgabe, verantwortlich, faellig_bis, status.
8. `n8n-nodes-base.set` baut Markdown aus dem Schema (Listen per Ausdruck, nicht per KI), `n8n-nodes-base.markdown` (`markdownToHtml`), `n8n-nodes-base.form` (`operation: "completion"`, `respondWith: "showText"`).

Credential im Sprachmodell-Knoten: „Anthropic“ (Key aus dem Zugangsbereich). Auf der gemeinsamen Bootcamp-n8n Workflow-Namen mit Kürzel der Person versehen und den Formularpfad eindeutig machen.

## Stufen
**Sofort ohne Freigabe**
- Formular mit Textfeld oder Datei-Upload (PDF; TXT und VTT mit der Weiche aus Schritt 3, das Beispiel kann nur PDF).
- Ergebnis auf der Formular-Endseite, Aufgaben in einer n8n Data Table.
- Optional Prüfschritt: `n8n-nodes-base.form` mit `operation: "page"` zeigt das Protokoll in einem Textfeld zum Korrigieren, bevor gespeichert wird.
- Transkript manuell aus Teams herunterladen und einfügen.

**Mit Freigabe**
- Protokoll als Entwurf: `n8n-nodes-base.microsoftOutlook` (`resource: "draft"`, `operation: "create"`) oder `n8n-nodes-base.gmail` (`resource: "draft"`, `operation: "create"`).
- Aufgaben nach Microsoft To Do: `n8n-nodes-base.microsoftToDo` (`resource: "task"`, `operation: "create"`).
- Posten in Teams: `n8n-nodes-base.microsoftTeams` (`resource: "channelMessage"`, `operation: "create"`).
- Teams-Transkripte automatisch abholen: kein fertiger Knoten, nur über Microsoft Graph per `n8n-nodes-base.httpRequest`.

## Freigaben
- Outlook-Postfach in Standard-Tenants (von Microsoft empfohlene Consent-Einstellung): Admin-Freigabe nötig.
- Teams-Knoten und Teams-Transkripte: immer Admin-Freigabe.
- IMAP mit Passwort ist bei Exchange Online abgeschaltet, kein Ausweg.
- Google auf selbst gehosteter n8n: eigene OAuth-App nötig. Im Status „Testing“ laufen Refresh-Tokens nach 7 Tagen ab.
- Auf der zentralen Bootcamp-n8n keine dienstlichen Postfächer, Kalender oder Google-Konten verbinden, dort sehen alle alle Zugangsdaten. Für echte Anbindungen Test-Konto oder eigene n8n.
- Details, Formulierungen für die IT und Ablauf: Skill `m365-google-freigaben`. Bis die Freigabe da ist, die Stufe „sofort“ fertig bauen und zeigen.

## Testdaten (erfunden)
1. **Jour fixe Sommerprogramm:** „Jour fixe Sommerprogramm, 8.9.2026. Anwesend: Leitung Marketing, Gästeservice, Veranstaltungen. Laternenwanderung am 3.10.: 42 von 60 Plätzen gebucht. Entschieden: Anmeldeschluss ist der 28.9. Gästeservice aktualisiert die Infoseite bis 15.9. Marketing schickt den Newsletter-Teaser bis 18.9. Offen: Wer fragt beim Busunternehmen wegen eines Shuttles an? Braucht es eine Schlechtwetter-Variante?“
   Erwartung: 1 Entscheidung, 2 Aufgaben mit Termin, 2 offene Fragen, „42 von 60“ wörtlich.
2. **Messe-Nachbesprechung:** „Nachbesprechung Ferienmesse, 10.9.2026. Laut Standteam rund 380 Gespräche. Der Prospekt Winterwandern war am zweiten Tag vergriffen. Entschieden: Nachdruck von 2.000 Stück. Die Grafik prüft bis Ende der Woche die Druckdaten. Wer die Kontakte ins CRM überträgt, ist noch offen.“
   Erwartung: Aufgabe „Kontakte übertragen“ mit leerem `verantwortlich`, „bis Ende der Woche“ wörtlich, kein erfundenes Datum.
3. **Randfall:** eingescanntes PDF ohne Textebene oder leeres Formular. Erwartung: Hinweisseite, kein KI-Aufruf.

## Qualitätsregeln
- Zahlen nie vom Modell rechnen oder runden lassen. Summen, Zählungen, Fristen in Tagen macht n8n (Set-Ausdruck, `n8n-nodes-base.summarize`).
- Strukturierte Ausgabe nur per Information Extractor oder Output Parser, nie Freitext parsen.
- Prompt: nur übernehmen, was im Text steht; fehlende Angaben leer lassen; Belegzitat pro Aufgabe.
- Das Protokoll ist ein Entwurf. Ein Mensch prüft vor jedem Versand. Wo verschickt wird, Human-in-the-loop über `operation: "sendAndWait"` (Outlook oder Gmail, Ressource Message) an die verantwortliche Person vorschalten.
- Mit den drei Testfällen oben prüfen, bevor echte Protokolle durchlaufen.

## Typische Fallen
- **PDF ohne OCR** (Scan, Foto) liefert leeren Text. Deshalb die Längenprüfung vor der KI.
- **DOCX** kann Extract from File nicht lesen. Word als PDF speichern oder Text einfügen.
- **Binärfeld beim Formular:** In typeVersion 2.3 heißt es wie das Feld-Label, aber Sonderzeichen, Leerzeichen und Umlaute im Label werden zu „_“ („Protokoll-Datei“ wird zu `Protokoll_Datei`, „Übersicht“ zu `_bersicht`). Label einfach halten (z. B. „Datei“). In jeder Version den Namen im Output des Triggers prüfen, bevor `binaryPropertyName` gesetzt wird. Ohne hochgeladene Datei fehlt das Binärfeld ganz (siehe Schritt 3).
- **Formular-Endseite:** Laufen mehrere Zweige, zeigt n8n nur die Endseite des zuletzt ausgeführten Zweigs. Zweige werden von oben nach unten abgearbeitet, also den Zweig mit der Endseite unten platzieren.
- **Split Out mit 0 Aufgaben** gibt 0 Items aus, alles danach läuft nicht. Nichts Wichtiges hinter diesen Zweig hängen.
- **Gemeinsame Bootcamp-n8n:** Formularpfad kollidiert, wenn mehrere dasselbe Beispiel importieren.
- **Lange Transkripte** kosten spürbar Budget, der Bootcamp-Key hat ein Ausgabelimit. Erst mit kurzen Texten testen.
- **Outlook-Trigger** holt nur Mails, die nach dem Aktivieren neu ankommen. In Graph-Abfragen lassen sich `$search` und `$filter` nicht kombinieren.

## Datenschutz
- Im Bootcamp nur erfundene oder ausdrücklich freigegebene Protokolle verwenden.
- Personenbezug minimieren: Rollen statt Namen, keine Gesundheits- oder Personalthemen in Testdaten.
- Auf der gemeinsamen Bootcamp-n8n sehen alle Teilnehmenden Workflows, Ausführungen und Credentials. Ausführungsdaten enthalten den vollen Text.
- Das Sprachmodell bekommt nur den Text, der fürs Protokoll nötig ist.
