import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import node from "@astrojs/node";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  prefetch: {
    defaultStrategy: 'viewport',
    prefetchAll: true
  },
  integrations: [tailwind({
    applyBaseStyles: false
  }), react()],
  output: "server",
  adapter: vercel(), 
  
});

// testt