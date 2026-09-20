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

### ⚠️ Zwei stille Zeilendeckel (gemessen am 19.09.2026)

Beide melden **keinen Fehler**. Der Workflow läuft grün durch und verarbeitet trotzdem nur einen
Bruchteil der Daten.

| Wo | Was passiert |
|---|---|
| **Data-Table-Node** | Liefert bei `limit: 2000` genau **50 Zeilen**. Sie fällt still auf ihren Default zurück. |
| **n8n-API** | Nimmt höchstens `limit=200`. Bei 500 antwortet sie mit **0 Zeilen**, ohne Fehler und ohne Cursor. |

**Immer die Zeilenzahl gegen die Tabelle prüfen.** Wenn die Tabelle 1631 Zeilen hat und der Node
50 liefert, ist das kein Zufall.

**Ab etwa 50 Zeilen: über die API blättern.** Ein HTTP-Request-Node mit Cursor-Paginierung holt
alles. Dafür brauchst du in n8n eine Credential vom Typ `httpHeaderAuth` mit dem Namen
`X-N8N-API-KEY` und dem n8n-API-Key als Wert. Den API-Key findest du im
[Zugangsbereich](https://buildbar.at/oew#zugang).

```
URL    http://127.0.0.1:5678/api/v1/data-tables/<TABELLEN-ID>/rows
Query  limit = 200
Options -> Pagination
  Pagination Mode        Update a Parameter in Each Request
  Parameter (Query)      cursor = {{ $response.body.nextCursor }}
  Pagination Complete    Other
  Complete Expression    {{ !$response.body.nextCursor }}
  Max Pages              30
```

Die Adresse `http://127.0.0.1:5678` spricht n8n von innen an, der Knoten läuft ja in der n8n
selbst. Bei einer eigenen n8n mit anderem Port stattdessen deren Adresse eintragen.

Danach im Code-Node alle Seiten zusammenführen und **prüfen, ob genug angekommen ist**:

```javascript
const alle = [];
for (const it of $input.all()) for (const z of (it.json.data || [])) alle.push(z);
if (alle.length < 100) {
  throw new Error('Nur ' + alle.length + ' Zeilen geladen. Vermutlich greift ein stiller Deckel.');
}
```

Fertiger Beispiel-Workflow zum Importieren: `examples/workflows/datatable-alle-zeilen.json`.

→ **Für die allermeisten n8n-Vorhaben ist das der richtige, niederschwelligste Weg.**

## 2. NocoDB: sichtbare Tabelle mit Oberfläche

Wenn Daten in einer **Airtable-artigen Oberfläche** sichtbar sein oder von **Nicht-Techniker:innen** gepflegt werden sollen: **`https://nocodb.buildbar.at`**.

- **Self-Service:** Account anlegen → **Account → Tokens → Add New Token** → eigenes API-Token.
- Claude bindet das Token in **deiner n8n** als **NocoDB-Credential** ein → der **NocoDB-Node** steht in den Workflows bereit.
- Gemeinsame Instanz: **eigene Base mit eigenem Namen**, **keine echten personenbezogenen Daten**.
- Den API-Token nie ins Repo oder in ein Frontend schreiben.

## 3. ÖW-Supabase: echte Datenbank für veröffentlichte Apps

Wenn eine **veröffentlichte App** (`https://app-xxxx.buildbar.at`) und/oder **mehrere Dienste** eine **gemeinsame** Postgres-Datenbank brauchen, oder du **Login/Auth**, **Datei-Storage** bzw. **Vektorsuche (pgvector, z. B. KI-Gedächtnis)** willst.

> ⚠️ **Vektorsuche: technisch da, aber im Bootcamp nicht bedienbar.**
> Die ÖW-Supabase hat seit dem 20.09.2026 **pgvector 0.8.0**, eine Tabelle `documents`
> (Spalte `embedding` vom Typ `vector(1536)`) und die Funktion
> `match_documents(query_embedding, match_count, filter)`.
> **Aber:** Um Text in Vektoren zu verwandeln, braucht man einen Embedding-Dienst — und der
> einzige KI-Zugang im Bootcamp ist **Anthropic**, und Anthropic bietet keine Embeddings an.
> Es gibt auf der Instanz kein Credential für OpenAI, Cohere, Mistral oder Google.
> **RAG ist deshalb kein Bootcamp-Use-Case**, solange kein vierter Zugang dazukommt.
>
> **Was stattdessen funktioniert und für deutschsprachige Texte oft besser ist:**
> Postgres kann **deutsche Volltextsuche**, ohne jeden fremden Dienst. Am 20.09. auf der
> ÖW-Supabase geprüft:
> ```sql
> -- Spalte anlegen und füllen
> ALTER TABLE deine_tabelle ADD COLUMN suche tsvector
>   GENERATED ALWAYS AS (to_tsvector('german', coalesce(titel,'') || ' ' || coalesce(text,''))) STORED;
> CREATE INDEX ON deine_tabelle USING gin(suche);
> -- Suchen, mit Stammformen: „Hütten“ findet „Hütte“
> SELECT titel FROM deine_tabelle WHERE suche @@ websearch_to_tsquery('german', 'Almhütte Winter');
> ```
> Das versteht Beugung und Komposita, braucht keinen Schlüssel, kostet nichts und ist in
> fünf Minuten eingerichtet.


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
