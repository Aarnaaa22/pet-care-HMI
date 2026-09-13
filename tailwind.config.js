/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
    },
    extend: {
      fontFamily: {
        kalam: ['Kalam', 'cursive'],
        nunito: ['Nunito', 'sans-serif'],
      },
      colors: {
        // Whisker & Wag palette
        ww: {
          pine:       '#23402E',
          'pine-dark':'#1A3022',
          cream:      '#F3E6C8',
          paper:      '#FBF3E1',
          'paper-dark':'#EFE0BE',
          wood:       '#A9713B',
          'wood-dark':'#7C5028',
          'wood-light':'#C68F52',
          brass:      '#C89B3C',
          'brass-dark':'#9A7526',
          awning:     '#A63D2F',
          'awning-dark':'#832E23',
          ink:        '#2B1E14',
        },
        // Legacy pet palette (kept for compatibility)
        pet: {
          green:         '#7BD389',
          'green-light': '#EBF8EE',
          'green-dark':  '#5BB369',
          pink:          '#F7C6D7',
          'pink-soft':   '#FFF0F5',
          'pink-dark':   '#FF85A1',
          lavender:      '#9D72FF',
          'lavender-light':'#F0E6FF',
          blue:          '#4EA8DE',
          'blue-light':  '#E0F2FE',
          dark:          '#2A2F2B',
          medium:        '#525C54',
          muted:         '#8E9890',
          bg:            '#FAF9F6',
        }
      },
      borderRadius: {
        'card': '12px',
        'pill': '100px',
      },
      boxShadow: {
        'warm-sm': '0 4px 12px rgba(124,80,40,0.10)',
        'warm-md': '0 10px 28px rgba(124,80,40,0.16), 0 2px 8px rgba(0,0,0,0.04)',
        'warm-lg': '0 18px 40px rgba(124,80,40,0.22), 0 4px 12px rgba(0,0,0,0.06)',
        // Legacy
        'soft-sm': '0 4px 12px rgba(123, 211, 137, 0.06)',
        'soft-md': '0 10px 28px -4px rgba(123, 211, 137, 0.12), 0 2px 8px rgba(0, 0, 0, 0.02)',
        'soft-lg': '0 18px 40px -6px rgba(123, 211, 137, 0.2), 0 4px 12px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}

