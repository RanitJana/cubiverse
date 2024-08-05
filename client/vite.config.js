/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

const target = process.env.VITE_BACKEND_URI || 'http://localhost:5000';


// https://vitejs.dev/config/
export default defineConfig(() => {

  return {

    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: `${target}/api`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
});
