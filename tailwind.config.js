/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,md,mdx}"],
  theme: {
    extend: {
      colors: {
        // bg-secondary-100 etc
        secondary: {
          100: "#d1d2d5",
          200: "#a3a6ab",
          300: "#767980",
          400: "#484d56",
          500: "#1a202c",
          600: "#151a23",
          700: "#10131a",
          800: "#0a0d12",
          900: "#050609",
        },
      },
    },
  },
  plugins: [],
};
