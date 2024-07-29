import { defineConfig, loadEnv } from "vite";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      port: +env.PORT,
    },
    define: {
      "process.env": process.env,
    },
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "./src/components"),
        "@common": path.resolve(__dirname, "./src/common"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@service": path.resolve(__dirname, "./src/services"),
        "@context": path.resolve(__dirname, "./src/contexts"),
      },
    },
  };
});
