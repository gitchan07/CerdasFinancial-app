import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// export default defineConfig({
//     plugins: [react()],
// });
export default defineConfig({
    server: {
      proxy: {
        '/api': {
          target: 'http://117.53.47.31:5000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  });
  
