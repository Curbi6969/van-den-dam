/** @type {import('tailwindcss').Config} */
// Theme ported verbatim from the former in-browser tailwind.config so the
// compiled stylesheet is visually identical to the old CDN runtime.
module.exports = {
  content: ["./src/**/*.njk"],
  theme: {
    extend: {
      colors: {
        "primary": "#232227",
        "primary-container": "#3a393e",
        "on-primary": "#ffffff",
        "on-primary-container": "#828da7",
        "primary-fixed": "#d7e2ff",
        "primary-fixed-dim": "#c5c5c7",
        "secondary": "#ff0000",
        "secondary-container": "#ff8080",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#741f13",
        "tertiary": "#001224",
        "tertiary-container": "#0a2742",
        "on-tertiary": "#ffffff",
        "surface": "#fbf8ff",
        "surface-dim": "#d7d8f4",
        "surface-bright": "#fbf8ff",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f4f2ff",
        "surface-container": "#edecff",
        "surface-container-high": "#e6e6ff",
        "surface-container-highest": "#e0e0fc",
        "surface-variant": "#e0e0fc",
        "on-surface": "#1a1a1a",
        "on-surface-variant": "#45474d",
        "outline": "#75777d",
        "outline-variant": "#c5c6cd",
        "inverse-surface": "#2d2f44",
        "inverse-on-surface": "#f1efff",
        "inverse-primary": "#c5c5c7",
        "background": "#fbf8ff",
        "on-background": "#1a1a1a",
        "error": "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a"
      },
      fontFamily: {
        "headline": ["Manrope", "sans-serif"],
        "body": ["Work Sans", "sans-serif"],
        "label": ["Inter", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "2xl": "0.75rem",
        "full": "9999px"
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};
