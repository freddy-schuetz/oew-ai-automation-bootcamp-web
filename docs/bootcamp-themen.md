# Die sechs Bootcamp-Themen

Im AI Automation Bootcamp arbeitest du an deinem eigenen Vorhaben. Die sechs Themen helfen dir beim Einstieg: Sie zeigen, was in vier Tagen gut machbar ist, welche Bausteine du brauchst und wo es oft hakt. Dein Vorhaben muss nicht genau in ein Thema passen.

Dieselben Themen findest du online unter https://buildbar.at/oew/themen.

## So nutzt du diese Übersicht

1. Such dir das Thema, das deinem Arbeitsalltag am nächsten ist.
2. Kopier den Einstiegssatz in Claude und pass ihn an dein Vorhaben an.
3. Am Tag 1 klärst du die Idee im Sparring mit Claude (Skill `idee-klaeren`). Willst du den fertigen Plan auf Herz und Nieren prüfen, sag „grill mich“ (Skill `grill-me`).
4. Ab Tag 2 baust du. Der passende Themen-Skill hilft Claude, die typischen Bausteine richtig zu verbinden.
5. Soll dein Workflow auf Outlook, Teams, Gmail, Google Kalender oder Google Drive zugreifen? Dann frag früh nach dem Skill `m365-google-freigaben`. Er zeigt dir, ob du eine Freigabe deiner IT brauchst, und was du bis dahin schon bauen kannst.

## Für alle Themen gilt

- **Starte mit Beispieldaten.** Ein paar echte, aber unkritische Beispiele reichen für den ersten Prototyp. Personenbezogene Daten entfernst du vorher.
- **Ein Mensch prüft, bevor etwas rausgeht.** Entwürfe statt automatisch versenden, zumindest am Anfang.
- **Zahlen kommen aus der Quelle, nicht aus der KI.** Die KI ordnet ein und formuliert. Rechnen und Zählen macht der Workflow.
- **Zugangsdaten gehören in n8n, nicht ins Repository.** Den KI-Schlüssel aus dem Zugangsbereich (https://buildbar.at/oew#zugang) trägst du in n8n als Zugangsdaten „Anthropic“ ein. Auf der zentralen Bootcamp-n8n gibt es die Zugangsdaten „Anthropic“ vielleicht schon. Dann nimmst du diese und legst keine zweiten an.
- **Die zentrale Bootcamp-n8n teilen sich alle.** Unter https://n8n-oew.buildbar.at gibt es einen gemeinsamen Login, und alle sehen alle Zugangsdaten. Verbinde dort keine dienstlichen Postfächer oder Konten.
- **Daten ablegen:** n8n Data Tables sind in jeder n8n dabei und für den Start die einfachste Wahl. Brauchst du Tabellen im Browser, gibt es NocoDB unter https://nocodb.buildbar.at (eigener Account und API-Token). Für Logins, Datei-Uploads und Suche in Dokumenten gibt es eine Supabase-Datenbank der ÖW. Deren service_role-Schlüssel gehört nur in n8n, nie in eine Oberfläche und nie ins Repository.
- **Eine kleine Oberfläche ist optional.** Wenn du eine brauchst, sag Claude „veröffentliche meine App“. Sie läuft dann unter einer Adresse wie https://app-xxxx.buildbar.at.

Die Werkzeuge erklärt dir https://buildbar.at/oew/grundlagen.

---

## 1. Meetingnotizen strukturieren

**Beispiel:** Du lädst eine Mitschrift oder ein Transkript hoch. n8n macht daraus Beschlüsse, Aufgaben mit Verantwortlichen und Terminen und schickt alles als Mail oder legt es in einer Tabelle ab.

**Typische Bausteine:**
- Formular mit Datei-Upload (n8n Form Trigger)
- Text aus der Datei lesen (Extract from File)
- KI-Baustein mit fester Gliederung (Anthropic)
- Mail oder Tabelle (zum Beispiel eine Data Table)

**Worauf achten:**
- Teams-Transkripte automatisch abzuholen braucht fast immer eine Freigabe deiner IT. Eine Datei hochzuladen geht sofort.
- Auch das Versenden per Outlook braucht meist eine Freigabe deiner IT, und Senden per SMTP mit Passwort ist bei Microsoft 365 oft schon aus. Für den Start legst du das Ergebnis in einer Tabelle ab.
- Text-Dateien (.txt, .vtt) und PDF liest n8n direkt. Eine Word-Datei speicherst du am einfachsten vorher als PDF oder Text.
- Die KI soll nur übernehmen, was in der Mitschrift steht. Ist keine verantwortliche Person oder kein Termin genannt, bleibt das Feld leer. Nichts dazuerfinden lassen.
- Mitschriften enthalten Namen. Für den Start nimmst du eine alte oder anonymisierte Mitschrift.

**Einstiegssatz:**
> Ich möchte aus Meeting-Mitschriften automatisch Aufgaben und Beschlüsse machen. Hilf mir, die Idee zu klären.

**Passender Skill:** `meetingnotizen`, bei Teams oder Versand über Outlook oder Gmail zusätzlich `m365-google-freigaben`

---

## 2. E-Mail-Anfragen sortieren und Antwortentwürfe vorbereiten

**Beispiel:** Neue Anfragen werden nach Thema sortiert, zum Beispiel Buchung, Presse oder Partner. Zu jeder entsteht ein Antwortentwurf, den du vor dem Senden prüfst.

**Typische Bausteine:**
- Postfach-Anbindung (Outlook oder Gmail)
- Sortieren per KI
- Antwortentwurf anlegen
- Freigabe per Klick

**Worauf achten:**
- Bei Microsoft 365 braucht der Zugriff auf ein Postfach in den meisten Organisationen eine Freigabe durch die IT. Für den Start reichen ein paar Beispielmails.
- Mit Benutzername und Passwort (IMAP) kommst du bei Microsoft 365 nicht ins Postfach. Das hat Microsoft abgeschaltet.
- Leg die Themen vorher fest und plane ein Thema „Sonstiges“ ein. Was die KI nicht sicher zuordnen kann, landet dort.
- Anfragen enthalten Namen und Kontaktdaten. Deine Beispielmails anonymisierst du vorher.
- Der Workflow legt Entwürfe an. Senden bleibt deine Entscheidung.

**Einstiegssatz:**
> Ich möchte eingehende Anfragen automatisch sortieren und Antwortentwürfe bekommen. Hilf mir, die Idee zu klären.

**Passender Skill:** `mail-triage-entwuerfe`, zusätzlich `m365-google-freigaben`

---

## 3. Wiederkehrende Berichte erstellen

**Beispiel:** Jeden Montag holt n8n die Zahlen aus einer Tabelle oder einem Analyse-Werkzeug, fasst sie zusammen und schickt einen fertigen Bericht an dein Team.

**Typische Bausteine:**
- Zeitplan als Auslöser (Schedule Trigger)
- Datenquelle (Tabelle, Excel oder Schnittstelle)
- Zusammenfassung per KI
- Mail mit fertigem Bericht

**Worauf achten:**
- Zahlen immer direkt aus der Quelle übernehmen und nicht von der KI ausrechnen lassen. Unter jede Zahl gehört, woher sie kommt.
- Klär früh, wie du an die Zahlen kommst. Hat dein Analyse-Werkzeug eine Schnittstelle, brauchst du dafür meist einen eigenen Schlüssel. Bis der da ist, arbeitest du mit einer Export-Datei (CSV oder Excel).
- Ein Zeitplan läuft nur, wenn der Workflow in n8n aktiviert ist. Zum Testen startest du ihn von Hand.
- Der Bericht geht zuerst nur an dich. Erst wenn er ein paar Mal gestimmt hat, an das Team.
- Auch das Versenden per Outlook braucht meist eine Freigabe deiner IT. Senden per SMTP mit Passwort ist bei Microsoft 365 oft schon aus und soll laut Microsoft Ende 2026 standardmäßig abgeschaltet werden. Für den Start zeigst du den Bericht als Datei oder im Formular an oder schickst ihn an ein Test-Postfach.

**Einstiegssatz:**
> Ich erstelle jede Woche denselben Bericht von Hand. Hilf mir, das zu automatisieren.

**Passender Skill:** `bericht-zeitgesteuert`, bei Versand über Outlook oder Gmail zusätzlich `m365-google-freigaben`

---

## 4. Terminfindung und Koordination erleichtern

**Beispiel:** Eine Abstimmung mit Partnerbetrieben: n8n verschickt ein Formular mit Terminvorschlägen, sammelt die Antworten und meldet dir den Termin, der für die meisten passt.

**Typische Bausteine:**
- n8n-Formular
- Mail
- Tabelle für die Antworten
- optional ein Kalender

**Worauf achten:**
- Kalender anderer Organisationen lassen sich nicht einsehen. Eine Umfrage per Formular funktioniert dagegen über alle Organisationen hinweg.
- Auch dein eigener Kalender in Microsoft 365 braucht in den meisten Organisationen eine Freigabe der IT. Die Einladung kannst du stattdessen als Kalenderdatei (.ics) mitschicken. Die öffnet jede Person in ihrem eigenen Kalender.
- Auch das Versenden der Einladungen per Outlook braucht meist eine Freigabe deiner IT, und Senden per SMTP mit Passwort ist bei Microsoft 365 oft schon aus. Für den Start schickst du den Link zum Formular selbst aus deinem Postfach.
- Das Auszählen macht der Workflow, nicht die KI. So stimmt das Ergebnis immer.
- Leg fest, was bei Gleichstand passiert und bis wann geantwortet werden muss.

**Einstiegssatz:**
> Ich koordiniere regelmäßig Termine mit vielen Beteiligten. Hilf mir, die Idee zu klären.

**Passender Skill:** `terminkoordination`, beim eigenen Kalender zusätzlich `m365-google-freigaben`

---

## 5. Daten analysieren und visualisieren

**Beispiel:** Du lädst eine Excel- oder CSV-Datei hoch. n8n wertet sie aus, erzeugt Diagramme und schreibt eine kurze Einordnung dazu.

**Typische Bausteine:**
- Datei-Upload
- Excel oder CSV einlesen
- Berechnung
- Diagramm-Baustein
- optional eine kleine Oberfläche

**Worauf achten:**
- Personenbezogene Daten vorher entfernen oder mit Beispieldaten arbeiten. Diagramme entstehen aus den echten Zahlen, nicht aus der KI.
- Prüf deine Datei vorher: eine Kopfzeile, eine Tabelle pro Blatt, keine verbundenen Zellen. Das spart viel Zeit.
- Der Diagramm-Baustein QuickChart schickt die Zahlen an einen externen Dienst. Bei sensiblen Zahlen besprich den Weg vorher. Eine kleine eigene Oberfläche ist die Alternative.
- Die KI schreibt die Einordnung auf Basis der fertig berechneten Zahlen. Sie bekommt die Ergebnisse, nicht die Rohdatei.

**Einstiegssatz:**
> Ich möchte eine Excel-Auswertung automatisch mit Diagrammen aufbereiten. Hilf mir, die Idee zu klären.

**Passender Skill:** `daten-visualisieren`

---

## 6. Präsentationen effizienter erstellen

**Beispiel:** Aus Kennzahlen und Stichpunkten entsteht automatisch ein Foliensatz in eurem Layout, zum Beispiel für den monatlichen Kampagnenbericht.

**Typische Bausteine:**
- Folienvorlage (Google Slides oder PowerPoint)
- Platzhalter automatisch befüllen
- Ablage im Team-Ordner

**Worauf achten:**
- n8n hat keinen eigenen PowerPoint-Baustein. Machbar ist es über Google Slides oder einen kleinen Zusatzdienst. Den passenden Weg für deine Organisation klärst du im Vorgespräch.
- Mit Google Slides baust du eine Vorlage mit Platzhaltern wie [[TITEL]] oder [[REGION]]. n8n kopiert die Vorlage und ersetzt die Platzhalter (Vorgang „Replace Text“). Achte auf gleiche Groß- und Kleinschreibung in Vorlage und Workflow. Nimm keine doppelten geschweiften Klammern, die liest n8n als Formel.
- Auf einer selbst gehosteten n8n, also auch auf der zentralen Bootcamp-n8n, braucht Google eine eigene OAuth-App in einem Google-Cloud-Projekt. Im Status „Testing“ musst du die Verbindung alle 7 Tage erneuern. Auf der zentralen Bootcamp-n8n nimmst du dafür nur ein Test-Google-Konto, nie dein dienstliches Konto.
- Auch hier gilt: Zahlen kommen aus der Quelle. Die KI formuliert nur die Stichpunkte.

**Einstiegssatz:**
> Ich baue regelmäßig ähnliche Folien aus denselben Zahlen. Hilf mir, die Idee zu klären.

**Passender Skill:** `praesentation`, bei Google-Konten zusätzlich `m365-google-freigaben`

---

## Dein Vorhaben passt in kein Thema?

Kein Problem. Beschreib Claude in zwei, drei Sätzen, was du heute von Hand machst und was am Ende herauskommen soll. Zum Beispiel:

> Ich mache jede Woche [Aufgabe] von Hand. Am Ende soll [Ergebnis] herauskommen. Hilf mir, die Idee zu klären.

Am Ende des Bootcamps hast du eine erste funktionierende Workflow-Lösung, ein eigenes Code-Repository und einen klaren nächsten Schritt für deine Organisation.
