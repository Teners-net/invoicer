const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.jsx',
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },

      height: {
        "screen-70": "70vh",
        "screen-75": "75vh",
        "screen-85": "85vh",
        "screen/2": "50vh",
        "screen/3": "calc(100vh / 3)",
        "screen/4": "calc(100vh / 4)",
        "screen/5": "calc(100vh / 5)",
      },

      colors: {
        primary: '#1a1423ff',
        secondary: '#372549ff',
        eggplant: '#774c60ff',
        redwood: '#b75d69ff',
        dogwood: '#eacdc2ff',
      },
    }
  },

  plugins: [],

  darkMode: 'class'
};
