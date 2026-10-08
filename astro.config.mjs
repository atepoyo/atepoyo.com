import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { markdownOptions } from "./src/lib/markdown.ts";

export default defineConfig({
  vite: { plugins: [tailwindcss()] },
  site: "https://atepoyo.com",
  output: "static",
  prefetch: true,
  trailingSlash: "never",
  build: { format: "file" },
  markdown: markdownOptions,
});
