# CADViewer Vue 3 Application

This project is a modern Vue 3 web application integrated with the **CADViewer Conversion Server**. It replicates and modernizes legacy visual query applications, providing an interface to load, browse, and interact with CAD files (DWG, DGN, PDF, SVG, etc.) dynamically.

## 🚀 Technologies Used

- **Framework:** [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [Headless UI Vue](https://headlessui.com/vue)
- **CAD Engine:** [CADViewer API](https://cadviewer.com/) & AutoXchange Conversion Server

## ✨ Features Implemented (Phase 1)

* **Integrated CADViewer Canvas:** Deep integration with CADViewer JS library to dynamically display engineered CAD drawings within the DOM.
* **Backend Connection:** Connected to the `cadviewer-conversion-server-nextgen` backend to list drawing directories and invoke CAD conversions.
* **Modern Header UI:** A sleek, flex-based top navigation header built with Tailwind CSS.
* **Slide-Out File Browser:** A smooth left-side flyout modal utilizing Headless UI's `<Dialog>` and `<TransitionRoot>`.
* **Dynamic File Structure:** Interactive folder tree displaying directories, SVGs, DWGs, and PDFs dynamically pulled from the backend API.
* **AutoXchange Conversion Pipeline:** Seamless URL routing to securely fetch files locally, parse relative URLs into absolute server queries, and render the resulting data in CADViewer.

## 🛠️ Project Setup & Installation

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed, and the corresponding CADViewer conversion server running locally on `http://localhost:3000`.

### Install Dependencies
```bash
npm install
```

### Development Server
Run the project locally with Vite's blazing-fast HMR.
```bash
npm run dev
```

### Build for Production
Compiles and minifies the Vue app into static assets.
```bash
npm run build
```

## 📁 Key File Structure

* `src/App.vue`: The main entrypoint mapping out the layout, Header, Dialog modals, and the CADViewer canvas.
* `src/components/CADViewer/CADViewer.vue`: The core wrapper around the CADViewer lifecycle, managing initialization, config, and `cvjs_` API binding.
* `src/components/FolderStructure/FolderStructure.vue`: The backend-integrated file browser. Fetches available files from the conversion server API and builds a selectable folder tree.
* `src/components/FolderStructure/FolderNode.vue`: A recursive UI component that visualizes nested folders and individual files with format-specific SVGs.
* `src/demos/hooks/useConfig.ts`: The central configuration manager binding the frontend application to the `cadviewer-conversion-server-nextgen` API.

## 🔧 CADViewer Configuration

The `src/utils/config.ts` (and its environment-specific overlays in `src/demos/`) acts as the central brain for the frontend application. It is a **dynamic, evolving wrapper** that houses all the settings, feature flags, and API configurations necessary to securely initialize and control CADViewer. 

This configuration dictates everything from UI toggles (e.g., displaying top menus) to backend routing for file conversions. As the application evolves, this document will change dynamically to support new workflows.

To configure the application against your own server instance, verify the endpoint mappings inside `src/utils/config.ts`:

```typescript
ServerBackEndUrl: "http://localhost:3000",   // Target for CADViewer backend API and conversion server
ServerUrl: "http://localhost:3001",          // Frontend server (Optional local override)
ServerLocation: "",                          // Physical location override (typically blank for AutoXchange)
```

**Note:** CAD files loaded from the `FolderStructure` will automatically sanitize relative folder queries and prepend the `ServerBackEndUrl` for absolute remote loading into the AutoXchange pipeline.

## Documentation & Guides

For a deep dive into the available configuration parameters, API calls, and workflows, please reference the official CADViewer developer documentation:

* Use the **[CADViewer API](https://cadviewer.com/cadviewerproapi/global.html)** to open and manipulate drawings in your application.
* Read the Guide on how to **[create hotspots](https://cadviewer.com/highlight/main/)** (Space Objects). It outlines how spaces can be processed on a drawing to create interactive objects.
* Read the Guide on how to **[modify hotspots](https://cadviewer.com/highlight2/main/)** (Space Objects). This will help you work with the visual query code in this sample.
* The general documentation on **CADViewer** is found at: [https://cadviewer.com/cadviewertechdocs/](https://cadviewer.com/cadviewertechdocs/).
* The general documentation on **AutoXchange** is found at: [https://cadviewer.com/autoxchangetechdocs/](https://cadviewer.com/autoxchangetechdocs/).

## This package contains

1: [CADViewer script library](https://www.npmjs.com/package/cadviewer)  - [npm](https://www.npmjs.com/package/cadviewer) installed into ClientApp as part of Vue.js 3 front-end.

## This package does not contains

1: The [back-end AutoXchange](https://github.com/CADViewer/cadviewer-conversion-server) conversion server and connecting scripts. Install these separately!

**NOTE:** With this download, use the NodeJS CAD conversion server: https://github.com/CADViewer/cadviewer-conversion-server

2: The converter folder structure contains a larger set of fonts, installed in /cadviewer/converters/autoxchange/fonts/, but a fuller set of fonts can be installed, found on our [download](https://cadviewer.com/download) site. 

Read the sections on installing and handling [Fonts](https://cadviewer.com/autoxchangetechdocs/installation/fonts/) in [AutoXchange TechDocs](https://cadviewer.com/autoxchangetechdocs/) and [TroubleShooting](https://cadviewer.com/autoxchangetechdocs/troubleshooting/).

## License

**TMS 1.0**: Use freely on localhost. Commercial use requires licensing, both using entirely or in parts. Forbidden to remove license key check. Contact Tailor Made Software/CADViewer VizQuery Technologies, [https://cadviewer.com/contact](https://cadviewer.com/contact), for more information.

---

*Part of the CADViewer integration suite. Ready for Phase 2: Visual Queries and Information Panels.*
