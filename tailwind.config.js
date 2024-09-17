/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        rdprmy: "#A80038",
        whtprmy: "#FBF9FA",
      },
    },
  },
  plugins: [require("daisyui")],
};
