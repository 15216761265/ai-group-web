/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {
      colors:{
        aiGrey:'#f5f5f5',
        aiBlue:'#1858e9'
      },
      screens:{
        _xs:{min:'0px',max:'567px'},
        _sm:{min:'568px',max:'767px'},
        _md:{min:'768px',max:'1023px'},
        _lg:{min:'1024px'},
      }
    },
  },
  plugins: [],
}

