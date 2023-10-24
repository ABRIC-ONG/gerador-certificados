/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#35A245",
        darkPrimary: "#00805A",
      },
    },
  },
  plugins: [],
};
