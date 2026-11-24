export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { ink: '#0d0d0f', paper: '#ebe9e4', mute: '#8b8a86', line: '#25252a', signal: '#8aa8ff' },
    fontFamily: { sans: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'] },
  } },
}
