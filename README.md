# MeroToDo ✓

A to-do list web app I built as a college project to practice React concepts we were taught in class. I typed out all the logic myself to really understand how everything works — hooks, state management, routing, and more.

🔗 **Live Site:** [https://merotodo-college-project.netlify.app/](https://merotodo-college-project.netlify.app/)

---

## What I learned building this

This project helped me get hands-on with a lot of React concepts:

- React hooks like `useState`, `useEffect`, `useReducer`, `useMemo`, `useCallback`
- Custom hooks (`useLocalStorage`, `useDebounce`)
- React Context API for sharing state across the app
- React Router for page navigation
- Filtering, sorting, and searching through lists
- Conditional rendering and edge case handling
- Performance optimization (debouncing, memoization)
- LocalStorage so data stays even after closing the browser
- Responsive CSS — works on mobile, tablet, and desktop

---

## Features

- **Add tasks** — give it a title, description, category, priority, and due date
- **Edit tasks** — update any detail any time
- **Mark complete** — check off tasks when you're done
- **Delete tasks** — deleted tasks go to Trash, not gone forever
- **Trash & Restore** — recover accidentally deleted tasks, or empty the trash to delete permanently
- **Categories** — Work, Personal, Shopping (with color-coded badges)
- **Priority levels** — High, Medium, Low (color-coded)
- **Due dates** — tasks show their due date, overdue tasks get highlighted with a warning
- **Today view** — shows only tasks due today or already overdue
- **Search** — search tasks by title or description (with debounce so it's not slow)
- **Sort** — sort tasks by priority, due date, or created date
- **Light / Dark mode** — toggle theme, it remembers your choice
- **Settings page** — toggle dark mode, or clear all data if you want a fresh start
- **Responsive design** — works on phone, tablet, and desktop

---

## Tech Stack

| What | How |
|------|-----|
| UI library | React 19 |
| Build tool | Vite |
| Routing | React Router v7 |
| Styling | Plain CSS (mobile-first, responsive) |
| State management | React Context + useReducer |
| Data storage | Browser LocalStorage |
| Loading spinner | react-spinners |
| Hosting | Netlify |

---

## Project Structure

```
src/
├── components/       # Reusable UI pieces (Navbar, TaskItem, Modal, etc.)
├── context/          # Global state (tasks, theme)
├── hooks/            # Custom hooks (useLocalStorage, useDebounce)
├── pages/            # Full pages (AllTasks, TodayView, TrashView, Settings)
└── utils/            # Helper functions and constants
```

---

## Running it locally

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build
```

---

## Notes

- The CSS styling was AI-assisted since I was short on time, but all the React logic and component code was written by me to understand how it actually works.
- This is a front-end only project — no backend, no login. Everything lives in your browser's LocalStorage.

---

*MeroToDo © 2026 — College Project*