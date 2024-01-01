/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./public/index.html', './src/**/*.{html,js,vue}'],
  theme: {
    extend: {
      colors: {
        grey_main: '#18181b',
        dark_main: '#1F1F23',
        blue_main: '#2150a6',
        blue_main_hover: '#1C448E',
        dark_border: '#2b2b2f',
        dark_card_background: 'hsl(220, 10%, 15%)',
        light_card_background: 'hsl(240, 10%, 95%)'
      },
      screens: {
        xs: '500px',
        xl: '1280px'
      },
      'inset-inline-start': {}
    }
  },
  plugins: []
}
