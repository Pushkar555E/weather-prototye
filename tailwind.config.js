/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: "rgba(255, 255, 255, 0.1)",
        glassHover: "rgba(255, 255, 255, 0.2)",
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { textShadow: '0 0 15px rgba(255,255,255,0.2)' },
          '50%': { textShadow: '0 0 35px rgba(255,255,255,0.7)' }
        }
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        float: 'float 4s ease-in-out infinite',
        gradient: 'gradient 10s ease infinite',
        fadeUp: 'fadeUp 0.8s ease-out backwards',
        fadeUpDelayed: 'fadeUp 0.8s ease-out 0.2s backwards',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
