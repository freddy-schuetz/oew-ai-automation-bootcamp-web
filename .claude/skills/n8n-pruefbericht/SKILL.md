---
name: n8n-pruefbericht
description: Deutschsprachiger Prüfbericht für fertige Workflows im AI Automation Bootcamp, mit Testergebnissen, Validierung und Security-Status. Verwenden, sobald ein Workflow fertig ist.
---

# Prüfbericht (nach Workflow-Abschluss)

Sobald ein Workflow fertig ist, **einen deutschsprachigen Prüfbericht erstellen** und im eigenen Repository ablegen. Der Bericht gehört zum Bootcamp-Ergebnis, auch wenn der Workflow (noch) an niemanden geliefert wird.

## Wann erstellen?
- Sobald ein Workflow fertig ist (CLAUDE.md, Schritt 11)
- Bei signifikanten Updates an einem bereits fertigen Workflow
- Auf Anfrage der Person

## Bericht-Template

```markdown
# Workflow-Prüfbericht

## Allgemeine Informationen
| Feld | Wert |
|------|------|
| Workflow-Name | [Name] |
| Workflow-ID | [ID] |
| Erstellt am | [Datum] |
| Geprüft am | [Datum] |
| Erstellt von | [Dein Name] |

## Beschreibung
[Was macht der Workflow? 2-3 Sätze zur Funktion]

## Architektur
[Kurze Beschreibung der Workflow-Struktur: Trigger → Verarbeitung → Output]
[Anzahl Nodes, verwendete Services/Integrationen]

## Testergebnisse

| Testszenario | Status | Ergebnis |
|-------------|--------|----------|
| Happy Path | PASS/FAIL | [Beschreibung] |
| Edge Case | PASS/FAIL | [Beschreibung] |
| Error Case | PASS/FAIL | [Beschreibung] |

## Validierung

| Prüfung | Status |
|---------|--------|
| Technische Validierung (n8n_validate_workflow) | PASS/FAIL |
| Auto-Fix angewendet | Ja/Nein |
| Expression-Syntax geprüft | PASS/FAIL |

## Security-Prüfung

| Prüfpunkt | Status |
|-----------|--------|
| Keine hardcoded Secrets | OK/WARNUNG |
| Webhook-Authentifizierung | OK/WARNUNG/N.A. |
| Fehlerbehandlung vorhanden | OK/WARNUNG |
| Datenminimierung | OK/WARNUNG |

## Empfehlungen
[Optionale Hinweise: Was sollte die Person bzw. Organisation beachten? Welche Credentials und Freigaben müssen eingerichtet werden?]

## Gesamtergebnis
**Status: FREIGEGEBEN / BEDINGT FREIGEGEBEN / NICHT FREIGEGEBEN**

---
*Erstellt im AI Automation Bootcamp · friedemann-schuetz.de*
```

> Den Footer **„Erstellt im AI Automation Bootcamp · friedemann-schuetz.de"** als kurze Attribution am Berichtsende beibehalten.

## Dateiname & Ablage
- Format: `Pruefbericht_[WorkflowName]_[YYYY-MM-DD].md`
- Ablage: im eigenen Repository (z.B. `reports/` oder `docs/`), damit der Bericht Teil des Bootcamp-Ergebnisses ist
- Keine Secrets und nicht den Token aus `.mcp.json` in den Bericht übernehmen
- Bei Bedarf als PDF konvertieren (pandoc/puppeteer)
