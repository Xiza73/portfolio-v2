// @ts-check
import node from '@astrojs/node';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://xiza.dev',
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
