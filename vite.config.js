import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/platforms': 'https://www.giantbomb.com/api/platforms/?api_key=b0527010c30e3356d5845bbf608b6df316d3f75a&format=json',
      '/chars': 'https://www.giantbomb.com/api/characters/?api_key=b0527010c30e3356d5845bbf608b6df316d3f75a&format=json',
      '/games': 'https://www.giantbomb.com/api/games/?api_key=b0527010c30e3356d5845bbf608b6df316d3f75a&format=json&limit=1000'
    }
  },
  plugins: [react()]
})
