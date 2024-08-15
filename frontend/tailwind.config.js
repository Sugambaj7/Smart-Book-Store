/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito"],
      },
      fontSize: {
        h1: "2.25rem",
        h2: "1.875rem",
        h3: "1.5rem",
        h4: "1.25rem",
        p: "1rem",
      },
      colors: {
        white_border: "#eee",
        custom_white: "#F5F5F5",
        custom_grey: "#B1B6C0",
        footer_black: "#282C34",
        dull_grey: "#8f8f8f",
      },
    },
  },
  plugins: [],
};
