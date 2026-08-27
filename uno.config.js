import { defineConfig, presetWind3, presetAttributify } from "unocss";

export default defineConfig({
  presets: [presetWind3(), presetAttributify()],
  theme: {
    fontFamily: {
      display: '"Space Grotesk", sans-serif',
      sans: '"Inter", sans-serif',
      mono: '"JetBrains Mono", monospace',
    },
  },
});
