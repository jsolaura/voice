import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
    plugins: [react(), tsconfigPaths(), svgr()],
    server: {
        port: 3000,
        open: true,
    },
    define: {
        global: '{}',
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    // build: {
    //     outDir: 'build',
    //     // assetsDir: 'static',
    // },
});