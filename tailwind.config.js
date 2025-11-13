/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./index.html",
     "./src/**/*.{js,ts,jsx,tsx}",  // Wszystkie pliki w src/
   ],
  theme: {
    extend: {
      colors:{
        grand:{
          navy:'#0b1a30',
          gold:'#d4af37',
          cream:'#f5f1e6',
          slate:'#1f2d3d',
        },
      },
      fontFamily:{sans:['Inter','sans-serif'],},
    },
  },
  plugins: [],
  

}

