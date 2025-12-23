import { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#C9A34E',
        terracotta: '#B35C43',
        cream: '#FFF7ED',
        espresso: '#2B1608'
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Raleway', 'system-ui']
      }
    }
  },
  plugins: []
}

export default config
