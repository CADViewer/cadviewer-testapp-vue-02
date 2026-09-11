# Porting cadviewer-testapp-react-02 to Vue 3

This document outlines the approach to translating the existing `cadviewer-testapp-react-02` application into the newly created `cadviewer-testapp-vue-02` Vue 3 workspace.

## User Review Required

> [!IMPORTANT]
> Since this is a full port of a React codebase to a Vue codebase, please review the steps below. Once you approve, I will begin migrating the files component by component. 
> 
> A key decision here is the use of **Pinia** for state management instead of React Context. Pinia is the standard Vue 3 state management library. Are you comfortable with me installing and using Pinia in the Vue project?

## Open Questions

> [!WARNING]  
> 1. The React app uses `react-resizable-panels`. In Vue, we typically use something like `splitpanes`. I will install `splitpanes` to replicate the resizable layouts. Does that sound good?
> 2. The React app uses `@headlessui/react`. We will use `@headlessui/vue` as its direct replacement.

## Proposed Changes

---

### Phase 1: Environment & Assets

I will prepare the basic requirements for the CADViewer library to function within the Vue environment.

#### [NEW] `cadviewer-testapp-vue-02/public/*`
Copy over all assets (SVG logos, configuration files, CADViewer hander libraries) from the React app's `public/` folder to the Vue app's `public/` folder.

#### [MODIFY] `cadviewer-testapp-vue-02/package.json`
Install necessary Vue-equivalent libraries: `@headlessui/vue`, `splitpanes`, `pinia`, `tailwindcss`. Initialize Tailwind CSS.

---

### Phase 2: State Management

React's `CadviewerContext` needs to be translated into a reactive Vue store.

#### [NEW] `cadviewer-testapp-vue-02/src/store/cadviewerStore.ts`
Translate `CadviewerContext.tsx` into a Pinia store. This will hold the `canvasInstances`, `currentCanvasInstance`, `selectedSpaceObjectID`, etc., making them globally available to all Vue components.

---

### Phase 3: Core CADViewer Component

#### [NEW] `cadviewer-testapp-vue-02/src/components/CADViewer.vue`
Convert the `CADViewer.tsx` React component. 
- Replace `useEffect` with Vue's `onMounted`.
- Ensure `cadviewer` object bindings and initialization logic correctly hook into the Vue component lifecycle.

---

### Phase 4: UI & Layout Migration

Translate the UI shell and the side panels.

#### [NEW] `cadviewer-testapp-vue-02/src/components/Header.vue`
#### [NEW] `cadviewer-testapp-vue-02/src/components/SideBarLeftPanel.vue`
#### [NEW] `cadviewer-testapp-vue-02/src/components/SpaceObjectInfo.vue`
#### [MODIFY] `cadviewer-testapp-vue-02/src/App.vue`
Reconstruct `App.tsx` logic using the migrated Vue components, integrating the resizable panels (`splitpanes`) and tying them to the CADViewer store.

## Verification Plan

### Manual Verification
1. I will run `npm run dev` and ensure the application compiles without errors.
2. I will ask you to open the local development server in your browser to verify that the CADViewer canvas loads successfully and the UI panels match the layout of the React application.
