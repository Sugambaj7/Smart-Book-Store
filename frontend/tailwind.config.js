/** @type {import('tailwindcss').Config} */
export default {
  important: true,
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
        custom_green: "#4BBF73",
        custom_black: "#cfcfcf",
        alert_red: "#712B29",
      },
      borderColor: {
        border_green: "#4BBF73",
        border_login_input: "#ced4da",
        border_table: "#ddd",
      },
      backgroundColor: {
        custom_green: "#4BBF73",
        custom_white: "#F7F7F9",
        custom_alert: "#F7DDDC",
        table_background: "#F2F2F2",
      },
    },
  },
  plugins: [],
};
