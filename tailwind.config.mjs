/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Modern dark theme
        dark: {
          DEFAULT: '#0A0B1E',     // Deep space blue
          100: '#151629',         // Lighter space blue
          200: '#1E1F3A',         // Navy space
          300: '#2A2C4C',         // Midnight purple
        },
        // Accent colors
        primary: {
          DEFAULT: '#4F46E5',     // Indigo
          light: '#818CF8',       // Light indigo
          dark: '#3730A3',        // Dark indigo
        },
        accent: {
          DEFAULT: '#10B981',     // Emerald
          light: '#34D399',       // Light emerald
          dark: '#059669',        // Dark emerald
        },
        highlight: {
          DEFAULT: '#F43F5E',     // Rose
          light: '#FB7185',       // Light rose
          dark: '#E11D48',        // Dark rose
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        display: ['Clash Display', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid': `linear-gradient(to right, #1E1F3A 1px, transparent 1px),
                linear-gradient(to bottom, #1E1F3A 1px, transparent 1px)`,
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
}