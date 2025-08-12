import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

export default defineConfig(({ mode }) => {
  // Get the absolute path to the .env file
  const envPath = path.resolve(process.cwd(), '.env');
  const envLocalPath = path.resolve(process.cwd(), '.env.local');
  
  // Check if env files exist
  console.log('Environment files check:', {
    '.env': fs.existsSync(envPath),
    '.env.local': fs.existsSync(envLocalPath),
    cwd: process.cwd()
  });
  
  // Load env files
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  
  // Debug environment variables
  console.log('Environment variables loaded:', {
    mode,
    cwd: process.cwd(),
    envPath,
    envLocalPath,
    env: {
      VITE_SUPABASE_URL: env.VITE_SUPABASE_URL ? 'exists' : 'missing',
      VITE_SUPABASE_ANON_KEY: env.VITE_SUPABASE_ANON_KEY ? 'exists' : 'missing',
      // Log the first 10 characters of the key
      keyStart: env.VITE_SUPABASE_ANON_KEY ? env.VITE_SUPABASE_ANON_KEY.substring(0, 10) : 'missing'
    }
  });

  // Verify environment variables
  if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_ANON_KEY) {
    console.error('Missing required environment variables:', {
      url: env.VITE_SUPABASE_URL ? 'exists' : 'missing',
      key: env.VITE_SUPABASE_ANON_KEY ? 'exists' : 'missing'
    });
  }

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      'import.meta.env': {
        VITE_SUPABASE_URL: JSON.stringify(env.VITE_SUPABASE_URL),
        VITE_SUPABASE_ANON_KEY: JSON.stringify(env.VITE_SUPABASE_ANON_KEY),
        MODE: JSON.stringify(mode)
      }
    }
  };
}); 