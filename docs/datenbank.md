# 🗄️ Brauche ich eine Datenbank? Niederschwellig zuerst

Kurz: **Meistens brauchst du keine externe Datenbank.** Wähle danach, *wo die Daten leben*:

| Fall | Lösung | Setup-Aufwand |
|------|--------|---------------|
| Daten gehören zu einem **n8n-Workflow** | **n8n Data Tables** | ⭐ null (eingebaut) |
| **Sichtbare Tabelle**, Nicht-Techniker:innen pflegen Daten | **NocoDB** (`nocodb.buildbar.at`, Self-Service) | gering (Account + Token) |
| **Veröffentlichte App, Login, Dateien, Vektoren** | **ÖW-Supabase** (Keys im Zugangsbereich) | gering (Keys eintragen) |
| **Lokaler Prototyp / ein Backend-Prozess mit Volume** | **SQLite** | null (Datei) |

Zugangsdaten für die gemeinsamen Bausteine stehen im Bootcamp-Zugangsbereich: **[buildbar.at/oew#zugang](https://buildbar.at/oew#zugang)**.

---

## 1. n8n Data Tables: Standard für Workflows (null Setup)

In n8n **eingebaut**, in jeder n8n verfügbar (zentrale Bootcamp-n8n oder eigene). Keine Anmeldung, kein Connection-String, kein eigener Server.

- Tabellen mit Spalten anlegen, aus Workflows **lesen, schreiben, aktualisieren, löschen** (Node **„Data Table"**) oder von Claude per MCP (`n8n_manage_datatable`).
- Auf n8n Cloud gilt ein **Gesamtlimit von 50 MB** (alle Tabellen zusammen); für Bootcamp-Mengen reichlich.
- Ideal für: Nachschlagelisten, Status merken, kleine Listen, Duplikate erkennen, Zwischenspeicher.
- **Zentrale Bootcamp-n8n:** Alle sehen alle Tabellen. Gib deinen Tabellen ein **eigenes Kürzel** (z. B. `mk_anfragen`) und speichere nur Test- oder Beispieldaten.
- Sag zu Claude: *„Leg eine Data Table `mk_anfragen` mit den Spalten name, email, status an und schreib im Workflow neue Einträge hinein."*
- Winziger Zustand ohne Tabelle: n8n **workflow static data** (Schlüssel-Werte).

→ **Für die allermeisten n8n-Vorhaben ist das der richtige, niederschwelligste Weg.**

## 2. NocoDB: sichtbare Tabelle mit Oberfläche

Wenn Daten in einer **Airtable-artigen Oberfläche** sichtbar sein oder von **Nicht-Techniker:innen** gepflegt werden sollen: **`https://nocodb.buildbar.at`**.

- **Self-Service:** Account anlegen → **Account → Tokens → Add New Token** → eigenes API-Token.
- Claude bindet das Token in **deiner n8n** als **NocoDB-Credential** ein → der **NocoDB-Node** steht in den Workflows bereit.
- Gemeinsame Instanz: **eigene Base mit eigenem Namen**, **keine echten personenbezogenen Daten**.
- Den API-Token nie ins Repo oder in ein Frontend schreiben.

## 3. ÖW-Supabase: echte Datenbank für veröffentlichte Apps

Wenn eine **veröffentlichte App** (`https://app-xxxx.buildbar.at`) und/oder **mehrere Dienste** eine **gemeinsame** Postgres-Datenbank brauchen, oder du **Login/Auth**, **Datei-Storage** bzw. **Vektorsuche (pgvector, z. B. KI-Gedächtnis)** willst.

- **Zugangsdaten** im Zugangsbereich: **Project-URL**, **anon-Key** und **service_role-Key**.
- **anon-Key** + Project-URL dürfen ins **Frontend** (`@supabase/supabase-js` mit `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
- ⚠️ **Row Level Security (RLS):** Aus dem Frontend nur Tabellen mit aktivierter Row Level Security (RLS) und passenden Policies ansprechen. Ohne RLS die Daten nur über n8n lesen und schreiben (Supabase-Node mit service_role). Sonst kann jede Person, die die App-Adresse kennt, mit dem anon-Key alle Tabellen (und Storage-Buckets ohne Policy) aller Teilnehmenden lesen und beschreiben. Das eigene Präfix schützt davor nicht.
- **service_role-Key nur serverseitig in n8n** (Node **„Supabase"**, Credential mit Host = Project-URL und Service Role Secret). **Nie** ins Frontend, **nie** ins Repo, nie in die Env-Liste einer öffentlichen App.
- **FastAPI:** `psycopg` mit einem Connection-String aus der Env (siehe auskommentiertes Beispiel in `../backend-example/app/main.py`), nur mit eigener Postgres-Datenbank. Für die ÖW-Supabase gibt es im Bootcamp keinen DB-Connection-String.
- Tabellen mit **eigenem Präfix** anlegen: Alle nutzen dieselben Keys, fremde Tabellen sind sichtbar, **keine echten personenbezogenen Daten**.
- Beim Veröffentlichen gibt Claude URL und anon-Key über den Deploy-Aufruf mit.

## 4. SQLite: nur lokal oder in einem einzelnen Prozess

Null Setup, eine Datei. Gut für **lokale Prototypen** oder ein **Backend, das als ein dauerhafter Prozess mit Volume** läuft (z. B. `backend-example` als Docker-Container mit gemountetem Volume).

- ⚠️ **Funktioniert NICHT für eine über buildbar veröffentlichte App:** Dort ist das Dateisystem flüchtig, die `.sqlite`-Datei überlebt ein erneutes Veröffentlichen nicht. Für ein veröffentlichtes Frontend ist SQLite daher die falsche Wahl → **Supabase**.

---

### Faustregel
**n8n-Workflow → Data Tables. Sichtbare Tabelle → NocoDB. Veröffentlichte App, Login, Vektoren → ÖW-Supabase. Nur lokal → SQLite.**
