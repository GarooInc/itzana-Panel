/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '320px',
      
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        "light-brown": "#9d8973",
        "brown": "#917136",
        "cream": "#ebe7dd",
        "green": "#28433a",
        "lightgreen": "#bad056",
        "lightgray": "#555347",
        "redorange": "#FF3D1E",
        "oxblood": "#AE2602",
        "darkgray": "#333333",
        "aqua":"#1f443a",
      },
    },
  },
  plugins: [],
}