/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#4ade80",
          secondary: "#70d5d8",
          accent: "#9cf4bc",
          neutral: "#222735",
          "base-100": "#FFFFFF",
          info: "#76C7EA",
          success: "#3DE1D0",
          warning: "#DF9311",
          error: "#DA2F5D",
        },
        dark: {
          primary: "#c9f7a3",
          secondary: "#ffaad9",
          accent: "#a3e635",
          neutral: "#1D2334",
          "base-100": "#333C42",
          info: "#80C3E5",
          success: "#61E0D5",
          warning: "#B48F08",
          error: "#F7635E",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
