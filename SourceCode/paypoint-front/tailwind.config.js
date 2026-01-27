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
        'primary': '#FBBF24',
        'hover': '#F59E0B',
        'primary-text': '#1F2937',
        'secondary-text': '#374151',
        'tersier-text': '#6B7280',
        'disabled-text': '#9CA3AF'
      },
      animation: {
        "slide-down": "slide-down 0.2s ease-out",
        "slide-up": "slide-up 0.2s ease-in",
        "slide-right": "slide-right 0.5s ease-in",
        "slide-left": "slide-left 0.5s ease-out",
        "modal-slide-down": "modal-slide-down 0.5s ease-in",
        "modal-slide-up": "modal-slide-up 0.5s ease-out",
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
        },
        "slide-right": {
          '0%': {
            transform: 'translateX(-20rem)',
            opacity: '0'
          },'100%': {
            transform: 'translateX(0)',
            opacity: '100'
          }
        },
        "slide-left": {
          '0%': {
            transform: 'translateX(0)',
            opacity: '100'
          },'100%': {
            transform: 'translateX(-20rem)',
            opacity: '100'
          }
        },
        "modal-slide-down" : {
          '0%': {
            transform: 'translateY(-30rem)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '100'
          }
        },
        "modal-slide-up": {
          '0%': {
            transform: 'translateY(0)',
            opacity: '100'
          },
          '100%': {
            transform: 'translateY(-30rem)',
            opacity: '0'
          }
        }
      }
    },
  },
  plugins: [
  ],
}

