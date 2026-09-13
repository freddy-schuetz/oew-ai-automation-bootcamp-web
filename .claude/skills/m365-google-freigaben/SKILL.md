---
name: m365-google-freigaben
description: Erkennt früh, ob ein Vorhaben an einer Freigabe der IT für Microsoft 365 oder Google Workspace hängt, erklärt das in einfacher Sprache, zeigt Umwege, die sofort gehen, und passt die Textvorlage „Bitte an die IT“ an. Verwenden, sobald ein Vorhaben Outlook-Postfach, Kalender, Teams, Teams-Transkripte, SharePoint, OneDrive, Gmail, Google Drive, Google Sheets oder Google Slides anbinden soll, beim Planen mit idee-klaeren oder grill-me, wenn beim Verbinden „Need admin approval“, „Administratorgenehmigung erforderlich“, AADSTS90094, admin_policy_enforced oder „Zugriff blockiert“ erscheint, oder wenn Google-Zugangsdaten nach einer Woche plötzlich nicht mehr funktionieren.
---

# Microsoft 365 und Google: Freigaben früh erkennen

Viele Vorhaben im Bootcamp berühren Postfach, Kalender, Teams oder Google-Dateien. Den Workflow zu bauen ist selten das Problem. Das Problem ist die Erlaubnis, auf die Daten zuzugreifen. Diese Frage klärst du am Tag 1 beim Planen und nicht am Tag 3 kurz vor dem Ziel.

## Haltung beim Erklären

- Sprich die Person in du-Form an, in einfacher Sprache. Übersetze Fachwörter: „Admin-Zustimmung“ heißt „jemand aus deiner IT muss einmal zustimmen“. „Scope“ heißt „Berechtigung“.
- Ein Blocker ist kein Scheitern. Baue den Prototyp so, dass die Datenquelle ein austauschbarer erster Baustein ist: heute Datei-Upload, später Postfach. Der Rest des Workflows bleibt gleich.
- Schlage nie vor, Regeln der IT zu umgehen. Also keine privaten Konten für dienstliche Daten, keine automatischen Weiterleitungen nach außen ohne Erlaubnis, keine geteilten Passwörter. Ein Umweg ist nur, was die Person ohnehin tun darf: exportieren, hochladen, Beispiele kopieren.
- Versprich nichts, was die IT entscheidet. Sag „das entscheidet deine IT“, nicht „das geht schon“.
- Wo du unsicher bist, formuliere weich („in vielen Organisationen“) und prüfe nach, statt zu raten. Die Einstellungen unterscheiden sich von Organisation zu Organisation.

## Schritt 1: Vier Fragen (Entscheidungsbaum)

Stelle die Fragen einzeln und in dieser Reihenfolge.

```text
1. Braucht der erste Prototyp echten Live-Zugriff auf Postfach, Kalender oder Dateien?
   nein  → Umweg aus Schritt 4 wählen, Anbindung als nächsten Schritt notieren. Fertig.
   ja    → weiter mit 2

2. Microsoft 365 oder Google Workspace?
   Microsoft 365     → weiter mit 3, danach Schritt 2a (Ampel Microsoft 365)
   Google Workspace  → weiter mit 3, danach Schritt 2b (Ampel Google)
   etwas anderes     → (eigener Mailserver, Postfach beim Webhoster) IMAP und SMTP
                        mit Benutzername und Passwort prüfen, geht oft ohne IT.
                        Dienstliches Passwort aber nie in die zentrale Bootcamp-n8n.

3. Welche n8n?
   zentrale Bootcamp-n8n  → selbst gehostet, ein gemeinsamer Login (Sonderfall unten lesen)
   eigene n8n, selbst gehostet
   eigene n8n Cloud (bezahlter Plan)

4. Welche Daten genau?
   lesen, schreiben oder beides?
   eigenes Postfach oder Sammelpostfach (zum Beispiel info@)?
   → Zeile in der Ampel suchen
```

Frage 2 ohne Technik klären: „Öffnest du deine Mails im Browser unter outlook.office.com oder unter mail.google.com?“ Wer Teams und SharePoint nutzt, ist fast immer bei Microsoft 365. Wer Google Meet und Google Drive nutzt, ist bei Google Workspace.

### Sonderfall zentrale Bootcamp-n8n

Die zentrale Bootcamp-n8n unter https://n8n-oew.buildbar.at hat einen gemeinsamen Login für alle. Alle sehen alle Workflows und alle Zugangsdaten. Daraus folgt:

- Keine dienstlichen Postfächer, Kalender oder Google-Konten dort verbinden. Andere könnten diese Zugangsdaten in ihren eigenen Workflows verwenden.
- Für eine echte Anbindung nimmt die Person ein Test-Konto oder eine eigene n8n. Eine Freigabe der IT für ein echtes Dienstkonto auf der zentralen Bootcamp-n8n anzufragen ist nicht sinnvoll.
- Die zentrale Bootcamp-n8n ist selbst gehostet. Einen Ein-Klick-Knopf wie in n8n Cloud gibt es dort nicht. Microsoft braucht eine App-Registrierung, Google einen eigenen OAuth-Client. Ob für das Bootcamp eine vorbereitet ist, weiß Friedemann. Behaupte es nicht.

## Schritt 2a: Ampel Microsoft 365

### Warum Microsoft so oft blockt

Bei Microsoft gibt es zwei Arten von Zustimmung: Die Person stimmt selbst zu, oder die IT stimmt für die ganze Organisation zu (Admin-Zustimmung). Welche Berechtigungen Personen selbst freigeben dürfen, legt jede Organisation fest.

Viele Organisationen nutzen die von Microsoft verwaltete, empfohlene Einstellung. Laut Microsoft-Ankündigung MC1163922 (Rollout Ende Oktober bis Ende November 2025) brauchen in dieser Einstellung alle Apps von Drittanbietern, die über delegierte Berechtigungen auf Exchange- und Teams-Inhalte zugreifen (Mail, Kalender, Kontakte, Teams-Chats und Besprechungen, auch über IMAP, POP, EWS und EAS), die Admin-Zustimmung. Die Ankündigung nennt keine einzelnen Berechtigungen. Typische betroffene Berechtigungen sind zum Beispiel:

- Mail: Mail.Read, Mail.ReadBasic, Mail.ReadWrite sowie die .Shared-Varianten, MailboxSettings.Read, MailboxSettings.ReadWrite
- Kalender: Calendars.Read, Calendars.ReadBasic, Calendars.ReadWrite sowie die .Shared-Varianten
- Kontakte: Contacts.Read, Contacts.ReadWrite
- Teams: Chat.Read, Chat.ReadWrite, OnlineMeetings.Read, OnlineMeetings.ReadWrite
- Postfach-Protokolle: IMAP.AccessAsUser.All, POP.AccessAsUser.All, EWS.AccessAsUser.All, EAS.AccessAsUser.All
- Dateien und SharePoint (schon seit 2025, nicht Teil von MC1163922): Files.Read.All, Files.ReadWrite.All, Sites.Read.All, Sites.ReadWrite.All

Wer schon früher zugestimmt hat, ist nicht betroffen. Eine neue Verbindung aus n8n ist aber neu. Rechne damit, dass auch reines Senden (Mail.Send) betroffen ist, und probier es im Zweifel aus. Manche Organisationen erlauben gar keine eigene Zustimmung.

Unabhängig von jeder Einstellung brauchen organisationsweite Berechtigungen immer die Admin-Zustimmung, zum Beispiel User.Read.All, Group.ReadWrite.All, ChannelMessage.Read.All und Transkript-Berechtigungen. Das gilt auch für jeden App-only-Zugriff (Service Principal).

### Ampel

Standard-Berechtigungen laut Quellcode der n8n-Zugangsdaten (Stand September 2026). Andere n8n-Versionen können abweichen, siehe Schritt 3.

| Daten | n8n-Baustein und Zugangsdaten-Typ | Standard-Berechtigungen | Ohne IT? |
|---|---|---|---|
| Outlook-Postfach lesen, sortieren, Entwürfe anlegen | Microsoft Outlook, Microsoft Outlook Trigger · `microsoftOutlookOAuth2Api` | openid, offline_access, Contacts.Read, Contacts.ReadWrite, Calendars.Read, Calendars.Read.Shared, Calendars.ReadWrite, Mail.ReadWrite, Mail.ReadWrite.Shared, Mail.Send, Mail.Send.Shared, MailboxSettings.Read | Mit der von Microsoft empfohlenen Einstellung nein. Auch mit gekürzten Berechtigungen (nur Mail.Read) nein. |
| Sammelpostfach (info@) | wie oben, in den Zugangsdaten „Use Shared Mailbox“ | zusätzlich eine Postfach-Berechtigung in Exchange | nein |
| Kalender | Microsoft Outlook (Kalender-Vorgänge) · `microsoftOutlookOAuth2Api` | Calendars.* | nein |
| Teams: Kanäle, Nachrichten, Chats, Aufgaben | Microsoft Teams, Microsoft Teams Trigger · `microsoftTeamsOAuth2Api` | openid, offline_access, User.Read.All, Group.ReadWrite.All, Chat.ReadWrite, ChannelMessage.Read.All, OnlineMeetings.ReadWrite. Für den Teams Trigger zusätzlich Chat.Read.All, Team.ReadBasic.All und Subscription.Read.All (laut Hinweis in den n8n-Zugangsdaten, einzutragen in Microsoft Entra) | nein, immer IT |
| Teams-Transkripte | Der Teams-Baustein hat keinen Transkript-Vorgang (nur Channel, Channel Message, Chat Message, Task). Nur per HTTP Request an Microsoft Graph mit `microsoftOAuth2Api`. | Transkript-Berechtigungen wie OnlineMeetingTranscript.Read.All | nein, immer IT. Außerdem muss die Transkription in der Teams-Richtlinie eingeschaltet sein. |
| OneDrive-Dateien | Microsoft OneDrive · `microsoftOneDriveOAuth2Api` | openid, offline_access, Files.ReadWrite.All | nein |
| Excel-Datei im eigenen OneDrive | Microsoft Excel (OneDrive) · `microsoftExcelOAuth2Api` | openid, offline_access, Files.ReadWrite | Nicht unter den Beispielen oben. Hängt von der Einstellung ab, ausprobieren. |
| SharePoint | Microsoft SharePoint · `microsoftOAuth2Api` (Berechtigungen selbst eintragen) oder Service Principal | zum Beispiel Sites.Selected oder Sites.Read.All | in aller Regel IT |
| Postfach per IMAP mit Passwort | Email Trigger (IMAP) · `imap` (nur Benutzername und Passwort) | keine Microsoft-Anmeldung | Bei Exchange Online abgeschaltet. Geht nicht. |
| Mails senden per SMTP mit Passwort | Send Email · `smtp` (nur Benutzername und Passwort) | SMTP AUTH | In vielen Organisationen schon aus. Microsoft hat angekündigt, es Ende Dezember 2026 für bestehende Organisationen standardmäßig abzuschalten. Kein Fundament für eine Lösung, die bleiben soll. |

### Was die Art der n8n bei Microsoft ändert

- **n8n Cloud:** Die Person klickt in den Zugangsdaten auf „Connect my account“ und braucht keine eigene App-Registrierung. Die Einstellung ihrer Organisation gilt trotzdem. Postfach und Kalender brauchen also genauso die IT.
- **Selbst gehostet (auch die zentrale Bootcamp-n8n):** Es braucht eine App-Registrierung in Microsoft Entra mit Client-ID und Client-Secret. Die n8n-Doku nennt als Kontotyp „Accounts in any organizational directory (Multi-tenant) and personal Microsoft accounts“. Als Redirect-URL trägt man die „OAuth Redirect URL“ ein, die n8n im Zugangsdaten-Dialog anzeigt.
  - Registriert die Person die App in der eigenen Organisation: In vielen Organisationen dürfen Mitarbeitende keine Apps registrieren.
  - Ist die App in einer fremden Organisation als Multi-Tenant registriert (zum Beispiel beim Dienstleister): Über die Zustimmung entscheidet die Einstellung der Organisation der Person, nicht die der fremden Organisation. Manche Einstellungen erlauben eigene Zustimmung nur für Apps von verifizierten Herausgebern oder aus der eigenen Organisation.
- **Service Principal (App-only),** Zugangsdaten-Typ `microsoftEntraServicePrincipalApi` mit Tenant-ID, Client-ID und Secret oder Zertifikat: Das ist ein Weg für die IT, nicht für Teilnehmende. Er braucht immer die Admin-Zustimmung. Ohne Einschränkung gilt der Zugriff für die ganze Organisation. In Exchange Online kann die IT ihn auf einzelne Postfächer begrenzen. Laut Hinweis im Teams-Baustein gehen Chat-Nachrichten und das Senden in Kanäle damit nicht.

### Microsoft-Fehlermeldungen erkennen

| Meldung | Bedeutung | Was die Person tut |
|---|---|---|
| „Need admin approval“, auf Deutsch sinngemäß „Administratorgenehmigung erforderlich“, oder AADSTS90094 | Die Organisation lässt diese Berechtigungen nur mit Admin-Zustimmung zu. Kein Fehler der Person und kein Fehler von n8n. | Umweg wählen, Bitte an die IT schicken |
| AADSTS90095 oder ein Knopf „Genehmigung anfordern“ mit Feld für eine Begründung | Die Organisation hat einen Genehmigungsweg eingerichtet. | Antrag stellen, Begründung aus der Vorlage in Schritt 5 nehmen |
| AADSTS65001 | Für diese App gibt es noch keine Zustimmung. | Einmal über „Connect“ neu verbinden. Kommt dann eine der Meldungen oben: IT. |
| AADSTS700016 | Die App wurde in dieser Organisation nicht gefunden: falsche Client-ID, falsche Organisation in der Anmelde-Adresse oder App nicht als Multi-Tenant registriert. | Einrichtung prüfen, das ist lösbar ohne IT |
| AADSTS50011 | Die Redirect-URL passt nicht zur App-Registrierung. | OAuth Redirect URL aus n8n in der App-Registrierung eintragen |

Bei anderen AADSTS-Nummern: Nummer in der Microsoft-Doku nachschlagen (https://learn.microsoft.com/en-us/entra/identity-platform/reference-error-codes), nicht raten.

## Schritt 2b: Ampel Google

Kurz vorweg: Bei Google hängt es weniger an einzelnen Berechtigungen als an zwei Fragen. Welche n8n (Cloud oder selbst gehostet)? Und sperrt der Workspace-Admin Apps von Drittanbietern?

| Situation | Ohne IT? |
|---|---|
| n8n Cloud, Workspace ohne App-Sperre | ja, per „Sign in with Google“ |
| selbst gehostete n8n, eigener OAuth-Client im Status „Testing“ | ja, aber alle 7 Tage neu verbinden |
| Workspace-Admin sperrt nicht freigegebene Apps | nein, die IT muss die App freigeben |
| Service Account mit domänenweiter Delegation | nein, das richtet nur die IT ein |

### Standard-Berechtigungen der n8n-Zugangsdaten

Alle Kurzformen beginnen mit `https://www.googleapis.com/auth/`. Stand September 2026 laut Quellcode von n8n.

| Daten | n8n-Baustein und Zugangsdaten-Typ | Standard-Berechtigungen |
|---|---|---|
| Gmail | Gmail, Gmail Trigger · `gmailOAuth2` (alternativ Service Account `googleApi`) | gmail.labels, gmail.addons.current.action.compose, gmail.addons.current.message.action, https://mail.google.com/, gmail.modify, gmail.compose |
| Kalender | Google Calendar · `googleCalendarOAuth2Api` (nur OAuth2) | calendar, calendar.events |
| Drive | Google Drive · `googleDriveOAuth2Api` (alternativ `googleApi`) | drive, drive.appdata, drive.photos.readonly |
| Sheets | Google Sheets · `googleSheetsOAuth2Api` (alternativ `googleApi`) | drive.file, spreadsheets, drive.metadata |
| Slides | Google Slides · `googleSlidesOAuth2Api` (alternativ `googleApi`) | drive.file, presentations |

Der Slides-Baustein kann: Präsentation Create, Get, Get Slides, Replace Text sowie Seite Get und Get Thumbnail. Eine Vorlage kopieren geht über den Google-Drive-Baustein mit dessen eigenen Zugangsdaten.

### Was die Art der n8n bei Google ändert

- **n8n Cloud:** „Sign in with Google“ direkt in n8n, ohne eigenes Google-Cloud-Projekt. Laut n8n-Doku unter anderem für Google Calendar, Gmail, Drive, Sheets, Slides und Docs.
- **Selbst gehostet (auch die zentrale Bootcamp-n8n):** Es braucht ein eigenes Google-Cloud-Projekt mit OAuth-Client (Typ Webanwendung). Die passenden APIs müssen aktiviert sein (zum Beispiel Gmail API, Google Calendar API, Google Drive API, Google Sheets API, Google Slides API). Als Redirect-URL trägt man die „OAuth Redirect URL“ aus dem n8n-Zugangsdaten-Dialog ein. Bei der Zielgruppe (Audience) gibt es drei Fälle:
  - **Internal:** nur Konten aus derselben Google-Workspace-Organisation. Das Projekt muss zu dieser Organisation gehören. Keine 7-Tage-Grenze.
  - **External im Status „Testing“:** Die Konten müssen als Testnutzer eingetragen sein. Zustimmung und Tokens laufen nach 7 Tagen ab. Danach die Zugangsdaten in n8n neu verbinden. Für einen Prototyp im Bootcamp reicht das, für den Dauerbetrieb nicht.
  - **External veröffentlicht:** Gmail und voller Drive-Zugriff gelten bei Google als besonders geschützte Berechtigungen. Je nach Berechtigung verlangt Google dann eine Prüfung der App.
- **Workspace-Admins** können Apps von Drittanbietern sperren oder nur freigegebene Apps erlauben (Admin-Konsole unter Security, Access and data control, API controls). Das gilt auch für n8n Cloud.
- **Private @gmail.com-Konten** brauchen keine IT, sind aber nicht für dienstliche Daten gedacht. Für Tests mit Beispieldaten sind sie in Ordnung.

### Google-Fehlermeldungen erkennen

| Meldung | Bedeutung | Was die Person tut |
|---|---|---|
| admin_policy_enforced | Der Workspace-Admin erlaubt diese App nicht. | Umweg wählen, Bitte an die IT: OAuth-Client-ID als vertrauenswürdig markieren |
| „Zugriff blockiert“ oder access_denied beim Verbinden | Häufig: Konto nicht als Testnutzer eingetragen oder App nicht geprüft | Testnutzer im Google-Cloud-Projekt eintragen |
| invalid_grant nach ungefähr einer Woche | Die 7-Tage-Grenze im Status „Testing“ | Zugangsdaten in n8n neu verbinden |
| redirect_uri_mismatch | Redirect-URL im OAuth-Client passt nicht | OAuth Redirect URL aus n8n eintragen |

## Schritt 3: Prüfen statt raten

1. Zugangsdaten-Typen eines Bausteins mit n8n-mcp nachsehen: `get_node` mit `nodeType` (zum Beispiel `nodes-base.microsoftOutlook`), `mode: "search_properties"` und `propertyQuery: "authentication"`. Bei Google Calendar gibt es kein Auswahlfeld, dort gilt nur OAuth2.
2. Die Standard-Berechtigungen zeigt `get_node` nicht. Sie stehen im Zugangsdaten-Dialog der jeweiligen n8n: Schalter „Custom Scopes“ einschalten, dann erscheint die Liste. Weicht sie von den Tabellen oben ab, gilt die Instanz.
3. Vor der Bitte an die IT die Berechtigungen auf das Nötigste kürzen („Custom Scopes“). Beispiel Postfach sortieren und Entwürfe anlegen: openid, offline_access, Mail.ReadWrite. Kontakte und Kalender weglassen. n8n warnt, dass gekürzte Berechtigungen einzelne Vorgänge brechen können. Deshalb den Workflow danach einmal testen.

## Schritt 4: Umwege, die sofort gehen

| Vorhaben | Umweg für den Prototyp | Später ersetzen durch |
|---|---|---|
| Meetingnotizen | Mitschrift oder Transkript als Datei über ein n8n-Formular (n8n Form Trigger mit Datei-Feld) hochladen. Text-Dateien (.txt, .vtt) und PDF liest „Extract from File“ direkt. Word-Dateien (.docx) vorher als PDF oder Text speichern. | automatischer Abruf der Teams-Transkripte (IT) |
| E-Mail-Anfragen | 10 bis 20 typische Anfragen anonymisiert als Beispiele in eine Tabelle oder Textdatei kopieren und hochladen. Ergebnis (Kategorie, Antwortentwurf) in eine Data Table oder eine kleine Oberfläche schreiben. Einzelne Mails von Hand an ein Test-Postfach weiterzuleiten geht auch, wenn die Person das darf. | Outlook- oder Gmail-Trigger und „Entwurf anlegen“ |
| Wiederkehrende Berichte | Export-Datei (CSV oder Excel) aus dem Analyse-Werkzeug oder der Tabelle hochladen. Den Zeitplan als Auslöser später ergänzen. | direkte Schnittstelle, Excel- oder Sheets-Baustein |
| Terminfindung | Umfrage per n8n-Formular, Antworten in einer Data Table sammeln, Ergebnis per Mail. Die Einladung als .ics-Datei erzeugen (Baustein „Convert to File“, Vorgang „Convert to ICS“) statt direkt in einen Kalender zu schreiben. | Kalender-Baustein |
| Daten analysieren | Excel- oder CSV-Datei über ein n8n-Formular hochladen | Abruf aus Ablage oder Schnittstelle |
| Präsentationen | Google Slides mit einem Test-Google-Konto: Vorlage mit Platzhaltern, „Replace Text“ füllt sie. Auf selbst gehosteter n8n die 7-Tage-Grenze einplanen. Für PowerPoint gibt es keinen n8n-Baustein: Inhalte als Text oder Tabelle erzeugen oder einen kleinen Zusatzdienst im Vorgespräch klären (Skill `praesentation`). | Slides mit Dienstkonto oder PowerPoint-Weg der Organisation |

**Power Automate als Zubringer.** Nur wenn die Organisation Power Automate schon nutzt. Ein Flow mit Standard-Connectors (zum Beispiel Office 365 Outlook, OneDrive for Business, SharePoint, Excel Online) läuft innerhalb von Microsoft 365 unter den Regeln der IT. Er kann Mails, Anhänge oder Formularantworten in einer Ablage sammeln, die die Person ohnehin nutzen darf, etwa einem Ordner oder einer Excel-Tabelle. Für den Prototyp exportiert die Person daraus. Den direkten Aufruf eines n8n-Webhooks erledigt der HTTP-Connector, und der ist Premium. Richtlinien gegen Datenverlust (DLP) können Verbindungen nach außen sperren. Im Zweifel die IT fragen.

Nicht erlaubt als Umweg: die proprietär lizenzierten Office-Skills von Anthropic (pptx, docx, xlsx aus anthropics/skills) kopieren oder nachbauen.

## Schritt 5: Bitte an die IT (Textvorlage)

So passt du die Vorlage an:

- Frag die fehlenden Angaben einzeln ab. Erfinde nichts, vor allem nicht Betreiber und Standort der n8n.
- Nutzt die Person die zentrale Bootcamp-n8n, keine Bitte an die IT für ein Dienstkonto formulieren (siehe Sonderfall zentrale Bootcamp-n8n), sondern Umweg wählen und bei Fragen an Friedemann verweisen.
- Nenne nur die Berechtigungen, die nach Schritt 3 wirklich gebraucht werden. Erkläre jede in einem Halbsatz.
- Streiche die Zeilen der Plattform, die nicht passt (Microsoft oder Google).
- Halte den Text kurz. Die Person schickt ihn selbst. Rechne damit, dass die IT einige Tage braucht. Am besten geht die Bitte vor dem Bootcamp raus oder spätestens am Tag 1.
- Weise darauf hin, was ohne Freigabe weiterläuft (Umweg aus Schritt 4). So entsteht kein Druck.

```text
Betreff: Bitte um Freigabe: [Anbindung, z. B. Lesezugriff Sammelpostfach] für einen Workflow-Prototyp

Hallo [Name],

ich nehme vom 21. bis 24.09.2026 am AI Automation Bootcamp der Österreich Werbung teil
und baue dort einen Prototyp für [Vorhaben in einem Satz].

Wofür
[Nutzen in ein bis zwei Sätzen, z. B.: Neue Anfragen im Postfach info@ werden nach Thema
sortiert und bekommen einen Antwortentwurf. Gesendet wird nichts automatisch, ich prüfe
jeden Entwurf selbst.]

Welche App
[Microsoft: App-Registrierung „…“, Client-ID …, registriert bei …]
[Google: OAuth-Client-ID …, Google-Cloud-Projekt …]
[n8n Cloud: die von n8n bereitgestellte App]
Workflow-Plattform: n8n unter [Adresse], betrieben von [Betreiber, Standort].

Welche Berechtigungen (delegiert, nur im Namen meines Kontos)
- [z. B. Mail.ReadWrite: Mails lesen und Entwürfe anlegen]
- [offline_access: Die Verbindung bleibt bestehen, ohne tägliche Neuanmeldung]
- [openid: Mein Konto wird erkannt]
Nicht nötig: [z. B. Kalender, Kontakte, andere Postfächer]

Datenfluss
1. Quelle: [Postfach, Ordner, Kalender, Datei]
2. Verarbeitung: n8n unter [Adresse]. Gespeichert wird [was, wie lange].
3. KI-Schritt: [z. B. Der Text der Anfrage geht zur Einordnung an die Anthropic-API (Claude).]
   [oder: kein KI-Schritt]
4. Ziel: [z. B. Entwurf im selben Postfach, Zeile in einer Tabelle]
Personenbezogene Daten: [ja oder nein, welche, wie ich sie gering halte]

Zeitraum
[z. B. Test bis 24.09.2026, danach entscheiden wir über den Weiterbetrieb.]
Die Zustimmung lässt sich jederzeit widerrufen.

Was ihr tun müsstet
[Microsoft: Admin-Zustimmung für die App im Namen der Organisation erteilen,
 zu finden im Microsoft Entra Admin Center unter Unternehmensanwendungen.]
[Google: OAuth-Client-ID in der Admin-Konsole unter API controls als vertrauenswürdig markieren.]
Falls das so nicht geht: [Alternative, z. B. ein eigenes Test-Postfach nur für den Prototyp].
Bis dahin arbeite ich mit [Umweg, z. B. anonymisierten Beispielmails].

Ansprechperson
[Name, Rolle, Telefon oder Mail]
Technische Fragen zum Aufbau im Bootcamp: Friedemann Schütz (Trainer)

Danke und viele Grüße
[Name]
```

## Schritt 6: Ergebnis festhalten

Schreib in den Steckbrief `mein-use-case.md` (aus `idee-klaeren`):

- Datenquelle und Ergebnis der Ampel: geht sofort, hängt von der Einstellung ab oder braucht die IT
- gewählter Umweg für den Prototyp
- offene Freigabe: an wen geschickt, wann, mit welchen Berechtigungen
- nächster Schritt, sobald die Freigabe da ist (welcher Baustein wird getauscht). Offene Freigaben kommen am Tag 4 als nächster Schritt in die README.

## Quellen (zum Nachprüfen)

- Standard-Berechtigungen: Quellcode der n8n-Zugangsdaten, https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/credentials (Dateien MicrosoftOutlookOAuth2Api, MicrosoftTeamsOAuth2Api, MicrosoftOneDriveOAuth2Api, MicrosoftExcelOAuth2Api, GmailOAuth2Api, GoogleCalendarOAuth2Api, GoogleDriveOAuth2Api, GoogleSheetsOAuth2Api, GoogleSlidesOAuth2Api)
- n8n Microsoft-Zugangsdaten: https://docs.n8n.io/integrations/builtin/credentials/microsoft/
- n8n Google-Zugangsdaten und 7-Tage-Grenze: https://docs.n8n.io/integrations/builtin/credentials/google/ und https://docs.n8n.io/integrations/builtin/credentials/google/oauth-generic/
- Eigene Zustimmung in Microsoft Entra: https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-user-consent
- Microsoft-Ankündigung MC1163922 (Admin-Zustimmung für Exchange- und Teams-Inhalte): https://mc.merill.net/message/MC1163922
- AADSTS-Fehlercodes: https://learn.microsoft.com/en-us/entra/identity-platform/reference-error-codes
- SMTP AUTH in Exchange Online: https://techcommunity.microsoft.com/blog/exchange/updated-exchange-online-smtp-auth-basic-authentication-deprecation-timeline/4489835
