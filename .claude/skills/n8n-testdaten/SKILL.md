---
name: n8n-testdaten
description: Testdaten-Generierung für n8n Workflows. Format, Szenarien-Typen, Testaufrufe mit n8n_test_workflow und Testablauf. Verwenden nach Workflow-Erstellung oder vor Aktivierung.
---

# Testdaten-Generierung (nach Workflow-Erstellung)

Nach Erstellung oder signifikanter Änderung eines Workflows **IMMER** Testdaten generieren und testen.

## Ablauf
1. **Testszenarien definieren**: Pro Workflow 3-5 Szenarien:
   - Happy Path (Normalfall)
   - Edge Case (Grenzwerte, leere Felder, Sonderzeichen)
   - Error Case (ungültige Daten, fehlende Pflichtfelder)
   - Bei Webhook-Workflows: verschiedene Payload-Strukturen

2. **Webhook-, Formular- und Chat-Workflows testen** (der Normalfall): Der Workflow wird über seinen Trigger per HTTP ausgelöst, je Szenario ein Aufruf mit den Testdaten.
```
n8n_test_workflow({workflowId: "...", data: {"email": "test@example.com", "name": "Max Mustermann"}})
```
   Chat-Trigger: statt `data` die Nachricht mitgeben.
```
n8n_test_workflow({workflowId: "...", message: "Welche Öffnungszeiten hat das Museum am Sonntag?"})
```
   Hinweise:
   - `data` ist der Body des Aufrufs (beim Formular die Formularfelder). Im Workflow liegt er beim Webhook unter `$json.body` (siehe CLAUDE.md).
   - Der Aufruf per HTTP funktioniert nur, wenn der Workflow **aktiv** ist. Für den Test vorher aktivieren (kurz die Security-Checkliste prüfen, vor allem Webhook-Absicherung und Kürzel im Webhook-Pfad) und bei Bedarf danach wieder deaktivieren.

3. **Andere Trigger** (Zeitplan, manueller Start, E-Mail, Kalender …): Diese Workflows lassen sich nicht per HTTP auslösen. Zuerst mit `method: "prepare"` abfragen, welche Nodes Testdaten brauchen, danach mit `method: "pinned"` und `pinData` ausführen.
```
n8n_test_workflow({workflowId: "...", method: "prepare"})
n8n_test_workflow({workflowId: "...", method: "pinned", pinData: {"Zeitplan": [{"json": {"monat": "2026-08"}}]}})
```
   ⚠️ Diese beiden Methoden laufen über den MCP-Server der n8n selbst und brauchen dort die Workflow-Einstellung „Available in MCP" (plus Zugriffstoken). `exposeToMcp: true` schaltet die Einstellung dauerhaft ein, daher nur nach Rückfrage bei der Person. Je nach Instanz, auch über den Hub, ist das **nicht verfügbar**. `pinned` ersetzt nur Trigger, Nodes mit Credentials und HTTP-Requests durch die Testdaten, alle anderen Nodes laufen echt. Dann den Workflow für den Test vorübergehend mit einem Webhook- oder Formular-Trigger starten lassen (danach wieder entfernen) oder die Person bitten, ihn in n8n einmal manuell mit Beispieldaten auszuführen.

4. **Ergebnisse prüfen**: Execution abrufen und Output validieren:
```
n8n_executions({action: "get", id: "execution-id"})
```

## Testdaten-Format
```json
{
  "testScenarios": [
    {
      "name": "Happy Path: Vollständige Daten",
      "description": "Alle Pflichtfelder gefüllt, gültige Werte",
      "data": {"email": "test@example.com", "name": "Max Mustermann"},
      "expectedResult": "success",
      "expectedOutput": "Email versendet / Datensatz erstellt / etc."
    },
    {
      "name": "Edge Case: Leere Felder",
      "data": {"email": "", "name": ""},
      "expectedResult": "error_handled",
      "expectedOutput": "Validierungsfehler abgefangen"
    }
  ]
}
```
Bei anderen Triggern (Schritt 3) statt `data` ein `pinData`-Objekt je Szenario, z. B. `{"Zeitplan": [{"json": {"monat": "2026-08"}}]}` (jedes Item als `{"json": {...}}`).

## Wann testen?
- Nach `n8n_create_workflow`: immer
- Nach signifikanten `n8n_update_partial_workflow` Änderungen (neue Nodes, geänderte Logik)
- Vor Aktivierung eines Workflows: PFLICHT
- NICHT nach kosmetischen Änderungen (Position, Rename)
