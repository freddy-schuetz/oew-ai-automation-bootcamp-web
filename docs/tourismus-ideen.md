# 💡 Ideen-Menü für den Tourismus

Noch keine Idee, was du automatisieren willst? Stöber hier, such dir eine Idee aus (oder kombiniere) und sag Claude: **„Ich hätte gern so etwas wie …"**. Claude klärt mit dir die Details (Skill `idee-klaeren`) und baut es dann.

> Alle Ideen sind mit **n8n** (dem Automatisierungs-Baukasten) umsetzbar, manche zusätzlich mit einer kleinen Web-Oberfläche. Mehr zu den Themen: [buildbar.at/oew/themen](https://buildbar.at/oew/themen).

## Die sechs Bootcamp-Themen

Die Themen aus der Ausschreibung des AI Automation Bootcamps, jeweils mit Beispielen aus Tourismusorganisationen und dem passenden Skill. Zu jedem Thema liegt ein Beispiel-Workflow unter `examples/workflows/`.

### 1. Meetingnotizen strukturieren · Skill `meetingnotizen`
- **Partnerbetriebe-Runde:** Aus den Notizen oder dem Transkript eines Treffens mit Beherbergungsbetrieben entsteht automatisch ein Protokoll mit Entscheidungen, Aufgaben (wer, bis wann) und offenen Fragen, abgelegt in einer Tabelle.
- **Messe-Nachbereitung:** Stichworte aus Gesprächen am Messestand werden zu sauberen Gesprächsnotizen mit Folgeaufgaben für jede Kontaktperson.
- ⚠️ **Freigabe:** Teams-Transkripte automatisch abholen braucht immer eine Admin-Freigabe. Zum Start das Transkript als Text oder Datei übergeben.

### 2. E-Mail-Anfragen sortieren und Antwortentwürfe · Skill `mail-triage-entwuerfe`
- **Info-Postfach der Tourist-Info:** Gästeanfragen werden nach Thema sortiert (Prospektbestellung, Unterkunft, Veranstaltung, Beschwerde), und die KI legt einen freundlichen **Antwortentwurf** ab, den du nur noch prüfst und abschickst.
- **Presse- und Partneranfragen weiterleiten:** Eingehende Mails automatisch erkennen und an die zuständige Person im Team weitergeben, mit kurzer Zusammenfassung.
- ⚠️ **Freigabe:** Zugriff auf ein Outlook-Postfach braucht in üblich eingerichteten Microsoft-365-Organisationen eine Admin-Freigabe. Ohne Freigabe mit Beispiel-Mails üben. Entwürfe statt automatisch senden.

### 3. Wiederkehrende Berichte · Skill `bericht-zeitgesteuert`
- **Monatlicher Kennzahlen-Bericht:** Jeden Monatsersten werden Nächtigungs- oder Besucherzahlen aus einer Tabelle gelesen, mit dem Vorjahr verglichen und als kurzer Bericht an Geschäftsführung oder Gemeinden gemailt.
- **Wochenbericht Online-Kanäle:** Jeden Montag eine Übersicht zu Website-Anfragen, Newsletter-Anmeldungen oder Social-Media-Beiträgen der Vorwoche.
- ⚠️ **Freigabe:** Versand über ein Outlook-Postfach braucht in der Regel eine Admin-Freigabe. Zum Start den Bericht als Entwurf oder Datei erzeugen.

### 4. Terminfindung und Koordination · Skill `terminkoordination`
- **Führungen im Kulturbetrieb:** Eine Buchungsanfrage für eine Führung kommt herein; der Ablauf prüft, welche Guides frei sind, und schlägt passende Termine vor.
- **Qualitätsbesuche bei Partnerbetrieben:** Terminvorschläge für Besuche an mehrere Betriebe schicken, Rückmeldungen sammeln und die bestätigten Termine in einer Liste zusammenführen.
- ⚠️ **Freigabe:** Kalenderzugriff in Microsoft 365 braucht in der Regel eine Admin-Freigabe; bei Google auf einer selbst gehosteten n8n eine eigene OAuth-App.

### 5. Daten analysieren und visualisieren · Skill `daten-visualisieren`
- **Gästebefragung auswerten:** Antworten aus einem Fragebogen werden zusammengefasst, offene Kommentare nach Themen gebündelt und als Diagramme dargestellt.
- **Besucherzahlen verstehen:** Eintritte eines Museums oder einer Attraktion nach Wochentag, Monat und Wetter auswerten und in einem kleinen Dashboard zeigen.

### 6. Präsentationen effizienter erstellen · Skill `praesentation`
- **Folien für die Gremiensitzung:** Aktuelle Zahlen und Highlights werden automatisch in eine vorbereitete **Google-Slides-Vorlage** eingesetzt (Platzhalter ersetzen), bereit für Vorstand oder Aufsichtsrat.
- **Angebotspräsentation für Partner:** Aus Textbausteinen und einer kurzen Beschreibung entsteht eine Gliederung mit Folientexten, die du nur noch gestaltest.
- Hinweis: n8n hat **keinen PowerPoint-Node**. Der **Google-Slides-Node** kann Platzhalter in einer Vorlage ersetzen; für PowerPoint liefert der Ablauf Gliederung und Texte.
- ⚠️ **Freigabe:** Google Slides auf einer selbst gehosteten n8n braucht eine eigene Google-OAuth-App. Im Status „Testing" laufen die Anmeldungen nach 7 Tagen ab.

### Zugriff und Freigaben · Skill `m365-google-freigaben`
Für alle Themen, die ein **Postfach, einen Kalender, Teams oder ein Google-Konto** brauchen: früh klären, ob eine IT-Freigabe nötig ist und wer Admin ist.

---

## Weitere Ideen

### Gäste und Anfragen
- **Gästeanfragen automatisch beantworten:** Kommt eine Anfrage per Mail oder Formular herein, erstellt die KI einen freundlichen Antwortentwurf (den du nur noch abschickst).
- **Anfragen sortieren und weiterleiten:** Eingehende Nachrichten automatisch nach Thema (Buchung, Beschwerde, Info) einordnen und an die richtige Person schicken.
- **Belegungs- und Verfügbarkeitsauskunft:** Auf „Habt ihr am Wochenende frei?" automatisch mit dem aktuellen Stand antworten.
- **Mehrsprachige Gäste:** Infotexte oder Antworten automatisch übersetzen.

### Inhalte und Website
- **Öffnungszeiten und Events aktuell halten:** Zeiten und Veranstaltungen zentral pflegen und automatisch dort ausgeben, wo Gäste danach fragen.
- **Veranstaltungskalender füttern:** Events aus verschiedenen Quellen einsammeln und in einer Liste oder einem Kalender bündeln.
- **Social-Media-Textentwürfe:** Aus einem Event oder Angebot automatisch Vorschläge für Beiträge (Text) erzeugen.
- **Wetterbasierte Ausflugstipps:** Je nach Wetter passende Aktivitäten oder Touren empfehlen.

### Feedback und Qualität
- **Bewertungen und Feedback sammeln:** Rückmeldungen einsammeln und automatisch zu einer kurzen Übersicht zusammenfassen.
- **Newsletter und Willkommensmail:** Neue Anmeldungen verarbeiten und automatisch eine Begrüßung mit ersten Infos schicken.

### Abläufe und Daten
- **Meldungen strukturiert erfassen:** z. B. Angaben zu Orts- bzw. Kurtaxe oder Gästekarte sauber in eine Tabelle bringen.
- **Kleiner Gäste-Chatbot (FAQ):** beantwortet häufige Fragen (Anreise, Parken, Öffnungszeiten) auf deiner Website mit einem KI-Agenten.

---

**Gefällt dir eine Idee, oder hast du eine eigene, weißt aber nicht, wie du sie beschreiben sollst?**
Sag einfach: **„Hilf mir, meine Idee zu klären."** → Claude stellt dir ein paar einfache Fragen und macht daraus einen fertigen Bau-Plan.
