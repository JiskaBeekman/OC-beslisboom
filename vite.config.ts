
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()]
})
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/oc-beslisboom/', // naam van je repo, met / eromheen
});
export default defineConfig({
  base: "/<repository-naam>/", // vervang met de naam van je GitHub repo
  plugins: [react()],
});


