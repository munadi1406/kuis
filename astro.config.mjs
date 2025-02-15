import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";


import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  prefetch: {
    prefetchAll: true
  },
  integrations: [tailwind({
    applyBaseStyles: false
  }), react({
    include: ['**/react/*'],
    experimentalReactChildren: true,
  }),],
  output: "server",
  adapter: vercel()

});

// testt