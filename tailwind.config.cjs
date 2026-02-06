module.exports = {
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0b2545',
        softgray: '#f3f4f6'
      },
      fontFamily: {
        sans: ['"Noto Sans Bengali"', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
}
