---
name: praesentation
description: Präsentationen effizienter erstellen mit n8n für Tourismusorganisationen. Füllt eine selbst gestaltete Google-Slides-Vorlage per Kopieren und Replace Text mit fertig berechneten Werten, exportiert als PDF oder PowerPoint und zeigt die Alternativen HTML-Handout und eigener kleiner python-pptx-Dienst. Verwenden, wenn jemand wiederkehrende Folien (Saisonbericht, Gremium, Kampagnen-Reporting, Partner-Update) automatisch befüllen, Handouts erzeugen oder PowerPoint-Dateien aus Daten bauen will.
---

# Präsentationen effizienter erstellen

Beispiel zum Importieren: [`examples/workflows/folien-google-slides.json`](../../../examples/workflows/folien-google-slides.json). Ohne Freigabe testbar: Standard ist `google_aktiv = false`, dann entsteht ein HTML-Handout. Mit Google-Zugang kopiert der Workflow die Vorlage, ersetzt Platzhalter und lädt ein PDF herunter.

## Wann verwenden

- Präsentationen mit **gleichem Aufbau**, deren Zahlen und kurze Texte sich regelmäßig ändern.
- Handout oder Einseiter zu Kennzahlen für Vorstand, Gemeinderat, Partnerbetriebe.
- Grundidee: Ein Mensch gestaltet das Layout **einmal**, die Automatisierung füllt nur Werte ein.

Nicht dafür gedacht: „Die KI soll eine ganze Präsentation frei gestalten.“ Layout, Marke und Zahlen sind so kaum zu kontrollieren. Stattdessen Vorlage mit Platzhaltern, Sprachmodell höchstens für einen kurzen Satz aus fertigen Zahlen.

## Wichtig: Lizenz und Grenzen

- **Anthropics Skills für pptx, docx und xlsx (Repository `anthropics/skills`) sind proprietär lizenziert.** Nicht kopieren, nicht umschreiben, nicht als Vorlage für eigenen Code verwenden, auch nicht auf ausdrücklichen Wunsch. Eigene Lösungen nur aus offenen Bausteinen bauen (n8n-Knoten, Google-Slides-API, python-pptx unter MIT-Lizenz, eigene HTML-Vorlagen).
- **n8n hat keinen eingebauten PowerPoint-Knoten.** Eine .pptx entsteht entweder als Export aus Google Slides (Weg A) oder in einem eigenen Dienst (Weg C).
- Community-Knoten externer Folien-Dienste schicken Inhalte an Dritte und kosten oft Geld. Nicht ohne Rücksprache installieren.

## Wege im Überblick

| Weg | Ergebnis | Zugang nötig | Aufwand |
|---|---|---|---|
| **A: Google-Slides-Vorlage + Replace Text** | Google-Präsentation, Export als PDF oder PowerPoint | Google-Credentials für Drive und Slides | gering |
| **B: HTML-Handout** | HTML-Datei, im Browser als PDF drucken | keiner | gering |
| **C: eigener python-pptx-Dienst im `backend-example`** | echte .pptx aus eigener PowerPoint-Vorlage | keiner bei Google oder Microsoft, aber der Dienst muss für n8n erreichbar sein | mittel bis hoch |

Empfehlung im Bootcamp: mit **B** starten (sofort sichtbar), **A** anschließen, sobald ein Google-Zugang da ist. **C** nur, wenn PowerPoint zwingend ist und jemand den Dienst betreiben kann.

## Weg A: Knotenkette

1. Auslöser: `n8n-nodes-base.manualTrigger` (1), `n8n-nodes-base.scheduleTrigger` oder `n8n-nodes-base.formTrigger`
2. `n8n-nodes-base.set` (3.4) „Einstellungen“: `vorlage_id`, `google_aktiv`
3. Daten holen (Data Table, Datei-Auswertung aus Skill `daten-visualisieren`); im Beispiel ein Set mit erfundenen Kennzahlen
4. `n8n-nodes-base.set` „Platzhalter-Werte berechnen“ (`includeOtherFields: true`): **rechnen und formatieren**, zum Beispiel Veränderung in Prozent mit Vorzeichen, Klickrate, `toLocaleString('de-DE')`, Datum `$now.setZone('Europe/Vienna').toFormat('dd.MM.yyyy')`. Division durch 0 abfangen: Ist der Vorjahreswert 0 oder leer, setzt das Beispiel „kein Vorjahreswert“ statt einer Prozentzahl ein.
5. `n8n-nodes-base.if` (2.3): `google_aktiv`
6. `n8n-nodes-base.googleDrive` (3): `resource: file`, `operation: copy`, `fileId` (`mode: id`), `name`, `sameFolder: true`
7. `n8n-nodes-base.googleSlides` (2): `resource: presentation`, `operation: replaceText`, `presentationId: {{ $json.id }}`, `textUi.textValues[]` mit `text` (Platzhalter), `replaceText` (Wert), `matchCase: true`, optional `pageObjectIds`
8. `n8n-nodes-base.set` „Ersetzungen prüfen“ (`executeOnce: true`): Liste `fehlende_platzhalter` aus allen Ersetzungen ohne Treffer. Danach `n8n-nodes-base.if` „Alle Platzhalter gefunden?“ (Array leer). Nein: `n8n-nodes-base.set` „Warnung: Platzhalter fehlt“ mit der Liste und dem Link zur Kopie, kein PDF.
9. `n8n-nodes-base.googleDrive` (3): `operation: download`, `options.googleFileConversion.conversion.slidesToFormat` = `application/pdf` oder `application/vnd.openxmlformats-officedocument.presentationml.presentation`, `options.binaryPropertyName: pdf`
10. Weitergabe: Ablage im Drive-Ordner, Download in einer Formular-Endseite (`n8n-nodes-base.form`, `respondWith: returnBinary`) oder Mail (Freigabe nötig)

Weitere Operationen: `googleSlides` `presentation` `create`, `get`, `getSlides` und `page` `getThumbnail` (Vorschaubild einer Folie, mit `download: true` als Binärdatei).

**Platzhalter-Konvention:** `[[TITEL]]`, `[[NAECHTIGUNGEN]]`, `[[STAND]]` usw. Großbuchstaben, ohne Umlaute und Leerzeichen. Keine `{{ }}` verwenden, das kollidiert mit n8n-Ausdrücken.

**Vorlage vorbereiten:** In Google Slides gestalten, Platzhalter exakt wie im Knoten schreiben (`matchCase: true`), Schrift und Größe am ganzen Platzhalter einheitlich setzen. Die ID steht in der Adresse `https://docs.google.com/presentation/d/ID/edit`.

**Kontrolle:** Die Slides-API meldet pro Ersetzung unter `replaceAllText` die Zahl `occurrencesChanged`. Fehlt der Wert oder ist er 0, steht der Platzhalter nicht (oder anders geschrieben) in der Vorlage. Das Beispiel prüft das im Knoten „Ersetzungen prüfen“ und hält den Lauf mit einer Warnung an. Beim ersten Lauf trotzdem den Output des Slides-Knotens ansehen: Sehen die Antworten anders aus als erwartet, meldet die Prüfung alle Platzhalter als fehlend, dann den Ausdruck anpassen.

**Diagramme in Folien** (fortgeschritten): Replace Text ersetzt nur Text. Bilder gehen über die Slides-API-Anfrage `replaceAllShapesWithImage` per `n8n-nodes-base.httpRequest` mit Google-Credential; das Bild muss dafür über eine öffentlich erreichbare Adresse abrufbar sein. Einfacher: Diagramm als eigene Datei mitschicken.

## Weg B: HTML-Handout

1. Werte wie in Weg A berechnen
2. `n8n-nodes-base.set` mit einem Feld `html` (Ausdruck, beginnt mit `=`), schlichtes Layout, `@media print` für den Druck
3. `n8n-nodes-base.convertToFile` (1.1): `operation: toText`, `sourceProperty: html`, `binaryPropertyName: handout`, `options.fileName: handout.html`
4. Datei im Knoten unter Binary herunterladen, im Browser öffnen, als PDF drucken. Alternativ direkt anzeigen mit `n8n-nodes-base.form`, `operation: completion`, `respondWith: showText`.

Texte, die von außen oder aus einem Sprachmodell kommen, vor dem Einsetzen in HTML maskieren (`&`, `<`, `>`). Das Beispiel macht das im Knoten „Handout als HTML“ für Titel, Region, Kernaussage und Quelle: `{{ String($json.p_region ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') }}`.

## Weg C: eigener python-pptx-Dienst

Für echte PowerPoint-Dateien aus einer **eigenen** Vorlage. Baut auf dem FastAPI-Beispiel im Ordner `backend-example/` auf (siehe dessen README). `python-pptx` in `requirements.txt` ergänzen, Vorlage als `app/vorlagen/bericht.pptx` mit Platzhaltern wie `[[TITEL]]` ablegen. Sie muss **innerhalb von `app/`** liegen: Das Dockerfile des Beispiels kopiert nur diesen Ordner ins Image (`COPY app ./app`). Eine Vorlage außerhalb fehlt im Container, und der Endpunkt antwortet mit Fehler 500.

Skizze eines Endpunkts (eigener Code, keine Übernahme aus fremden Skills). Den Code in `app/main.py` **zum bestehenden `app`** ergänzen: Dort gibt es schon `app = FastAPI(...)` mit `/health`, kein zweites anlegen.

```python
import hmac
import os
from io import BytesIO
from pathlib import Path

from fastapi import Header, HTTPException
from fastapi.responses import StreamingResponse
from pptx import Presentation
from pydantic import BaseModel

# `app` ist weiter oben in app/main.py schon angelegt.
VORLAGEN_ORDNER = Path(__file__).parent / "vorlagen"  # app/vorlagen, unabhängig vom Arbeitsverzeichnis
VORLAGEN = {"bericht": VORLAGEN_ORDNER / "bericht.pptx"}  # nur feste Vorlagen, keine Pfade aus der Anfrage


class FolienAuftrag(BaseModel):
    vorlage: str
    platzhalter: dict[str, str]  # z. B. {"[[TITEL]]": "Saisonbericht Sommer 2026"}


def schluessel_pruefen(x_api_key: str) -> None:
    erwartet = os.environ.get("FOLIEN_API_KEY", "")
    # zeitkonstanter Vergleich; ohne gesetzten Schlüssel ist der Endpunkt gesperrt
    if not erwartet or not hmac.compare_digest(x_api_key.encode(), erwartet.encode()):
        raise HTTPException(status_code=401, detail="Nicht berechtigt")


@app.post("/folien")
def folien(auftrag: FolienAuftrag, x_api_key: str = Header(default="")):
    schluessel_pruefen(x_api_key)  # Header X-API-Key
    if auftrag.vorlage not in VORLAGEN:
        raise HTTPException(status_code=400, detail="Unbekannte Vorlage")
    prs = Presentation(str(VORLAGEN[auftrag.vorlage]))
    for slide in prs.slides:
        for shape in slide.shapes:
            if not shape.has_text_frame:
                continue
            for paragraph in shape.text_frame.paragraphs:
                for run in paragraph.runs:
                    for platzhalter, wert in auftrag.platzhalter.items():
                        if platzhalter in run.text:
                            run.text = run.text.replace(platzhalter, wert)
    puffer = BytesIO()
    prs.save(puffer)
    puffer.seek(0)
    return StreamingResponse(
        puffer,
        media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation",
        headers={"Content-Disposition": 'attachment; filename="bericht.pptx"'},
    )
```

In n8n: `n8n-nodes-base.httpRequest` (4.4), `method: POST`, JSON-Body mit `vorlage` und `platzhalter`, `options.response.response.responseFormat: file`. Den geheimen Header in n8n als Header-Auth-Credential anlegen (Name `X-API-Key`, Wert wie `FOLIEN_API_KEY` am Dienst). Den Schlüssel als Umgebungsvariable am Container setzen, nie ins Repository oder Image.

Grenzen und Fallen von Weg C:
- **Erreichbarkeit:** Die zentrale Bootcamp-n8n (https://n8n-oew.buildbar.at) erreicht nichts auf deinem Laptop, und in claude.ai/code gibt es kein localhost. Der Dienst braucht eine öffentliche HTTPS-Adresse oder n8n und Dienst laufen beide lokal (Desktop-Variante). Der Bootcamp-Deploy veröffentlicht nur die Web-App (Ordner mit `package.json`), für diesen Dienst brauchst du einen eigenen Server (siehe `backend-example/README.md`).
- **Platzhalter über mehrere Runs:** PowerPoint zerlegt Text intern in Abschnitte (Runs), etwa nach Formatwechsel oder Autokorrektur. Dann findet der Code den Platzhalter nicht. Platzhalter in einem Zug tippen, einheitlich formatieren, Ergebnis prüfen.
- Tabellen (`shape.has_table`) und gruppierte Formen brauchen eigene Schleifen. Native Diagramme kann python-pptx selbst erzeugen (`CategoryChartData` aus `pptx.chart.data`, dann `shapes.add_chart`), das ist ein eigener Ausbauschritt.
- Datei im Speicher erzeugen (`BytesIO`), nichts auf der Platte liegen lassen.

## Freigabe-Hinweise

Details im Skill **`m365-google-freigaben`**. Kurz:
- **Google auf selbst gehosteter n8n** braucht eine eigene OAuth-App. Im Status „Testing“ laufen Refresh-Tokens nach 7 Tagen ab.
- Für Weg A braucht es Zugriff auf Google Drive (Kopieren, Herunterladen) und Google Slides (Ersetzen).
- Auf der gemeinsamen Bootcamp-n8n sehen alle Teilnehmenden alle Credentials. Dort nur ein Test-Google-Konto mit einer Test-Vorlage verbinden, nie das Arbeitskonto mit vollem Drive.
- Microsoft 365: Es gibt keinen PowerPoint-Knoten. Wer fertige Dateien in OneDrive oder SharePoint ablegen oder per Outlook verschicken will, klärt den Zugang über den Freigabe-Skill.

## Testdaten

Im Beispiel (erfunden): „Saisonbericht Sommer 2026“, Beispielregion Bergsee, 412.300 Nächtigungen, Vorjahr 398.750, 18.420 Kampagnen-Klicks bei 612.000 Impressionen.

| Szenario | Änderung | Erwartung |
|---|---|---|
| Normalfall | wie im Beispiel | `p_naechtigungen` 412.300, `p_veraenderung` +3,4 %, `p_klickrate` 3,01 %, Kernaussage „Mehr Nächtigungen als im Vorjahr.“ |
| Rückgang | Vorjahr 430.000 | `p_veraenderung` `-4,1 %`, Kernaussage „Weniger Nächtigungen als im Vorjahr.“ |
| Kein Vorjahr | Vorjahr 0 | `p_veraenderung` „kein Vorjahreswert“, Kernaussage „Kein Vorjahresvergleich möglich.“ (keine Division durch 0) |
| Platzhalter fehlt | `[[KLICKRATE]]` aus der Vorlage löschen (nur mit Google) | „Ersetzungen prüfen“ listet `[[KLICKRATE]]` in `fehlende_platzhalter`, der Lauf endet in „Warnung: Platzhalter fehlt“, es wird kein PDF geladen |
| Langer Text | Kernaussage mit 300 Zeichen | läuft aus dem Textfeld. Im Beispiel noch nicht abgesichert (Ausbauaufgabe): Längengrenze festlegen und prüfen |
| Sonderzeichen | Region „Berg & See“ | im Quelltext des HTML-Handouts steht `Berg &amp; See`, im Browser „Berg & See“ |

## Qualitätsregeln

- **Zahlen in Knoten rechnen und formatieren**, in die Folie kommt nur fertiger Text. Kein Sprachmodell rechnet Veränderungen oder Quoten.
- **Sprachmodell nur formulieren lassen:** höchstens eine kurze Kernaussage aus den fertigen Werten, danach prüfen, ob jede Zahl im Satz in den Kennzahlen vorkommt.
- **Jede Zahl mit Quelle:** Jede Folie oder Seite mit Zahlen trägt `[[QUELLE]]` und `[[STAND]]`.
- **Vorlage nie überschreiben:** immer erst kopieren, dann ersetzen.
- Einheitliches Zahlenformat (Tausenderpunkt, Prozent mit einer Nachkommastelle, Vorzeichen bei Veränderungen).
- Ergebnis ist ein **Entwurf**. Ein Mensch schaut drüber, bevor es an Gremien oder Partner geht.

## Datenschutz

- Kopien landen im Google Drive des verbundenen Kontos. Vorher prüfen, wer im Zielordner Zugriff hat.
- Keine personenbezogenen Daten (Gästenamen, Einzelbuchungen, Kontaktdaten) in Präsentationen, die per Link geteilt werden.
- Externe Folien- oder KI-Dienste bedeuten Datenweitergabe: nur nach Rücksprache und nur mit aggregierten Zahlen.
- Beim eigenen Dienst (Weg C) keine Dateien speichern, keine Inhalte ins Log schreiben, Zugriff nur mit geheimem Header.
