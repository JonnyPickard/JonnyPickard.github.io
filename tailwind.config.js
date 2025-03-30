/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,md,mdx}"],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          from: { height: "0px" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        slideUp: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0px" },
        },
      },
      animation: {
        slideDown: "slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)",
        slideUp: "slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)",
      },
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
