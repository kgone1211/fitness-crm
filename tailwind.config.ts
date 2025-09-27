import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
  safelist: [
    // Whop component classes
    'whop-btn',
    'whop-input',
    'whop-button',
    'whop-form',
    'whop-card',
    'whop-modal',
    'whop-dropdown',
    'whop-tooltip',
    'whop-badge',
    'whop-avatar',
    'whop-progress',
    'whop-tabs',
    'whop-accordion',
    'whop-alert',
    'whop-toast',
    'whop-skeleton',
    'whop-spinner',
    'whop-loading',
    'whop-error',
    'whop-success',
    'whop-warning',
    'whop-info',
    // Common utility classes that might be missing
    'input',
    'btn',
    'button',
    'form',
    'card',
    'modal',
    'dropdown',
    'tooltip',
    'badge',
    'avatar',
    'progress',
    'tabs',
    'accordion',
    'alert',
    'toast',
    'skeleton',
    'spinner',
    'loading',
    'error',
    'success',
    'warning',
    'info',
  ],
}

export default config



