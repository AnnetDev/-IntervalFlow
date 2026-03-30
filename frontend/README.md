# IntervalFlow — Frontend

React SPA for browsing exercises and running interval timer workouts. No account required.

**Live:** https://interval-flow.vercel.app

---

## Tech Stack

- **React 19** + **Vite 8**
- **React Router v7** — client-side routing
- **CSS Modules** — scoped styling per component
- **react-countdown-circle-timer** — animated circular timer
- **Web Audio API** — in-browser audio beeps (no audio files)
- **localStorage** — personal exercise persistence
- **Lucide React** — icons
- **Vercel** — deployment

---

## Project Structure

```
src/
├── components/
│   ├── common/              # Reusable UI primitives
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Select/
│   │   ├── Modal/
│   │   ├── Toast/
│   │   ├── Loader/
│   │   └── IntervalFlowLogo/
│   ├── exercises/           # Exercise-domain components
│   │   ├── AllExercises/        # Exercise library tab
│   │   ├── MyExercises/         # Personal collection tab
│   │   ├── ExerciseCard/        # Single exercise card
│   │   ├── ExerciseFilters/     # Shared filter UI (accordion)
│   │   ├── ExerciseDetailsModal/
│   │   └── CreateExerciseModal/ # Create + edit form
│   └── layout/
│       ├── Header/
│       ├── Footer/          # Bottom navigation
│       ├── Navigation/
│       └── Layout/          # Page wrapper
├── pages/
│   ├── ExercisesPage/       # Exercises tab container
│   ├── TimerPage/           # Interval timer
│   ├── ProfilePage/         # Local storage info
│   ├── AboutPage/
│   ├── AuthorPage/
│   ├── SplashPage/          # First-visit intro
│   └── TrainingsPage/       # Placeholder (coming soon)
├── hooks/                   # Custom hooks (logic layer)
├── utils/                   # Pure helper functions
└── App.jsx                  # Routes
```

---

## Custom Hooks

Logic is separated from UI into custom hooks. Each hook has a single responsibility:

| Hook                 | Responsibility                                                                       |
| -------------------- | ------------------------------------------------------------------------------------ |
| `useLocalExercises`  | CRUD for personal exercises in `localStorage`                                        |
| `useExerciseFilters` | Filter state + derived filtered list; reused in both exercise tabs                   |
| `useFetchData`       | Fetch exercises from API, loading/error state                                        |
| `useTimer`           | Interval timer phases (work → rest → roundRest), round/exercise counters, audio refs |
| `useModal`           | `isOpen` + `modalData` state for any modal instance                                  |
| `useToast`           | Timed toast message (auto-dismiss after 2s)                                          |

### Why hooks?

- `useExerciseFilters` is called with the fetched `exercises` array in both **AllExercises** and **MyExercises** — same filter logic, zero duplication
- `useTimer` isolates the phase/round state machine from the Timer component, which only handles UI
- `useModal` is instantiated multiple times in MyExercises (create, edit, details, confirm delete) — state is not shared upward unnecessarily

---

## State Management

State lives as close to where it's used as possible:

| State              | Lives in                           | Why                                               |
| ------------------ | ---------------------------------- | ------------------------------------------------- |
| Personal exercises | `useLocalExercises` (localStorage) | Persisted across sessions, no backend auth needed |
| Filter values      | `useExerciseFilters`               | Local to each tab, not shared globally            |
| Timer phase/round  | `useTimer`                         | Owned by TimerPage, no other component needs it   |
| Modal open/data    | `useModal` instances               | Each modal is independent                         |
| Toast message      | `useToast`                         | Component-level feedback, not global              |

No global state manager (no Context, no Redux) — all state is local or lifted only when two siblings need to share it.

---

## Form Validation

`CreateExerciseModal` validates on submit with user-visible error messages:

- **Name** — required; shows `"Name is required"` under the field
- **Duration** — must be 1–3600 if provided; shows range error
- Errors clear as the user types (per-field)
- JS validation used instead of HTML5 `required` for consistent cross-browser UX

Edge cases handled:

- Empty personal exercise list → "No exercises yet" message with action prompts
- Cancel on edit → modal closes, no changes saved
- Duplicate add from library → toast: "already in My Exercises"

---

## Audio

Sound is generated with the **Web Audio API** — no audio files loaded.

`AudioContext` is created and unlocked (`unlockAudio`) directly inside the Play button click handler — required by iOS/Android to allow audio after a user gesture.

---

## Routing

```
/            → SplashPage (first visit) or redirect to /exercises
/exercises   → ExercisesPage (My Exercises + Library tabs)
/timer       → TimerPage
/profile     → ProfilePage
/about       → AboutPage
/author      → AuthorPage
```

All routes serve `index.html` via `vercel.json` rewrites (SPA routing on Vercel).

---

## Running Locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

The app connects to the production API at `https://intervalflow-api.onrender.com/api-docs`
