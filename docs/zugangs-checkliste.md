# Zugangs-Checkliste

Mit dieser Liste bereitest du dich auf das AI Automation Bootcamp vor (21. bis 24.09.2026, Österreich Werbung, Vordere Zollamtsstraße 13, 1030 Wien). Hake ab, was erledigt ist. Was offen bleibt, besprichst du beim Online-Kick-off am Mittwoch, 16.09.2026, um 10:30 oder im Einzelgespräch.

Du musst nicht alles allein lösen. Wichtig ist nur, dass offene Punkte vor Tag 1 auf dem Tisch liegen und nicht erst am Tag 3.

**Wichtige Adressen**

- Event-Seite: https://buildbar.at/oew
- Zugangsbereich mit Passwort: https://buildbar.at/oew#zugang
- Anleitung Web: https://buildbar.at/oew/starten/web
- Anleitung Desktop: https://buildbar.at/oew/starten/desktop
- Themen: https://buildbar.at/oew/themen
- Grundlagen: https://buildbar.at/oew/grundlagen
- Infos für Claude (ohne Zugangsdaten): https://buildbar.at/oew/claude.md

---

## 1. Claude-Plan

- [ ] Du hast einen **bezahlten Claude-Plan**: Pro, Max, Team oder Enterprise. Mit dem kostenlosen Plan geht Claude Code nicht.
- [ ] Du kannst dich unter https://claude.ai anmelden.
- [ ] **Plan über deine Organisation (Team oder Enterprise)?** Dann muss eine Administratorin oder ein Administrator deiner Organisation Claude Code im Browser und die GitHub-Verbindung freischalten. Frag rechtzeitig nach, das kann ein paar Tage dauern.
- [ ] Du weißt: Gebaut wird mit **Claude Code**. Cowork eignet sich nicht als Bauumgebung für dein Repository.

## 2. GitHub-Account

- [ ] Du hast einen **GitHub-Account** und kannst dich anmelden, auch mit dem zweiten Faktor (zum Beispiel App am Handy).
- [ ] Du hast entschieden, ob du einen privaten oder einen dienstlichen Account nimmst. Dein Code-Repository liegt dort und bleibt nach dem Bootcamp bei dir.

## 3. Web oder Desktop

Du wählst einen von zwei Wegen. Beide führen zum selben Ergebnis.

| | Web (im Browser) | Desktop (App auf deinem Rechner) |
|---|---|---|
| Wo | https://claude.ai/code | Claude-Desktop-App |
| Installation | keine | nötig, dafür brauchst du Installationsrechte |
| Start | Onboarding unter https://hub-oew.buildbar.at. Es legt dir ein privates Repository namens ai-automation-bootcamp an. | Du sagst Claude: „Richte mir https://github.com/freddy-schuetz/oew-ai-automation-bootcamp ein.“ |
| Gut zu wissen | Claude speichert deine Änderungen auf einem Arbeitszweig. Veröffentlicht wird aus main. Bevor deine App online geht, führst du die Änderungen nach main zusammen (Pull Request mergen). Claude schlägt das vor und sagt dir, wo du klickst. Eine lokale Vorschau (localhost) gibt es im Web nicht. | Unter Windows installierst du vorher **Git for Windows** und **Node.js**. Node.js braucht Claude für die Verbindung zu n8n. |
| Anleitung | https://buildbar.at/oew/starten/web | https://buildbar.at/oew/starten/desktop |

- [ ] Du hast deinen Weg gewählt.
- [ ] **Desktop:** Du darfst auf deinem Rechner Programme installieren. Dienstrechner erlauben das oft nicht. Wenn nicht: IT fragen oder den Web-Weg nehmen.
- [ ] **Desktop unter Windows:** Git for Windows und Node.js sind installiert. Zum Prüfen öffnest du ein Terminal und tippst `git --version` und `node --version`. Kommt jeweils eine Versionsnummer, passt es.
- [ ] **Desktop auf dem Mac:** Auch hier prüfst du `git --version` und `node --version`. Fehlt etwas, hilft dir die Desktop-Anleitung.
- [ ] **Web:** Du hast die Anleitung Web einmal durchgelesen.

## 4. Welche n8n

- [ ] Du weißt, welche n8n du nutzt:
  - **Zentrale Bootcamp-n8n** unter https://n8n-oew.buildbar.at. Adresse, Login und API-Key stehen im Zugangsbereich. Achtung: Es gibt einen gemeinsamen Login für alle, und alle sehen alle Zugangsdaten. Verbinde dort keine dienstlichen Postfächer, Kalender oder Konten.
  - **Eigene n8n mit API-Zugang**, selbst gehostet oder als bezahlter Cloud-Plan. Du kannst dort einen API-Key erzeugen.
- [ ] Du weißt: Die **kostenlose Testversion von n8n Cloud reicht nicht**. Sie hat keine öffentliche API, und die braucht Claude, um mit n8n zu arbeiten.
- [ ] **KI-Zugang:** Du findest den Anthropic-API-Key im Zugangsbereich. Er hat ein Ausgabelimit. In n8n trägst du ihn als Zugangsdaten „Anthropic“ ein, nie in eine Datei im Repository. Auf der zentralen Bootcamp-n8n gibt es die Zugangsdaten „Anthropic“ vielleicht schon. Dann nimmst du diese und legst keine zweiten an.

## 5. Microsoft 365 oder Google

- [ ] Du weißt, womit deine Organisation arbeitet. Einfacher Test: Öffnest du deine Mails im Browser unter outlook.office.com (Microsoft 365) oder unter mail.google.com (Google Workspace)?
- [ ] Du weißt, welche Daten dein Vorhaben braucht:
  - Microsoft 365: Postfach, Kalender, Teams, SharePoint oder OneDrive
  - Google: Gmail, Drive, Sheets, Slides oder Kalender
  - oder nur Dateien, die du selbst hochlädst
- [ ] Du hast eingeschätzt, ob du eine **Freigabe deiner IT** brauchst:
  - **Microsoft 365, Postfach oder Kalender:** In den meisten Organisationen braucht der Zugriff eine Freigabe der IT.
  - **Teams und Teams-Transkripte:** braucht immer eine Freigabe der IT.
  - **Mit Passwort ins Postfach (IMAP):** geht bei Microsoft 365 nicht mehr.
  - **Google auf einer selbst gehosteten n8n** (auch der zentralen Bootcamp-n8n): Es braucht eine eigene OAuth-App in einem Google-Cloud-Projekt. Im Teststatus musst du die Verbindung alle 7 Tage erneuern. Auf der zentralen Bootcamp-n8n nur mit einem Test-Google-Konto.
  - **Google Workspace:** Deine IT kann Apps von außen sperren. Dann geht es nur mit Freigabe.
- [ ] **Freigabe nötig?** Dann schick die Bitte an deine IT möglichst vor dem Bootcamp los, spätestens am Tag 1. Das lohnt sich nur, wenn dein Workflow später auf einer eigenen n8n oder der n8n deiner Organisation laufen soll. Auf der zentralen Bootcamp-n8n verbindest du keine dienstlichen Konten, dort arbeitest du mit Beispieldaten oder einem Test-Konto. Claude hilft dir mit der Textvorlage „Bitte an die IT“ aus dem Skill `m365-google-freigaben`. Sag zum Beispiel: „Hilf mir mit dem Skill m365-google-freigaben, eine Bitte an meine IT zu formulieren.“ Die Vorlage nennt, welche App, welche Berechtigungen, wofür, wie die Daten fließen und wer deine Ansprechperson ist.
- [ ] **Plan B für den Start steht:** Datei hochladen, ein paar Beispielmails, eine Export-Datei oder eine Umfrage per n8n-Formular. Damit baust du, bis die Freigabe da ist.

## 6. Datenlage

- [ ] Du hast **Beispieldaten**: zum Beispiel 10 bis 20 typische Anfragen, eine alte Mitschrift, eine Export-Datei oder den Bericht vom letzten Monat.
- [ ] Du hast geprüft, ob **personenbezogene Daten** drin sind (Namen, Mail-Adressen, Telefonnummern, Buchungsdaten). Wenn ja: entfernen, anonymisieren oder erfundene Testdaten nehmen.
- [ ] Du weißt, ob du diese Daten mit einem KI-Dienst verarbeiten darfst. KI-Schritte in n8n schicken Text an die Anthropic-API. Im Zweifel fragst du deine Datenschutz-Ansprechperson.
- [ ] Du weißt, wo dein Workflow Daten ablegen kann:
  - **n8n Data Tables:** in jeder n8n dabei, der einfachste Start
  - **NocoDB:** Tabellen im Browser unter https://nocodb.buildbar.at, mit eigenem Account und API-Token
  - **Supabase der ÖW:** für Logins, Datei-Uploads und Suche in Dokumenten. Project-URL, anon-Schlüssel und service_role-Schlüssel stehen im Zugangsbereich. Der service_role-Schlüssel gehört nur in n8n, nie in eine Oberfläche und nie ins Repository.

## 7. Netz vor Ort

- [ ] Laptop und Netzteil sind eingepackt.
- [ ] **Dienstrechner:** Du hast getestet, ob https://claude.ai, https://github.com, https://buildbar.at/oew und https://n8n-oew.buildbar.at erreichbar sind. Web zusätzlich: https://hub-oew.buildbar.at. Desktop zusätzlich: https://deploy-oew.buildbar.at und https://registry.npmjs.org. Firmen-VPN, Proxy oder Firewall blockieren manchmal einzelne Seiten. Teste auch einmal ohne VPN.
- [ ] Du weißt: Die WLAN-Zugangsdaten vor Ort stehen im Zugangsbereich.
- [ ] **Plan B:** Der Hotspot deines Handys ist eingerichtet, und du hast den Laptop einmal damit verbunden.

## 8. Dein Ziel für Tag 4

Am Donnerstag, 24.09.2026, stellst du dein Ergebnis vor. Laut Ausschreibung nimmst du mit: eine erste funktionierende Workflow-Lösung, ein eigenes Code-Repository und einen klaren nächsten Schritt.

- [ ] Du kannst dein **Vorhaben in zwei, drei Sätzen** beschreiben: Was machst du heute von Hand, und was soll am Ende herauskommen?
- [ ] Du weißt, **was am Donnerstag funktionieren soll**: ein Durchlauf vom Eingang bis zum Ergebnis, mit Beispieldaten.
- [ ] Du weißt, **was ausdrücklich noch nicht dazugehört**, zum Beispiel die Live-Anbindung ans Postfach, wenn die IT noch nicht zugestimmt hat.
- [ ] Du weißt, **wer das Ergebnis nutzen soll** und wem du es danach zeigst.
- [ ] Du hast eine erste Idee für den **nächsten Schritt** in deiner Organisation.

---

## Fürs Einzelgespräch

Wenn du dir bei einem Punkt unsicher bist, bring ihn einfach mit. Hilfreich sind:

- dein Vorhaben in zwei, drei Sätzen
- dein gewählter Weg (Web oder Desktop) und was dabei noch hakt
- Microsoft 365 oder Google, und welche Daten du anbinden willst
- ob du schon mit deiner IT gesprochen hast
- ein Beispiel deiner Daten (anonymisiert) oder eine Beschreibung davon
- dein Ziel für Tag 4
