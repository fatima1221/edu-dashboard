# edu-dashboard

A small React + TypeScript + Vite admin UI for managing institutions (universities, high schools, schools).
Uses Redux Toolkit, RTK Query, Vite, and MSW for development mocking.

Quick start

1. Install and run:
   ```bash
   npm install
   npm run dev
   ```
2. Build and preview:
   ```bash
   npm run build
   npm run preview
   ```

What’s inside (key files)

- src/main.tsx — app entry, registers MSW in dev.
- src/app/App.tsx — application root.
- src/routes/AppRouter.tsx — routing.
- src/app/store.ts — Redux store.
- src/api/baseApi.ts — RTK Query base API.
- src/api/createInstitutionApi.ts — helper to create institution APIs.
- src/features/auth — login/logout and auth state (persisted).
- src/features/\*/pages — pages for universities, high schools, schools.
- src/components/ui — reusable UI (tables, modals, loader).
- src/mocks/browser.ts and src/mocks/handler.ts — MSW mock setup.

Notes

- MSW (mocking) runs only in development (registered from src/main.tsx).
- Auth state is persisted to localStorage.
- Keep types in each feature folder for clarity.
