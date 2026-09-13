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
      colors: {
        pet: {
          green: '#7BD389',
          'green-light': '#EBF8EE',
          'green-dark': '#5BB369',
          pink: '#F7C6D7',
          'pink-soft': '#FFF0F5',
          'pink-dark': '#FF85A1',
          lavender: '#9D72FF',
          'lavender-light': '#F0E6FF',
          blue: '#4EA8DE',
          'blue-light': '#E0F2FE',
          dark: '#2A2F2B',
          medium: '#525C54',
          muted: '#8E9890',
          bg: '#FAF9F6',
          card: 'rgba(255, 255, 255, 0.95)',
        }
      },
      borderRadius: {
        'card': '24px',
        'pill': '100px',
      },
      boxShadow: {
        'soft-sm': '0 4px 12px rgba(123, 211, 137, 0.06)',
        'soft-md': '0 10px 28px -4px rgba(123, 211, 137, 0.12), 0 2px 8px rgba(0, 0, 0, 0.02)',
        'soft-lg': '0 18px 40px -6px rgba(123, 211, 137, 0.2), 0 4px 12px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}
