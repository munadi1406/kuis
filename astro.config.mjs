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
  adapter: vercel({
    isr: {
      bypassToken: "maskdmkasd01293012309120390123asdasdmk", // Untuk mem-bypass cache
      exclude: [
          "/api/**",     // Mengecualikan seluruh rute di bawah /api
          "/siswa/**"    // Mengecualikan seluruh rute di bawah /siswa
      ]
  }
  })

});

// testt