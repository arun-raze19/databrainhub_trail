import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Enable minification for production
    minify: true,
    // Copy static files to the output directory
    copyPublicDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  // Simplified optimizeDeps
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'react-redux', '@reduxjs/toolkit'],
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 4173,
  },
  define: {
    // Provide default values for environment variables
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || 'https://mock-api.example.com'),
    'process.env.VITE_SOCKET_URL': JSON.stringify(process.env.VITE_SOCKET_URL || 'https://mock-api.example.com'),
  },
});

