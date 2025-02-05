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
        // New primary and accent colors
        primary: {
          DEFAULT: '#ef4444',     // Red
          light: '#f87171',       // Light red
          dark: '#dc2626',        // Dark red
        },
        accent: {
          DEFAULT: '#ff1616',     // Fire red
          light: '#ff3939',       // Light fire red
          dark: '#9b111e',        // Ruby red
        },
        highlight: {
          DEFAULT: '#f43f5e',     // Rose red
          light: '#fb7185',       // Light rose
          dark: '#e11d48',        // Dark rose
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