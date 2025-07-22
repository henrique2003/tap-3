/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "default-primary": "#1a1a21",
        "default-yellow-400": "#ecd20d",
        "default-grenn-300": "rgb(129, 182, 76)",
        "default-red-300": "#ed4337",
        "default-green-300": "#5cb85c",
      },
      fontFamily: {
        goldman: ["Goldman_400Regular"],
        "goldman-bold": ["Goldman_700Bold"],
      },
    },
  },
  plugins: [],
};
