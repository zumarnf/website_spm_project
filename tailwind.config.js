/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  daisyui: {
    themes: ["light"],
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(), // Tambahkan path untuk Flowbite React
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        rdprmy: "#A80038",
        whtprmy: "#FBF9FA",
        blckprmy: "#2B2024",
      },
    },
  },
  plugins: [
    require("daisyui"),
    flowbite.plugin(), // Tambahkan plugin untuk Flowbite React
  ],
};
