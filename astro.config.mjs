import { defineConfig } from 'astro/config';
import react from "@astrojs/react";

import vercel from "@astrojs/vercel/static";
import { setupMicroCMS } from './src/utils/integration';

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en', 'lo']
  },
  integrations: [react(), setupMicroCMS()],
  output: "static",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    imageService: true,
    devImageService: true
  }),
});
