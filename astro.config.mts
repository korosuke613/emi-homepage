import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import { setupMicroCMS } from "./src/utils/integration";

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
    devImageService: 'squoosh',
  }),
  vite: {
    optimizeDeps: {
      include: [
        '@mui/joy',
        '@mui/icons-material/MoreVert',
        '@mui/icons-material/Facebook',
        '@mui/icons-material/Instagram',
        '@mui/icons-material/GitHub',
        '@mui/icons-material/Twitter',
      ],
      exclude: [
        '@fontsource/noto-serif-jp',
      ],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'mui-core': ['@mui/joy'],
            'mui-icons': [
              '@mui/icons-material/MoreVert',
              '@mui/icons-material/Facebook',
              '@mui/icons-material/Instagram',
              '@mui/icons-material/GitHub',
              '@mui/icons-material/Twitter',
            ],
            'vendor': ['react', 'react-dom'],
          },
        },
      },
    },
  },
});
