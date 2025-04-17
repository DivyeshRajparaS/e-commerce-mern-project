/** @type {import('tailwindcss').Config} */
// tailwind.config.js
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        "slide-fade": "slideFade 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
      },
      keyframes: {
        slideFade: {
          "0%": {
            transform: "translateY(-50px) scale(0.9)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0) scale(1)",
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [],
};