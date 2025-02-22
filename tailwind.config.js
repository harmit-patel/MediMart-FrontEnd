/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {colors: {
        teal: '#00897B',
        deepBlue: '#005F73',
        limeGreen: '#A7D129',
        softOrange: '#FF8C42',
        lightGray: '#F4F4F4',
        charcoalGray: '#333333',
      },},
    },
    plugins: [],
  };
  