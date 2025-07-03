import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';

const collectionEntries = await getCollection('blog');
const pages = Object.fromEntries(collectionEntries.map(({ data }) => [data.slug, data]));

export const { getStaticPaths, GET } = OGImageRoute({
  param: 'route',
  pages: pages,
  getImageOptions: (path, page) => ({
    title: page.title,
    description: page.description,
    bgGradient: [[0x5f, 0x8d, 0xeb], [0xdf, 0x66, 0xff]],
    logo: {
      path: './src/assets/img/logo.jpg',
      size: [128]
    }
  })
});