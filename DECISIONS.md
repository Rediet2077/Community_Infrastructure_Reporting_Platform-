# Architectural & Technology Decisions

This document outlines the core architectural principles, libraries, and frameworks selected for the CIRP (Civil Infrastructure & Reporting Platform) project, detailing the rationale behind each decision.

---

## 1. Modular Domain Architecture (`src/modules/*`)

### Why We Chose It
- **Encapsulation & The "Unplug Test"**: Traditional layer-based architectures (e.g., placing all components in `/components`, all hooks in `/hooks`, all types in `/types`) lead to tight coupling where domain logic is scattered. In this project, each domain feature (`assets`, `reports`, `tasks`, `departments`, `extensions`, `map`, `contractors`, `analytics`, `audit_logs`) is self-contained.
- **Independent Swappability**: Any feature module can be deleted, refactored, or replaced without breaking sibling modules.
- **Strict Dependency Direction**: Cross-module imports are prohibited. Shared abstractions live solely in `src/modules/shared/`.

---

## 2. TanStack Query (React Query) for Server State

### Why We Chose It
- **Server State vs. Client State Separation**: Data from the database or backend API is asynchronous and shared; treating it like client state causes stale data, race conditions, and boilerplate `useEffect` patterns.
- **Automatic Caching & Deduplication**: Avoids duplicate network calls across views and dialogs by caching responses with customizable `staleTime` and `gcTime`.
- **Declarative Mutation & Invalidation**: When a report is accepted or a task is updated, `queryClient.invalidateQueries({ queryKey: ... })` automatically triggers background refetching across all relevant views (e.g. updating dashboard counters, task tables, and deadline warnings synchronously).
- **Zero `useEffect` Data Fetching Bugs**: Eliminates render-loop cascades, unhandled rejection errors, and race conditions.

---

## 3. Zustand for Client-Only UI State

### Why We Chose It
- **Targeted Re-renders**: Unlike React Context, which triggers re-renders across the entire subtree when any context property changes, Zustand allows components to subscribe strictly to individual state slices (`useReportUIStore((s) => s.isAcceptDialogOpen)`).
- **Minimal Boilerplate & Tiny Footprint**: Zustand is <1KB, requires no wrapping Provider boilerplate for localized stores, and works seamlessly with TypeScript.
- **Clean Separation from Data**: Zustand is used strictly for transient client UI state (e.g., active modal IDs, search queries, filter toggles, active role scope), while all remote data is handled by TanStack Query.

---

## 4. Better Fetch (`@better-fetch/fetch`) for Type-Safe HTTP

### Why We Chose It
- **Strict Runtime Validation with Zod**: Standard `fetch` or `axios` only provides TypeScript compile-time assertions (`as ResponseType`), which do not protect against runtime schema drift. `@better-fetch/fetch` enforces `output: zodSchema`, ensuring received data strictly conforms to the expected contract before entering application state.
- **Throw on Error**: By default, fetch does not throw on 4xx/5xx HTTP statuses. With `throw: true`, `@better-fetch/fetch` ensures network or API errors propagate cleanly to TanStack Query's `onError` handlers.
- **Configurable Base URL & Mock Fallbacks**: Allows seamless switching between remote production API endpoints (`process.env.NEXT_PUBLIC_API_URL`) and local high-fidelity mock storage for offline development.

---

## 5. Zod for Schema Validation & Single Source of Truth

### Why We Chose It
- **Schema-First Typing**: Eliminates manual synchronization between TypeScript interfaces and validation logic. All types are derived directly from Zod schemas via `z.infer<typeof Schema>`.
- **Robust Field Parsing**: Form inputs, date strings, enum values, and nested JSON payloads are validated with precise error messages.

---

## 6. Next.js App Router inside `src/app/`

### Why We Chose It
- **Official Recommendation**: Next.js recommends housing application routes under `src/app/` to isolate application code from root-level configuration files (`tailwind.config.ts`, `tsconfig.json`, `package.json`).
- **Route Groups & Isolated Layouts**: Using `src/app/(dashboard)/layout.tsx` allows the operational dashboard layout (`SidebarProvider`, `AppSidebar`, `TopNavbar`, `CIRPQueryProvider`) to wrap all dashboard routes without leaking into potential public or auth routes.
- **URL-Driven State**: Replaces error-prone client-side tab switching (`switch(activeTab)`) with deep-linkable, shareable URLs (`/dashboard/reports`, `/dashboard/tasks`, `/dashboard/register-asset`).

---

## 7. Bun as the Exclusive Runtime & Package Manager

### Why We Chose It
- **Speed & Deterministic Resolution**: Ultra-fast dependency installation, script execution, and native TypeScript support without auxiliary transpilation steps.
- **Standardized Developer Experience**: Consistent commands across the entire team (`bun install`, `bun run dev`, `bun run lint`, `bunx tsc --noEmit`).

---

## 8. shadcn/ui & Radix/Base-UI Primitives

### Why We Chose It
- **Accessible & Headless Foundation**: Full keyboard navigation, ARIA attributes, and focus management out of the box.
- **No Locked-In Node Modules**: Components live directly in the repository under `components/ui/`, giving full control over markup, design tokens, and style variations.
- **Strict Prohibition of Raw HTML**: Enforces design consistency by replacing raw `<button>`, `<input>`, and `<select>` with standardized, theme-aware primitives.

---

## 9. Two-File Hook Pairing Pattern

### Why We Chose It
- **Decoupled Architecture**: Splitting each action into `<feature>-<action>.ts` (pure TypeScript) and `use-<feature>-<action>.ts` (React Query hook) guarantees that data-fetching logic can be tested in isolation, reused in server environments, or run outside React component lifecycles.
- **Explicit Query Keys**: Query key constants are co-located with fetchers and shared across both readers and writers for invalidation.
