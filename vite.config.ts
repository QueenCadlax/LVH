import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    build: {
      rollupOptions: {
        // ✅ Added dual entry points
        input: {
          main: './index.html',    // main site
          admin: './admin.html',   // admin dashboard
        },
        output: {
          manualChunks: (id) => {
            // Split all seed data files
            if (id.includes('/data/')) {
              const match = id.match(/\/data\/([^\/]+)\.ts$/);
              if (match) {
                return `seeds-${match[1]}`;
              }
            }
            // Keep vendor modules separate
            if (id.includes('node_modules')) {
              if (id.includes('react')) {
                return 'vendor-react';
              }
              if (id.includes('google') || id.includes('genai')) {
                return 'vendor-ai';
              }
              return 'vendor-other';
            }
            return undefined;
          }
        }
      },
      chunkSizeWarningLimit: 800
    }
  };
});
