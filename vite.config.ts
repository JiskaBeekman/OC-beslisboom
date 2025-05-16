import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/OC-beslisboom/',   // hier je repo naam als subpad
  plugins: [react()]
})
