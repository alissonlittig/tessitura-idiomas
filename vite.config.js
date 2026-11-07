import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';
import { defineConfig } from 'vitest/config';

const base = process.env.BASE_PATH ?? '';

export default defineConfig({
  plugins: [sveltekit({ adapter: adapter({ pages: 'dist', assets: 'dist' }), paths: { base } })],
  test: { include: ['tests/**/*.test.js'] }
});
