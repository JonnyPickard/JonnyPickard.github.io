/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // eslint-disable-next-line
  // @ts-ignore
  test: {
    // NOTE: turned off for now as canvas based tests need to run on one thread
    // to prevent crashes
    threads: false,
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts", "vitest-canvas-mock"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
