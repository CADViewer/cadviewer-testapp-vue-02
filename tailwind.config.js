/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": {
          '50': '#e2e7eb',
          '100': '#b7c2cd',
          '200': '#879aab',
          '300': '#577289',
          '400': '#335370',
          '500': '#0f3557',
          '600': '#0d304f',
          '700': '#0b2846',
          '800': '#08223c',
          '900': '#04162c',
        },
        "sidebar-background": "#0f3557",
        "sidebar-hamburger-background": "#0f3557",
        "sidebar-hamburger-icon": "#ffffff",
        "sidebar-title": "#f9f9f9",
        "sidebar-subtitle": "#efeff0",
        "sidebar-active-item": "#0f3557",
        "sidebar-scrollbar-background": "#0000001a",
        "sidebar-scrollbar-thumb": "#ffffff",
        "sidebar-item-hover": "#ffffff22",
        "bottom-panel-background": "#ffffff",
        "bottom-panel-title": "#3c43347",
        "bottom-panel-subtitle": "#3c43347",
        "bottom-panel-scrollbar-background": "#0f355733",
        "bottom-panel-scrollbar-thumb": "#0f3557",
        "right-action-background": "##0f3557",
        "right-action-icon": "#ffffff",
        "search-input-text-color": "#000000",
      },
      gridTemplateColumns: {
        sidebar: "300px auto",
        "sidebar-collapsed": "0px auto",
      },
      gridTemplateRows: {
        footer: "auto 100px",
        "footer-collapsed": "auto 0px",
      },
    },
  },
  plugins: [],
}
