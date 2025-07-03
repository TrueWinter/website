// @ts-check
import { defineConfig } from 'astro/config';
import purgecss from 'astro-purgecss';
import sitemap from '@astrojs/sitemap';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://truewinter.dev',
  image: {
    domains: [
      'cms-media.websitestatic.com'
    ]
  },
  server: {
    host: true
  },
  integrations: [
    icon(),
    purgecss({
      safelist: {
        deep: [/\.m_/, /mantine/],
        greedy: [
          /astro/
        ]
      }
    }),
    sitemap()
  ]
});