import { defineConfig } from 'astro';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
});