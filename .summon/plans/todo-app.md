---
status: implemented
title: Simple Todo App
---

1. Set up the base project files
   - Create `/app/index.html` with a root div and a script tag pointing to the entry file.
   - Create `/app/package.json` with React 19, Vite, TypeScript, and Tailwind CSS v3 dependencies.
   - Create `/app/vite.config.ts` with the React plugin and the `@/` alias mapped to `/app/src/`.
   - Create `/app/tsconfig.json` and `/app/tsconfig.node.json` with strict TypeScript settings and the `@/*` path alias.
   - Create `/app/tailwind.config.js` scanning `./index.html` and `./src/**/*.{ts,tsx}`.
   - Create `/app/postcss.config.js` wiring up Tailwind and Autoprefixer.
   - Expected outcome: project boots and Tailwind classes are available.

2. Create the global stylesheet
   - Create `/app/src/styles/global.css` starting with the three `@tailwind` directives (base, components, utilities).
   - Expected outcome: Tailwind styles apply across the whole app.

3. Create the app entry point
   - Create `/app/src/main.tsx` that mounts the root React component into the `#root` element and imports the global stylesheet once.
   - Expected outcome: React renders into the page and Tailwind styles are loaded.

4. Define shared types
   - Create `/app/src/types/todo.ts` exporting a `Todo` type with fields for id, title text, completed flag, and created timestamp.
   - Expected outcome: a single source of truth for what a todo item looks like.

5. Add a persistence hook
   - Create `/app/src/hooks/useTodos.ts` that manages the list of todos in state, loads any saved list from local storage on mount, saves changes back to local storage, and exposes helpers to add, toggle complete, edit the text of, and delete a todo, plus a helper to clear all completed items.
   - Expected outcome: todos survive page refresh and all list mutations happen in one place.

6. Build the "add todo" input component
   - Create `/app/src/components/TodoInput.tsx` with a text field and an add button. Pressing Enter or clicking the button submits the new todo, trims whitespace, ignores empty submissions, and clears the field afterward.
   - Expected outcome: users can type a task and add it to the list.

7. Build the individual todo row component
   - Create `/app/src/components/TodoItem.tsx` showing a checkbox, the todo text, an edit button, and a delete button. Completed items appear with a strikethrough and muted color. Clicking edit turns the text into an inline input; pressing Enter saves, Escape cancels.
   - Expected outcome: each todo can be checked off, renamed, or removed.

8. Build the list + filter component
   - Create `/app/src/components/TodoList.tsx` that receives the todos and renders a `TodoItem` for each. Include filter tabs for All / Active / Completed, a live count of remaining active items, and a "Clear completed" action. Show a friendly empty state when the filtered list is empty.
   - Expected outcome: users can focus on a subset of tasks and clean up finished ones.

9. Build the main page
   - Create `/app/src/pages/HomePage.tsx` that composes a heading ("My Tasks"), the input component, and the list component, wired to the `useTodos` hook. Center the card on the page with a soft background, rounded card, subtle shadow, and comfortable spacing using Tailwind utilities.
   - Expected outcome: a polished single-page todo experience.

10. Wire the root component
    - Create `/app/src/App.tsx` that renders `HomePage`.
    - Update `/app/src/main.tsx` to render `App`.
    - Expected outcome: the home page is what users see when they open the app.

11. Final polish pass
    - Ensure focus states, hover states, and keyboard interactions feel good (visible focus rings, hover color shifts on buttons, checkboxes with a clear checked state).
    - Add a small footer line under the list with a friendly tip (e.g. "Double-click to edit" if edit-on-doubleclick is added, otherwise a simple task count summary).
    - Expected outcome: the app looks and feels finished, not like a rough prototype.
