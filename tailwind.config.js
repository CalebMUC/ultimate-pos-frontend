const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  mode: "jit",
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Poppins', ...defaultTheme.fontFamily.sans],
        heading: ['Poppins', 'Inter', ...defaultTheme.fontFamily.sans],
        mono: ['Roboto Mono', ...defaultTheme.fontFamily.mono],
      },

      colors: {
        light: '#F8F9FA',
        dark: '#1E1E2D',
        bordergray: '#EAEAEA',

        primary: {
          DEFAULT: '#FF9F43',  // Orange
          dark: '#FF8C00',
        },
        secondary: {
          DEFAULT: '#0D1E55', // Dark Blue
        },
        success: {
          DEFAULT: '#28C76F', // Green for Active
        },
        warning: {
          DEFAULT: colors.orange[600],
          ...colors.orange,
        },
        danger: {
          DEFAULT: colors.red[600],
          ...colors.red,
        },
        info: {
          DEFAULT: colors.cyan[600],
          ...colors.cyan,
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['checked', 'disabled'],
      opacity: ['dark'],
      overflow: ['hover'],
    },
  },
  plugins: [],
}
