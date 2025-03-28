/// <reference types="vitest" />
import tsconfigPaths from "vite-tsconfig-paths";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    passWithNoTests: true,
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts", "vitest-canvas-mock"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
