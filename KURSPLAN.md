# FlugBoard – React Kurs: Planungsdokument

Dieses Dokument ist die verbindliche Referenz für alle Lektionen des Kurses.
Es definiert Layout, Struktur, Designentscheidungen und den Lernpfad.

---

## 1. Kursziel

Schülerinnen und Schüler lernen moderne Web- und App-Entwicklung mit React,
Next.js und React Native anhand eines durchgehenden Praxisprojekts.

**Zielgruppe:** Personen mit Kenntnissen in HTML, CSS, JavaScript (ES6+),
TypeScript und HTTP-Methoden (GET, POST, PUT, PATCH, DELETE).

**Sprache:** Deutsch (Fachbegriffe und Code auf Englisch)

---

## 2. Begleitendes Projekt: FlugBoard

Eine Echtzeit-Fluganzeigetafel eines Flughafens (ähnlich einem Abflug-/
Ankunftsmonitor), die Lektion für Lektion ausgebaut wird.

### Datenmodell (TypeScript)

```typescript
type FlightType   = 'arrival' | 'departure';
type FlightStatus = 'on-time' | 'delayed' | 'boarding' | 'departed' | 'landed' | 'cancelled';

interface Flight {
  id:            number;
  flightNumber:  string;       // z.B. "OS123"
  airline:       string;       // z.B. "Austrian Airlines"
  type:          FlightType;
  scheduledTime: string;       // "HH:MM"
  expectedTime?: string;       // nur wenn verspätet
  status:        FlightStatus;
  airport:       string;       // Herkunft (arrival) oder Ziel (departure)
  terminal:      string;       // "T1", "T2", "T3"
  gate?:         string;       // z.B. "B12"
}
```

### Backend: Deno + Hono

Schlanker REST-Server (ab Lektion 2.2) unter `backend/`:

```
backend/
├── main.ts        ← Hono-Server, Port 8000
├── data.ts        ← Flug-Demodaten
└── deno.json      ← Deno-Konfiguration
```

Endpunkte:
- `GET  /api/flights`              → alle Flüge
- `GET  /api/flights/:id`          → einzelner Flug
- `GET  /api/flights?type=arrival` → gefiltert
- `POST /api/flights`              → neuen Flug anlegen (ab L05)

### Projektverlauf Lektion für Lektion

| Lektion | Was wird gebaut |
|---------|----------------|
| L01 | Statische JSX-Tabelle mit harkodierten Flügen |
| L02 | Komponenten & Props (einfacher Zwischenschritt) |
| L03 | Komponenten & Props (Vertiefung, bisheriger L02-Inhalt) |
| L04 | Flug anklicken → ausgewählt / Detail-Ansicht |
| L05 | Status-Badges, dynamische Liste aus Array |
| L06 | Suchfeld + Arrivals/Departures-Filter |
| L07 | Flüge vom Deno/Hono-Backend laden (useEffect + fetch) |
| L08 | Filter-State in Elternkomponente (Lifting State Up) |
| L09 | Dark/Light-Theme via Context API |
| L10 | `useFlights` Custom Hook, `useLocalStorage` |
| L11 | Komponententests mit Vitest + React Testing Library |
| L12 | Mehrere Seiten: `/arrivals`, `/departures`, `/flight/:id` |
| L13 | Persistente Flugdaten mit Drizzle + SQLite im Deno-Backend |
| L14 | FlugBoard als Next.js App (App Router) |
| L15 | Layouts, verschachteltes Routing |
| L16 | Server Components mit Daten aus der Datenbank |
| L17 | API Route `/api/flights` in Next.js mit DB-Zugriff |
| L18 | Playwright E2E für Kern-User-Flows |
| L19 | Deployment auf Vercel |
| L20 | React Native App mit Expo |
| L21 | Native `FlightCard`, `FlatList`, `StyleSheet` |
| L22 | Tab-Navigation: Arrivals / Departures Tabs |

---

## 3. Kursstruktur (24 Lektionen)

### Teil 1 — React Einführung (1.1–1.6)

| Code | Datei | Titel | Kernkonzepte |
|---|---|---|---|
| 1.1 | `1.1-einfuehrung-spa.html` | Motivation & SPA | SPA vs. MPA, React-Idee, Kurskontext |
| 1.2 | `1.2-einfuehrung.html` | Einführung & Umgebung | React, JSX, Vite, TypeScript |
| 1.3 | `1.3-komponenten-props-einfach.html` | Komponenten & Props (einfach) | Einfache Funktionskomponenten, Props-Basics |
| 1.4 | `1.4-komponenten-props-vertiefung.html` | Komponenten & Props (Vertiefung) | Interfaces, Komposition, Children, Default Props |
| 1.5 | `1.5-state-events.html` | State & Events | useState, Event-Handler, Immutability |
| 1.6 | `1.6-listen-conditional.html` | Listen & Conditional Rendering | map, keys, ternary, Status-Badges |

### Teil 2 — React Praxis (2.1–2.9)

| Code | Datei | Titel | Kernkonzepte |
|---|---|---|---|
| 2.1 | `2.1-formulare.html` | Formulare & Inputs | Controlled Components, onChange, onSubmit |
| 2.2 | `2.2-useeffect-api.html` | useEffect & API | useEffect, fetch, Deno/Hono Backend |
| 2.3 | `2.3-kommunikation.html` | Komponentenkommunikation | Lifting State, Callback Props |
| 2.4 | `2.4-context.html` | Context API | createContext, useContext, Provider |
| 2.5 | `2.5-custom-hooks.html` | Custom Hooks | Eigene Hooks, Wiederverwendbarkeit |
| 2.6 | `2.6-testen-vitest-rtl.html` | Testen mit Vitest + RTL | Komponententests, user-event, jest-dom, kurze Integrationssicht |
| 2.7 | `2.7-react-router.html` | React Router | BrowserRouter, Route, useParams |
| 2.8 | `2.8-datenbank-drizzle-sqlite.html` | Datenbankzugriff mit Drizzle + SQLite | Persistenz, SQL, Drizzle ORM, Deno |
| 2.9 | `2.9-redux-state-management.html` | State Management mit Redux (Überblick) | Globaler State, Store, Actions, Reducer, Selectors |

### Teil 3 — Next.js (3.1–3.6)

| Code | Datei | Titel | Kernkonzepte |
|---|---|---|---|
| 3.1 | `3.1-nextjs-einfuehrung.html` | Einführung Next.js | SSR/CSR/SSG, App Router |
| 3.2 | `3.2-nextjs-routing.html` | Routing & Layouts | layout.tsx, page.tsx, loading.tsx |
| 3.3 | `3.3-server-client.html` | Server & Client Components | "use client", Datenabruf |
| 3.4 | `3.4-api-routes.html` | API Routes & Datenabruf | Route Handlers, fetch |
| 3.5 | `3.5-playwright-e2e.html` | Playwright E2E | End-to-End-Tests, Locators, Reports, CI |
| 3.6 | `3.6-deployment.html` | Deployment | Vercel, .env, CI/CD |

### Teil 4 — React Native (4.1–4.3)

| Code | Datei | Titel | Kernkonzepte |
|---|---|---|---|
| 4.1 | `4.1-rn-einfuehrung.html` | Einführung React Native | Expo, native Konzepte |
| 4.2 | `4.2-rn-komponenten.html` | Native Komponenten & Styling | View, Text, FlatList, StyleSheet |
| 4.3 | `4.3-rn-navigation.html` | Navigation & State | React Navigation, Tabs, Stack |

---

## 4. Dateistruktur

```
react/                          ← Kurs-Root (GitHub Pages Quelle)
├── index.html                  ← Kursübersicht / Startseite
├── KURSPLAN.md                 ← dieses Dokument
├── assets/
│   └── kurs.css                ← einheitliches Stylesheet
├── backend/
│   ├── main.ts                 ← Deno + Hono Server
│   ├── data.ts                 ← Demodaten
│   └── deno.json               ← Deno-Konfiguration
├── 1.2-einfuehrung.html
├── 1.3-komponenten-props-einfach.html
├── 1.4-komponenten-props-vertiefung.html
├── 1.5-state-events.html
├── 1.6-listen-conditional.html
├── 2.1-formulare.html
├── 2.2-useeffect-api.html
├── 2.3-kommunikation.html
├── 2.4-context.html
├── 2.5-custom-hooks.html
├── 2.6-testen-vitest-rtl.html
├── 2.7-react-router.html
├── 2.8-datenbank-drizzle-sqlite.html
├── 2.9-redux-state-management.html
├── 3.1-nextjs-einfuehrung.html
├── 3.2-nextjs-routing.html
├── 3.3-server-client.html
├── 3.4-api-routes.html
├── 3.5-playwright-e2e.html
├── 3.6-deployment.html
├── 4.1-rn-einfuehrung.html
├── 4.2-rn-komponenten.html
└── 4.3-rn-navigation.html
```

---

## 5. HTML-Template-Struktur (jede Lektion)

Jede Lektion folgt **exakt** dieser Gliederung:

```
1. lesson-header       → Lektionsnummer, Titel, Tags (Teil/Dauer)
2. section-lernziele   → Lernziele als Liste
3. section (Theorie)   → Erklärungen, Code-Beispiele, Callouts
4. section-projekt     → Projektschritt mit .projekt-box
5. section-fehler      → Häufige Fehler mit .fehler-item
6. section-aufgaben    → 3 Pflicht + 1 Bonus-Aufgabe
7. lesson-nav          → Zurück / Weiter Navigation
```

---

## 6. CSS-Klassen-Referenz

### Layout
| Klasse | Zweck |
|--------|-------|
| `.sidebar` | Linke Navigation (fixed, 270px) |
| `.main-content` | Hauptbereich (margin-left: 270px) |
| `.content-area` | Inhaltsbreite begrenzen (max 900px) |
| `.lesson-header` | Kopfbereich der Lektion |

### Seitennavigation
| Klasse | Zweck |
|--------|-------|
| `.nav-group` | Gruppe von Links (React/Next/RN) |
| `.nav-group-label` | Gruppen-Überschrift |
| `.react-label` / `.next-label` / `.rn-label` | Farb-Varianten |
| `.nav-link` | Navigationseintrag |
| `.nav-link.active` | Aktuelle Seite |
| `.ln` | Lektionsnummer-Badge im Link |

### Inhalt
| Klasse | Zweck |
|--------|-------|
| `.section` | Inhaltsabschnitt |
| `.section-lernziele` | Lernziele (blauer Akzent) |
| `.section-projekt` | Projektschritt (grüner Akzent) |
| `.section-fehler` | Häufige Fehler (roter Akzent) |
| `.section-aufgaben` | Aufgaben (lila Akzent) |
| `.lernziele-list` | Liste der Lernziele |

### Callouts
| Klasse | Zweck |
|--------|-------|
| `.callout.callout-info` | Informationsbox (blau) |
| `.callout.callout-tip` | Tipp-Box (grün) |
| `.callout.callout-warning` | Warnungs-Box (gelb) |
| `.callout.callout-error` | Fehler-Box (rot) |

### Code
| Klasse | Zweck |
|--------|-------|
| `.code-block` | Wrapper für Code-Block |
| `.code-header` | Dateiname + Sprache |
| `.code-filename` | Dateiname (Monospace) |
| `.code-lang` | Sprach-Label |

### Projekt & Aufgaben
| Klasse | Zweck |
|--------|-------|
| `.projekt-box` | Grüner Projektschritt-Container |
| `.projekt-box-header` | Header des Projektschritts |
| `.projekt-step` | "Projektschritt L0X"-Badge |
| `.aufgabe` | Einzelne Aufgabe (lila) |
| `.aufgabe-bonus` | Bonus-Aufgabe (gold) |
| `.aufgabe-header` | Aufgaben-Header mit Nummer |
| `.aufgabe-num` | Aufgabennummer-Badge |
| `.aufgabe-title` | Aufgabentitel |
| `.fehler-item` | Fehlerbeschreibung (rot) |
| `.fehler-title` | Fehler-Titel |
| `.fehler-fix` | Lösung/Fix (grün) |

### Navigation
| Klasse | Zweck |
|--------|-------|
| `.lesson-nav` | Zurück/Weiter Leiste |
| `.nav-btn` | Navigations-Button |
| `.nav-btn.primary` | Hervorgehobener Button |

### Tags
| Klasse | Zweck |
|--------|-------|
| `.tag.tag-react` | React-Tag (cyan) |
| `.tag.tag-next` | Next.js-Tag (weiß) |
| `.tag.tag-rn` | React Native-Tag (lila) |
| `.tag.tag-time` | Dauer-Tag (grau) |

---

## 7. Design-Entscheidungen

- **Farbschema:** Dunkel (GitHub-ähnlich), professionell
- **Hintergrund:** `#0d1117`
- **Sidebar:** `#161b22`
- **Karten:** `#1c2128`
- **React-Akzent:** `#61dafb` (React Cyan)
- **Next.js-Akzent:** `#e2e8f0` (fast Weiß)
- **React Native-Akzent:** `#a78bfa` (Lila)
- **Code:** highlight.js `atom-one-dark` via CDN
- **Schrift:** System-Font-Stack
- **Responsive:** Hamburger-Menü unter 768px

---

## 8. GitHub Pages Setup

Der Kurs ist als statische HTML-Seiten konzipiert und kann direkt auf
GitHub Pages gehostet werden.

### Einrichten

1. Repository auf GitHub erstellen (oder vorhandenes verwenden)
2. In den Repository-Einstellungen:
   - Settings → Pages → Source: `Deploy from a branch`
   - Branch: `main` (oder `master`), Ordner: `/ (root)` oder den
     entsprechenden Unterordner
3. Wenn der Kurs in einem Unterordner liegt (z.B. `webprogrammierung/react/`):
   - Entweder GitHub Pages auf den Root-Ordner des Repos zeigen lassen
   - Oder Inhalt in den Ordner `docs/` im Root kopieren und Pages auf
     `docs/` zeigen lassen
4. Alle Links im Kurs sind **relativ**, funktionieren also unabhängig
   vom Hosting-Pfad

### Lokaler Test

```bash
# Mit Python (kein Install nötig)
cd /pfad/zum/react-ordner
python3 -m http.server 8080
# → http://localhost:8080

# Mit Node.js (npx)
npx serve .
# → http://localhost:3000
```

---

## 9. Code-Stil (für alle Beispiele)

- TypeScript in allen `.tsx`-Dateien
- 2 Leerzeichen Einrückung
- Einfache Anführungszeichen für Strings
- Semicolons am Zeilenende
- Props-Typen als `interface` (nicht `type`)
- JSDoc-Kommentare für Komponenten
- `const` / `let` statt `var`
- Arrow Functions für Komponenten und Callbacks

---

*Zuletzt aktualisiert: Oktober 2026*
