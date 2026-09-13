---
name: n8n-security-audit
description: Security-Checkliste vor Workflow-Aktivierung und erweiterter Security Audit für kritische Workflows. Verwenden vor Aktivierung oder bei Security-Review.
---

# Security-Checkliste (vor Aktivierung)

**Vor jeder Workflow-Aktivierung diese Punkte prüfen:**

## Secrets & Credentials
- [ ] Keine hardcoded API Keys, Tokens oder Passwörter in Node-Parametern
- [ ] Alle Secrets über n8n Credentials eingebunden
- [ ] Keine Secrets in Code Node Variablen

## Webhooks & Endpoints
- [ ] Webhook-Authentifizierung aktiviert (Header Auth, Basic Auth oder None nur bei öffentlichen Endpoints)
- [ ] Respond to Webhook vorhanden (kein hängender Request)
- [ ] Webhook-Path nicht erratbar (kein `/test` oder `/webhook`), auf der zentralen Bootcamp-n8n mit eigenem Kürzel (z. B. `mk-anfragen`)

## Fehlerbehandlung
- [ ] Error-Handling für HTTP Request Nodes (Continue on Fail oder Error Workflow)
- [ ] Keine unbehandelten Branches (IF/Switch: alle Pfade haben ein Ziel)
- [ ] Bei kritischen Workflows: Error Workflow konfiguriert

## Daten & Privacy
- [ ] Keine personenbezogenen Daten in Workflow-Notes oder Node-Namen
- [ ] Logging/Debug-Nodes vor Aktivierung entfernt oder deaktiviert
- [ ] Datenminimierung: nur nötige Felder weitergegeben

## Allgemein
- [ ] Workflow-Name aussagekräftig und eindeutig
- [ ] Validierung durchgelaufen (`n8n_validate_workflow`)
- [ ] Testdaten-Szenarien durchgelaufen (siehe Skill n8n-testdaten)

---

# Security Audit (bei kritischen Workflows)

Für Workflows die sensible Daten verarbeiten oder produktionskritisch sind, zusätzlich prüfen:

## Secrets-Scan
Im Workflow-JSON nach verdächtigen Mustern suchen:
- API Keys (`sk-`, `xoxb-`, `Bearer`, `token=`)
- Passwörter in Klartext
- Base64-encodierte Credentials
- Hardcoded URLs mit Credentials in Query-Parametern

## Webhook-Security
- Keine `authentication: "none"` bei Webhooks die Daten modifizieren
- Response-Codes korrekt (nicht immer 200)
- Rate-Limiting Überlegungen dokumentiert

## Code Node Audit
- Kein `eval()` oder `Function()` mit dynamischen Inputs
- Keine unvalidierte String-Interpolation in HTTP URLs
- `helpers.httpRequest()` statt `fetch()` in MCP-Kontext

## Infrastruktur
- Error Workflow für Production-Workflows konfiguriert
- Execution-Timeout gesetzt bei lang laufenden Workflows
- Retry-Logik bei externen API-Calls

## Instanz-Audit mit n8n-mcp
Das n8n-mcp-Werkzeug `n8n_audit_instance` erstellt einen Security-Report über die ganze n8n (n8n-Audit plus Scan aller Workflows nach Secrets, ungeschützten Webhooks und fehlender Fehlerbehandlung):
```
n8n_audit_instance({})                                                         // vollständiger Report
n8n_audit_instance({categories: ["credentials", "nodes"], includeCustomScan: true})  // nur bestimmte Kategorien
// Kategorien: credentials | database | nodes | filesystem | instance
```
⚠️ Auf der **zentralen Bootcamp-n8n** prüft der Report die Workflows und Credentials **aller** Teilnehmenden. Dort nur nach Rücksprache mit dem Trainer nutzen und keine Befunde zu fremden Workflows weitergeben. Für den eigenen Workflow reicht die Checkliste oben.
