import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // 👈 importante para que Netlify entienda bien las rutas
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
