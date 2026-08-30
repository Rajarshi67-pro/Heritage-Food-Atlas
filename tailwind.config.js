/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        heritage: {
          terracotta: "#C84B31",
          saffron: "#FF7B54",
          amber: "#F4A261",
          turmeric: "#E9C46A",
          sandstone: "#FDFBF7",
          parchment: "#F5EFEB",
          clay: "#7A3E26",
          indigo: "#1A2E40",
          peacock: "#264653",
          forest: "#2A9D8F",
          charcoal: "#1F1F1F",
          cardbg: "#FFFFFF",
          border: "#EADECA",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "serif"],
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      backgroundImage: {
        'pattern-rangoli': "radial-gradient(#E9C46A 0.75px, transparent 0.75px), radial-gradient(#E9C46A 0.75px, #FDFBF7 0.75px)",
      },
    },
  },
  plugins: [],
};
