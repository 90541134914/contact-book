import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/contact-book/',   // This MUST be your repo name with slashes
  plugins: [vue()]
})
