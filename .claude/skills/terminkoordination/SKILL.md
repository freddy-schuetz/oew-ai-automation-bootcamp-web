---
name: terminkoordination
description: Terminfindung und Koordination mit n8n für Tourismusorganisationen. Baut eine Terminumfrage aus n8n-Formular, Mail und Data Table, die auch über Organisationsgrenzen funktioniert, und zeigt, wann eine Kalenderabfrage (Google Calendar Availability, Microsoft Graph findMeetingTimes) innerhalb einer Organisation sinnvoll ist. Verwenden, wenn jemand Termine mit mehreren Personen abstimmen, Zusagen sammeln und auszählen, Einladungen verschicken oder freie Zeiten finden will.
---

# Terminkoordination

Beispiel zum Importieren: [`examples/workflows/terminumfrage.json`](../../../examples/workflows/terminumfrage.json). Ohne Freigabe testbar (Formular, Data Table, Mail nur als Vorschau).

## Wann verwenden

- Ein Termin mit Leuten aus **mehreren Organisationen** (TVB, Betriebe, Agentur, Gemeinde, Kulturhaus).
- Zusagen oder Rückmeldungen sammeln und auszählen, danach Einladung oder Kalenderdatei verschicken.
- Freie Zeiten im **eigenen** Team finden (nur innerhalb einer Organisation, siehe unten).

Nicht dafür gedacht: Buchungssysteme mit Kontingenten, Zahlung oder Warteliste. Das ist ein eigenes, größeres Vorhaben.

## Grundentscheidung: Umfrage oder Kalender?

| Situation | Weg |
|---|---|
| Teilnehmende aus verschiedenen Organisationen | **Formular-Umfrage** (Standard) |
| Alle im selben Google Workspace | Google Calendar, Operation `availability`, zusätzlich möglich |
| Alle im selben Microsoft-365-Tenant | Graph `findMeetingTimes` per HTTP Request, zusätzlich möglich |
| Unklar oder gemischt | Formular-Umfrage |

Kalenderabfragen sehen nur Kalender, auf die der verbundene Zugang Rechte hat. Bei fremden Organisationen ist das normalerweise nicht der Fall. Frag deshalb am Anfang: „Sind alle Beteiligten in derselben Organisation?“

## Empfohlene Knotenkette

Alle Typen und Operationen mit n8n-mcp geprüft. Versionen wie im Beispiel-Workflow.

**Bahn 1: Umfrage vorbereiten**
1. `n8n-nodes-base.manualTrigger` (1)
2. `n8n-nodes-base.dataTable` (1.1): `resource: table`, `operation: create`, `tableName` (im Beispiel `terminumfrage_kuerzel`), Spalten `umfrage_id, name, organisation, mailadresse, termin, anmerkung` (alle `string`), `options.createIfNotExists: true`
3. `n8n-nodes-base.set` (3.4) „Umfrage-Daten (Beispiel)“: `umfrage_id`, `titel`, `termine` (Array), `teilnehmende` (Array aus Name, Organisation, E-Mail), `formular_link`, `absender`, `mail_versenden` (boolean)
4. `n8n-nodes-base.splitOut` (1): `fieldToSplitOut: teilnehmende`, `include: noOtherFields`
5. `n8n-nodes-base.set` „Einladung formulieren“: `an`, `betreff`, `text` (Umfragewerte per `$('Umfrage-Daten (Beispiel)').first().json`)
6. `n8n-nodes-base.if` (2.3): `mail_versenden` ist true
7. true: `n8n-nodes-base.emailSend` (2.1), `operation: send`, `emailFormat: text`. false: `n8n-nodes-base.noOp` (Vorschau)

**Bahn 2: Antworten sammeln**
1. `n8n-nodes-base.formTrigger` (2.5): Felder `Name` (text), `Organisation` (text), `Mailadresse` (email), `Termine` (checkbox, `requiredField: true`), `Anmerkung` (textarea). `fieldLabel` und `fieldName` gleich wählen. `options.path` mit Kürzel.
2. `n8n-nodes-base.dataTable` (1.1): `resource: row`, `operation: deleteRows`, `matchType: allConditions`, Bedingungen `umfrage_id eq …` und `mailadresse eq …`, **`alwaysOutputData: true`**
3. `n8n-nodes-base.set` „Antwort übernehmen“ mit **`executeOnce: true`**, Werte per `$('Formular: Terminumfrage').first().json`, Mailadresse mit `trim().toLowerCase()`
4. `n8n-nodes-base.splitOut`: `fieldToSplitOut: termine`, `include: allOtherFields`, `options.destinationFieldName: termin`
5. `n8n-nodes-base.dataTable`: `operation: insert`, `columns.mappingMode: autoMapInputData` (Feldnamen = Spaltennamen)

**Bahn 3: Auswerten**
1. `n8n-nodes-base.manualTrigger` oder `n8n-nodes-base.scheduleTrigger`
2. `n8n-nodes-base.dataTable`: `operation: get`, Bedingung `umfrage_id eq …`, `returnAll: true`
3. `n8n-nodes-base.summarize` (1.1): `fieldsToSplitBy: termin`, `count` auf `mailadresse`, `concatenate` auf `name`. Ergebnisfelder heißen `count_mailadresse` und `concatenated_name` (nach dem ersten Lauf im Output kontrollieren).
4. `n8n-nodes-base.sort` (1): `count_mailadresse` absteigend
5. `n8n-nodes-base.aggregate` (1): `aggregateAllItemData` in Feld `termine`
6. `n8n-nodes-base.set` „Ergebnis“: `bester_termin`, `zusagen_bester_termin`, `gleichstand`, `antworten_gesamt`, `uebersicht`

## Varianten ohne Freigabe (sofort baubar)

- **Link selbst teilen:** `mail_versenden` bleibt false, den Formular-Link verschickt die Person aus ihrem normalen Postfach.
- **Kalenderdatei statt Kalenderzugriff:** `n8n-nodes-base.convertToFile` mit `operation: iCal` erzeugt eine .ics-Datei (`title`, `start`, `end`, optional `additionalFields.location`, `description`, `attendeesUi`). Die kann jede Person in ihren Kalender importieren, egal in welcher Organisation. Dafür Start und Ende als echte Zeitpunkte pflegen, nicht nur als Anzeigetext.
- **Wer fehlt noch?** Davor die Teilnehmendenliste (pro Person ein Item wie in Bahn 1). Dann `n8n-nodes-base.dataTable` mit `operation: rowNotExists`, `matchType: allConditions` und zwei Bedingungen: `umfrage_id eq` Umfrage-ID (im Beispiel `kuerzel-herbst-2026`) und `mailadresse eq {{ $json.email.trim().toLowerCase() }}`. Er lässt nur Teilnehmende durch, die in **dieser** Umfrage noch keine Zeile haben. Ohne `umfrage_id` gilt als „hat geantwortet“, wer bei irgendeiner Umfrage in der Tabelle steht. Ohne `allConditions` greift der Standard `anyCondition`, dann reicht schon eine der beiden Bedingungen. Danach `n8n-nodes-base.filter` „E-Mail nicht leer“ und erst dann die Erinnerung (Vorschau oder Mail): Haben schon alle geantwortet, kann `rowNotExists` ein leeres Item ausgeben statt gar keines, deshalb filtern.
- **Ergebnis als Seite:** Bahn 3 mit Form Trigger statt Manual Trigger starten und das Ergebnis mit `n8n-nodes-base.form` (`operation: completion`, `respondWith: showText`) anzeigen.

## Varianten mit Freigabe

Zugänge, Admin-Freigaben und Einrichtung stehen im Skill **`m365-google-freigaben`**. Kurz:

- **Versand über das Organisationspostfach:** `n8n-nodes-base.microsoftOutlook` (`resource: message`, `operation: send`) oder Gmail-Knoten statt SMTP. Microsoft 365: Postfach- und Kalenderzugriff braucht in Standard-Tenants eine Admin-Freigabe. IMAP mit Passwort ist bei Exchange Online abgeschaltet.
- **Nur innerhalb von Google Workspace:** `n8n-nodes-base.googleCalendar` (1.3), `resource: calendar`, `operation: availability`, Parameter `calendar`, `timeMin`, `timeMax`, `options.outputFormat` (`availability`, `bookedSlots` oder `raw`). Ein Aufruf prüft ein Zeitfenster in einem Kalender. Für mehrere Personen und Terminvorschläge pro Kombination aufrufen und die freien Treffer in Knoten zählen.
- **Nur innerhalb eines Microsoft-365-Tenants:** `n8n-nodes-base.httpRequest` (4.4), `POST https://graph.microsoft.com/v1.0/me/findMeetingTimes`, Microsoft-OAuth2-Credential mit Scope `Calendars.Read.Shared`, meist mit Admin-Freigabe. Body-Skizze:

```json
{
  "attendees": [
    { "type": "required", "emailAddress": { "address": "kollegin@example.org" } }
  ],
  "timeConstraint": {
    "activityDomain": "work",
    "timeSlots": [
      {
        "start": { "dateTime": "2026-10-06T09:00:00", "timeZone": "W. Europe Standard Time" },
        "end": { "dateTime": "2026-10-08T17:00:00", "timeZone": "W. Europe Standard Time" }
      }
    ]
  },
  "meetingDuration": "PT1H",
  "maxCandidates": 5
}
```

Antwort: `meetingTimeSuggestions` (mit `confidence`, `meetingTimeSlot`, `attendeeAvailability`) und bei leerer Liste `emptySuggestionsReason`. Diesen Grund immer anzeigen, nie still „kein Termin“ melden.

## Testdaten

Im Beispiel: Umfrage „Abstimmung Herbstkampagne Wanderregion“, Termine A (Di 06.10.2026, 10 Uhr), B (Mi 07.10.2026, 14 Uhr), C (Do 08.10.2026, 9 Uhr), Personen Anna Beispiel (TVB Beispieltal), Ben Muster (Kulturhaus Beispielstadt), Clara Test (Region Beispielsee), alle mit `@example.org`.

| Szenario | Eingaben im Formular | Erwartung in „Ergebnis“ |
|---|---|---|
| Normalfall | Anna: A, B. Ben: B. Clara: B, C | `bester_termin` B, `zusagen_bester_termin` 3, `gleichstand` false, `antworten_gesamt` 3 |
| Gleichstand | Anna: A. Ben: C | `gleichstand` true |
| Doppelte Antwort | Anna: A, danach Anna nochmal: nur C | Anna zählt nur bei C |
| Schreibweise | `Anna@Example.org` und `anna@example.org` | eine Person |
| Termin ohne Zusage | niemand wählt A | A fehlt in `uebersicht` (bewusst erklären) |
| Keine Antworten | Tabelle leer | Bahn 3 endet nach „Antworten laden“ ohne Ergebnis. Wenn unerwünscht: `alwaysOutputData` und Hinweis „noch keine Antworten“ |

Vor jedem Test Bahn 1 einmal ausführen (legt die Tabelle an). Zum Zurücksetzen Zeilen mit `deleteRows` und `umfrage_id` löschen.

## Qualitätsregeln

- **Zählen, sortieren, Gleichstand prüfen immer in Knoten** (Summarize, Sort, Set). Nie ein Sprachmodell „den besten Termin“ auszählen lassen.
- Ein Sprachmodell darf höchstens Einladung oder Ergebnis-Mail **formulieren**, und zwar nur aus den fertig berechneten Werten (bester Termin, Zusagen, Namen).
- **Jede Zahl mit Quelle:** Umfrage-ID, Anzahl Antworten, Zeitpunkt der Auswertung im Ergebnis mitführen.
- Termintexte an **einer** Stelle pflegen. Die Optionen im Form Trigger sind fest eingetragen und müssen mit den Umfrage-Daten übereinstimmen.
- Workflow-Zeitzone `Europe/Vienna` setzen (Settings), sonst verschieben sich Zeiten in ICS-Dateien und Graph-Abfragen.

## Typische Fallen

- **Test-URL und Produktions-URL:** Die Test-URL (`/form-test/…`) funktioniert nur, während der Editor auf eine Ausführung wartet. Für echte Teilnehmende den Workflow aktivieren und die Produktions-URL (`/form/…`) verschicken.
- **Gemeinsame Bootcamp-n8n** (https://n8n-oew.buildbar.at): Im Beispiel steht an jeder betroffenen Stelle `kuerzel`. Ersetze es **überall** durch dein eigenes Kürzel (am einfachsten vor dem Import in der JSON-Datei). Wer nur einen Teil umbenennt, schreibt in Bahn 2 in die Tabelle einer anderen Person oder zählt in Bahn 3 fremde Antworten. Die Stellen:
  - Tabellenname `terminumfrage_kuerzel` in „Tabelle anlegen (einmalig)“, „Alte Antwort dieser Person löschen“, „Antwort speichern (Data Table)“ und „Antworten laden“
  - Umfrage-ID `kuerzel-herbst-2026` in „Umfrage-Daten (Beispiel)“, „Alte Antwort dieser Person löschen“, „Antwort übernehmen“, „Antworten laden“ und „Ergebnis“
  - Formular-Pfad `terminumfrage-kuerzel` in „Formular: Terminumfrage“ (`options.path`) und im Feld `formular_link`
- **0 Items stoppen alles:** Findet der Lösch-Knoten nichts, liefert er ohne `alwaysOutputData` kein Item und der Rest wird still übersprungen. Mit `alwaysOutputData` kann er dafür mehrere Items liefern, deshalb `executeOnce` im nächsten Set.
- **Doppelte Antworten** zählen doppelt, wenn vor dem Speichern nichts gelöscht wird.
- **Tabelle fehlt:** Bahn 2 schlägt fehl, wenn Bahn 1 nie lief.
- **Feldnamen aus dem Formular:** `fieldLabel` und `fieldName` gleich halten, dann stimmen die Ausdrücke (`$json.Mailadresse`) sicher.
- **SMTP bei Microsoft 365:** Versand mit Benutzername und Passwort kann im Tenant gesperrt sein. Mit der IT klären, welcher Versandweg erlaubt ist.
- **Google im Status „Testing“:** Refresh-Tokens laufen nach 7 Tagen ab. Ein Workflow, der am Bootcamp-Dienstag läuft, kann eine Woche später ohne Änderung scheitern.

## Datenschutz

- Nur abfragen, was für die Terminfindung nötig ist: Name, Organisation, Mailadresse, Terminwahl, freiwillige Anmerkung.
- Im Formular sagen, wofür die Daten verwendet werden (steht im Beispiel in `formDescription`).
- Nach der Terminfindung die Zeilen der Umfrage löschen (`deleteRows` mit `umfrage_id`).
- Das Formular ist für alle mit dem Link erreichbar. Link nur an Teilnehmende geben, bei Bedarf `authentication: basicAuth` oder `options.ignoreBots: true` setzen.
- Bei Kalenderabfragen nur Frei/Belegt verwenden, keine Termintitel oder Inhalte weiterreichen oder speichern.
- Auf der gemeinsamen Bootcamp-n8n sehen alle Teilnehmenden alle Credentials. Dort nur erfundene Personen testen und keine persönlichen oder produktiven Postfächer verbinden. Echte Umfragen gehören auf die n8n der eigenen Organisation.
