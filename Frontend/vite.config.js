import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
   server:{
    proxy:{
      '/api':'http://localhost:4011'
    },
  },
  plugins: [
    tailwindcss(),
  ],
})