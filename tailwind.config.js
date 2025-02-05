/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0A0A0B',    // Base background
          100: '#121214',        // Subtle elevation
          200: '#18181B',        // Card background
          300: '#1F1F23',        // Higher elevation
          400: '#27272A',        // Highest elevation
        },
        primary: {
          DEFAULT: '#0EA5E9',    // Primary blue
          light: '#38BDF8',      
          dark: '#0284C7',
        },
        accent: {
          DEFAULT: '#F43F5E',    // Rose accent
          light: '#FB7185',
          dark: '#E11D48',
        },
        success: {
          DEFAULT: '#10B981',    // Success green
          light: '#34D399',
          dark: '#059669',
        },
        warning: {
          DEFAULT: '#F59E0B',    // Warning yellow
          light: '#FBBF24',
          dark: '#D97706',
        },
        error: {
          DEFAULT: '#EF4444',    // Error red
          light: '#F87171',
          dark: '#DC2626',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'scroll-down': 'scroll-down 2s cubic-bezier(0.65, 0, 0.35, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(0, -10px, 0) rotate(1deg)' }
        },
        'scroll-down': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '75%': { transform: 'translateY(20px)', opacity: '0' },
          '76%, 100%': { transform: 'translateY(0)', opacity: '0' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid': `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Clash Display', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}; 