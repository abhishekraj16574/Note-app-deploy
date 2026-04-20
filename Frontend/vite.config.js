import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
   server:{
    proxy:{
      '/api':'https://note-app-7hll.onrender.com'
    },
  },
  plugins: [
    tailwindcss(),
  ],
})