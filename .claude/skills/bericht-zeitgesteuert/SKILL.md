---
name: bericht-zeitgesteuert
description: Baut einen zeitgesteuerten n8n-Workflow für wiederkehrende Berichte. Daten holen, von n8n zählen lassen, von der KI nur einordnen lassen und als Datei oder Mail-Entwurf ausgeben. Verwenden, wenn jemand Wochen- oder Monatsberichte, Kennzahlen-Zusammenfassungen oder regelmäßige Auswertungen (Anfragen, Nächtigungen, Besucherzahlen, Bewertungen) automatisieren will.
---

# Wiederkehrende Berichte (zeitgesteuert)

Ziel: Ein Bericht, der jede Woche oder jeden Monat von selbst entsteht. Die Zahlen berechnet n8n, die KI schreibt nur die Einordnung. Der erste Stand läuft mit Beispieldaten und manuellem Start.

**Startpunkt:** `examples/workflows/bericht-woechentlich.json` (Beispieldaten, Summarize je Kanal und Thema, Merge, Kennzahlen per Ausdruck, Einordnung per chainLlm, HTML-Datei, deaktivierter Zeitplan mit Data Table und Leer-Prüfung, deaktivierter Outlook-Entwurf). Lesen, auf die eigene Datenquelle umbauen, dann per n8n-mcp anlegen.

## Wann verwenden
- Wochenbericht Gästeanfragen, Monatsbericht Nächtigungen oder Besucherzahlen, Auswertung von Bewertungen oder Newsletter-Kennzahlen.
- Jemand kopiert regelmäßig Zahlen aus Excel, Buchungssystem oder Tabelle in eine Mail oder ein Dokument.

Nicht passend: einmalige Ad-hoc-Analysen (dafür reicht Claude direkt mit der Datei), Präsentationen mit Layout (siehe Fallen).

## Empfohlener Aufbau (Knotenkette)
1. Trigger: `n8n-nodes-base.scheduleTrigger` (im Beispiel typeVersion 1.2, `rule.interval: [{ field: "weeks", weeksInterval: 1, triggerAtDay: [1], triggerAtHour: 7, triggerAtMinute: 0 }]`). Zum Testen zusätzlich `n8n-nodes-base.manualTrigger`. In den Workflow-Settings `timezone: "Europe/Vienna"` setzen.
2. Daten holen, eine Quelle je Stufe:
   - `n8n-nodes-base.dataTable` (`operation: "get"`, `returnAll: true`, `matchType: "allConditions"`, Filter auf `datum` mit `gte` `{{ $now.minus({ days: 7 }).startOf('day').toISO() }}` und `lt` `{{ $now.startOf('day').toISO() }}`). Nicht `$now.startOf('week')` nehmen: Am Montag früh sind Wochenstart und heute derselbe Tag, der Lauf findet dann 0 Zeilen.
   - Datei-Upload über `n8n-nodes-base.formTrigger` plus `n8n-nodes-base.extractFromFile` (`operation: "xlsx"` oder `"csv"`).
   - Mit Freigabe: `n8n-nodes-base.microsoftExcel`, `n8n-nodes-base.googleSheets`, oder `n8n-nodes-base.httpRequest` gegen eine API.
3. Leere Periode abfangen: am Datenknoten „Always Output Data“ einschalten, danach `n8n-nodes-base.if` prüft, ob echte Zeilen kamen (das leere Ersatz-Item hat keine Felder; im Beispiel „Zeilen vorhanden?“ mit `{{ $json.anzahl }}` „exists“). Nein-Zweig: kurzer Hinweis statt Bericht.
4. Zählen ohne KI: `n8n-nodes-base.summarize` (`fieldsToSummarize.values: [{ aggregation: "sum", field: "anzahl" }]`, `fieldsToSplitBy: "kanal"`). Ergebnisfeld heißt `sum_anzahl`. Für eine zweite Sicht ein zweiter Summarize-Knoten.
5. `n8n-nodes-base.aggregate` (`aggregateAllItemData`) je Sicht, dann `n8n-nodes-base.merge` (`mode: "combine"`, `combineBy: "combineByPosition"`) zu einem Item.
6. `n8n-nodes-base.set` „Kennzahlen berechnen“: Gesamtsumme, Anteile, Veränderung zur Vorperiode per Ausdruck (`reduce`, `Math.round`). Fertige Textzeilen für den Prompt bauen.
7. `@n8n/n8n-nodes-langchain.chainLlm` (`promptType: "define"`) mit `@n8n/n8n-nodes-langchain.lmChatAnthropic`: 3 bis 4 Sätze Einordnung plus Vorschläge. Ergebnis in `$json.text`. Soll die Einordnung Felder haben (z. B. `auffaelligkeiten[]`), `outputParserStructured` anhängen.
8. `n8n-nodes-base.set` setzt den Bericht zusammen: Zahlen aus „Kennzahlen berechnen“, Text aus der KI, klar getrennt.
9. `n8n-nodes-base.markdown` (`markdownToHtml`) und `n8n-nodes-base.convertToFile` (`operation: "toText"`, Dateiname `.html`; für Tabellen `operation: "csv"` oder `"xlsx"`).
10. Ablage oder Versand: sofort als Datei in der Ausführung oder Archivzeile in einer Data Table; mit Freigabe als Mail-Entwurf oder in Teams (siehe unten).

## Stufen
**Sofort ohne Freigabe**
- Beispieldaten im Set-Knoten (`mode: "raw"`, Datumswerte per `$now.minus(...)`, damit sie immer in der aktuellen Woche liegen).
- Eigene n8n Data Table als Datenquelle, befüllt per Formular oder Import.
- Export einer Excel- oder CSV-Datei hochladen und auslesen.
- Ergebnis als HTML- oder CSV-Datei, Archiv in einer Data Table.

**Mit Freigabe**
- Daten aus `n8n-nodes-base.microsoftExcel` (OneDrive, SharePoint) oder `n8n-nodes-base.googleSheets`.
- Versand als Entwurf: `n8n-nodes-base.microsoftOutlook` (`resource: "draft"`, `operation: "create"`, `additionalFields.bodyContentType: "html"`) oder `n8n-nodes-base.gmail` (`resource: "draft"`, `operation: "create"`).
- Human-in-the-loop vor dem Teamversand: `operation: "sendAndWait"` (Outlook oder Gmail, Ressource Message) an die verantwortliche Person, erst nach deren OK an den Verteiler.
- Teams-Kanal: `n8n-nodes-base.microsoftTeams` (`resource: "channelMessage"`, `operation: "create"`).
- Ablage: `n8n-nodes-base.microsoftOneDrive` oder `n8n-nodes-base.googleDrive` (Upload).

## Freigaben
- Outlook-Postfach in Standard-Tenants (von Microsoft empfohlene Consent-Einstellung): Admin-Freigabe nötig. OneDrive und SharePoint: in aller Regel IT. Excel-Datei im eigenen OneDrive: hängt von der Einstellung der Organisation ab. Teams-Knoten: immer Admin-Freigabe.
- Auf der zentralen Bootcamp-n8n keine dienstlichen Postfächer, Ablagen oder Google-Konten verbinden, dort sehen alle alle Zugangsdaten. Für echte Anbindungen Test-Konto oder eigene n8n.
- Google auf selbst gehosteter n8n: eigene OAuth-App nötig. Im Status „Testing“ laufen Refresh-Tokens nach 7 Tagen ab. Die Frist zählt ab dem Verbinden, nicht ab dem ersten Lauf. Ein Wochenbericht fällt also spätestens beim zweiten Lauf aus.
- Details und Text für die IT-Anfrage: Skill `m365-google-freigaben`.

## Testdaten (erfunden)
1. **Wochenbericht Gästeanfragen** (Beispiel-Workflow): 12 Zeilen `datum`, `kanal`, `thema`, `anzahl`.
   Erwartung: gesamt 78; Schalter 44, E-Mail 19, Telefon 15; Wandern 34, Veranstaltungen 32, Unterkunft 6, Anreise 6. Im KI-Text keine Zahl, die nicht in dieser Liste oder den Anteilen steht. Die gerundeten Kanal-Anteile ergeben 99 % (56, 24, 19), die Themen-Anteile 101 % (44, 41, 8, 8). Beides ist Rundung und kein Fehler.
2. **Monatsbericht Nächtigungen:** September Vorjahr 12.400, September aktuell 13.150, je Unterkunftsart aufgeteilt.
   Erwartung: Veränderung +6,0 % berechnet n8n im Set-Knoten, die KI zitiert nur.
3. **Leere Woche:** Datenquelle liefert 0 Zeilen. Erwartung: Hinweis „keine Daten“, kein KI-Aufruf, kein leerer Bericht. Im Beispiel läuft das nur über den Tabellen-Zweig („Always Output Data“ plus „Zeilen vorhanden?“). Also erst Schritt 3 der Notiz „Vor dem Start eintragen“ umsetzen und dann mit leerer Tabelle testen.

## Qualitätsregeln
- Zahlen nie vom Modell rechnen, summieren, runden oder vergleichen lassen. Alles Rechnen passiert in Summarize, Set-Ausdrücken oder, wenn es nicht anders geht, im Code-Knoten.
- Im fertigen Bericht stammen die Zahlen aus n8n-Feldern, nicht aus dem KI-Text. KI-Abschnitt als Entwurf kennzeichnen.
- Prompt: nur gelieferte Zahlen verwenden, keine erfundenen Ursachen, Vermutungen als offene Frage.
- Strukturierte Ausgabe per Output Parser, wenn der Text weiterverarbeitet wird.
- Vor dem ersten Versand ein Mensch prüft, bei regelmäßigen Berichten per Send and Wait.
- Die drei Testfälle nach jeder Änderung an Prompt oder Rechenlogik prüfen.

## Typische Fallen
- **0 Items stoppen alles:** Liefert der Datenknoten nichts, laufen die folgenden Knoten nicht und niemand merkt es. Siehe Schritt 3.
- **Data Table Get liefert nur 50 Zeilen**, solange `returnAll` aus ist. Zeilenzahl im Ergebnis gegen die Tabelle prüfen.
- **Zeitzone:** Der Zeitplan und `$now` richten sich nach der Workflow-Zeitzone. Ohne Einstellung gilt die Instanz-Zeitzone, der Bericht kommt dann zur falschen Stunde oder mit verschobenem Zeitraum.
- **Zeitplan läuft automatisch nur bei aktivem Workflow.** Im Editor lässt er sich per Klick testen, das beweist aber nicht, dass der Zeitplan aktiv ist.
- **XLSX:** Die Option „Sheet Name“ muss exakt dem Blattnamen entsprechen (z. B. „Tabelle1“).
- **CSV mit deutschem Zahlenformat** (1.234,5) kommt als Text an. Vor Summarize in Zahlen umwandeln und das Ergebnis gegen eine Handrechnung prüfen.
- **PDF-Berichte als Quelle:** PDF ohne OCR liefert leeren Text.
- **Deaktivierte Knoten reichen Daten durch:** Wer die Beispieldaten-Knoten nur deaktiviert, schickt beim Test das leere Item des manuellen Triggers in die Zählung. Beispieldaten-Knoten löschen und den Test-Trigger an den echten Datenknoten hängen.
- **Merge braucht beide Eingänge:** Die Leer-Prüfung gehört vor die Aufteilung in die Summarize-Zweige, damit beide Zweige Daten bekommen.
- **Formate:** n8n hat keinen PowerPoint-Knoten. Für Folien den Google-Slides-Knoten (Replace Text in einer Vorlage) nutzen oder HTML ausgeben. Die pptx-, docx- und xlsx-Skills von Anthropic sind proprietär lizenziert: nicht kopieren und nicht davon ableiten.
- **Gemeinsame Bootcamp-n8n:** Workflow-Namen mit Kürzel versehen, Zeitplan erst scharf schalten, wenn der Test sauber war.

## Datenschutz
- Berichte arbeiten mit aggregierten Zahlen. Keine personenbezogenen Rohdaten (Gästenamen, Mailadressen) an die KI geben, nur Summen und Anteile.
- Im Bootcamp nur erfundene oder öffentlich zugängliche Kennzahlen.
- Auf der gemeinsamen Bootcamp-n8n sehen alle Teilnehmenden Workflows, Ausführungen, Data Tables und Credentials.
- Verteiler klein halten und vor dem ersten Versand prüfen, wer den Bericht bekommen darf.
