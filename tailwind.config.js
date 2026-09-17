/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#020617',
          deep: '#01040f',
          secondary: '#030712',
          surface: '#06152E',
          card: 'rgba(6, 21, 46, 0.55)',
        },
        primary: {
          DEFAULT: '#0284C7',
          hover: '#0369A1',
          foreground: '#F8FAFC',
        },
        brand: {
          deepBlack: '#020617',
          midnight: '#06152E',
          deepBlue: '#0B2A4A',
          electric: '#0284C7',
          cyan: '#06B6D4',
          sky: '#38BDF8',
          lightBlue: '#7DD3FC',
          purple: '#8B5CF6',
          white: '#F8FAFC',
        },
        glass: {
          stroke: 'rgba(255, 255, 255, 0.08)',
          'stroke-highlight': 'rgba(56, 189, 248, 0.3)',
          surface: 'rgba(255, 255, 255, 0.03)',
          highlight: 'rgba(255, 255, 255, 0.08)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glass-sm': '0 4px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        'glass': '0 12px 36px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 0 16px rgba(56, 189, 248, 0.03)',
        'glass-hover': '0 20px 50px rgba(2, 132, 199, 0.18), inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 0 20px rgba(6, 182, 212, 0.08)',
        'glow-electric': '0 0 35px -5px rgba(2, 132, 199, 0.45)',
        'glow-cyan': '0 0 35px -5px rgba(6, 182, 212, 0.45)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glossy-blue': 'linear-gradient(135deg, #0284C7 0%, #06B6D4 50%, #38BDF8 100%)',
        'deep-ocean': 'linear-gradient(135deg, #0B2A4A 0%, #0369A1 50%, #0284C7 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
