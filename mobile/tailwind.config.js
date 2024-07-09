import { colors } from "./src/styles/colors"
import { fontFamily } from "./src/styles/fontFamily"

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: { 
    extend: {
      colors,
      fontFamily
    }, 
  }, 
  plugins: [],
}