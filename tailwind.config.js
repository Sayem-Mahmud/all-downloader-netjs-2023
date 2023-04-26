/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'qblack': 'rgb(34 34 34/1)',
        'qblacktext': 'rgb(29 29 29/1)',
        'qgray': 'rgb(121 121 121/1)',
        'qgraytwo': '#8e8e8e',
        'qgrayBorder': 'rgb(239 239 239/1)',
        'qyellow': 'rgb(255 187 56/1)',
        'qred': '#FF0000',
        'qgrayLite': 'rgb(239 239 239/1)',
        'primarygray': 'rgb(248 248 248/1)'
      },
      gridTemplateColumns: {
        'desktop': 'repeat(4, 1fr)',
        'mobile': 'repeat(2, 180px)',
      }
    },
    screens: {
      'xs': '0px',
      'sm': '670px',
      'md': '1148px',
      'lg': '1280px',
      'xl': '1920px'
    }
    // plugins: [
    //   require('tailwind-scrollbar-hide')

    // ]
  },
};
