import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Set base to your GitHub repo name, e.g. '/startpage/'
// If using a custom domain or user/org page, set base to '/'
export default defineConfig({
  plugins: [vue()],
  base: '/startpage/',
})
