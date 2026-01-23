/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
     "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['"Monstserrat"', "sans-serif"],
      },
      colors: {
        'primary': '#FFE100'
      },
      animation: {
        "slide-down": "slide-down 0.2s ease-out",
        "slide-up": "slide-up 0.2s ease-in",
      },
      keyframes: {
        "slide-down": {
          '0%' : {
            transform: 'translateY(0)',
            opacity: '100',
          },
          '100%': {
            transform: 'translateY(3.5rem)',
            opacity: '0',
          }
        },
        "slide-up": {
          '0%': {
            transform: 'translateY(3.5rem)',
            opacity: '0',
          },'100%':{
            transform: 'translateY(0)',
            opacity: '100'
          }
        }
      }
    },
  },
  plugins: [],
}

