import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/contact-book/', // ✅ REQUIRED for GitHub Pages
  plugins: [vue()]
})
