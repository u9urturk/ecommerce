import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // developer can toggle .dark on <html>
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '3rem'
      }
    },
    extend: {
      // Font system
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial'],
        // Fallbacks for special headings if you ever want more character
        display: ['Inter', 'Poppins', 'system-ui']
      },

      // Semantic color tokens for e-commerce flows
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        success: 'hsl(var(--success))',
        warning: 'hsl(var(--warning))',
        danger: 'hsl(var(--danger))',
        
        // Keep existing brand colors for compatibility
        brand: {
          DEFAULT: '#6D28D9',
          light: '#8B5CF6',
          dark: '#4C1D95',
        },
        
        // Neutral surface colors
        neutral: {
          50: '#FFFFFF',
          100: '#F7F8FA',
          200: '#EEF0F3',
          300: '#E2E6EB',
          400: '#C8CDD4',
          500: '#99A0A9',
          600: '#6E7780',
          700: '#4B5561',
          800: '#2F3840',
          900: '#111317'
        },
      },

      // Border radius scale tuned for cards, buttons and pills
      borderRadius: {
        none: '0',
        sm: '6px',
        DEFAULT: '10px',
        md: '14px',
        lg: '18px',
        full: '9999px'
      },

      // Shadows tuned for subtle elevation in product cards and modals
      boxShadow: {
        xs: '0 1px 2px rgba(16,24,40,0.04)',
        sm: '0 1px 3px rgba(16,24,40,0.06)',
        DEFAULT: '0 6px 18px rgba(14,20,40,0.08)',
        md: '0 12px 30px rgba(14,20,40,0.12)',
        lg: '0 24px 60px rgba(14,20,40,0.16)',
        'card': '0 8px 20px rgba(11,15,30,0.08)'
      },

      // Fine tuned font sizes matching the recommended hierarchy
      fontSize: {
        'xs': ['12px', '16px'],
        'sm': ['13px', '18px'],
        'base': ['15px', '22px'],
        'lg': ['18px', '26px'],
        'xl': ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['28px', '36px']
      },

      // Spacing scale (additions to Tailwind defaults for UI rhythm)
      spacing: {
        '4.5': '1.125rem', // 18px
        '7': '1.75rem',
        '9': '2.25rem',
        '13': '3.25rem'
      },

      // Transition presets
      transitionTimingFunction: {
        'brand-ease': 'cubic-bezier(.2,.9,.3,1)'
      },

      // z-index helpers commonly needed
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90'
      }
    }
  },
  
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    // Optional: aspect-ratio plugin (if using gallery/product media components)
    // require('@tailwindcss/aspect-ratio')
  ],
}

export default config
