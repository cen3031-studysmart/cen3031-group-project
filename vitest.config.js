import { defineConfig } from 'vitest/config';

export default defineConfig({
    include: ['**/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
});
