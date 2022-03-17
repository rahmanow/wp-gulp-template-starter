module.exports = {
  mode: 'jit', // Just-In-Time Compiler
  purge: ['./.src/**/*.php', "./.src/**/*.{js,jsx,ts,tsx,vue}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
