import { defineConfig,loadEnv} from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import path from 'path';
const { publicVars } = loadEnv({ prefixes: ['VITE_'] });

export default defineConfig({
  plugins: [pluginReact()],
  source: {
      define:publicVars,

    entry: {
      index: './src/main.tsx',
    },
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
