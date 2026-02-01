import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // FIX VITE OXIC PARSER BUG
  esbuild: {
    jsxDev: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "tailwindcss/base"; @import "tailwindcss/components"; @import "tailwindcss/utilities";`
      }
    }
  }
})
