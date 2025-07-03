import { defineCollection, z } from 'astro:content';
import { getBlogPosts } from '../cms';

const blog = defineCollection({
  loader: async () => {
    const posts = await getBlogPosts();
    return posts.map((post) => ({
      id: post.id,
      date: post.createdAt,
      ...post.data
    }));
  },
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.number(),
    description: z.string(),
    content: z.string()
  })
});


export const collections = {
  blog
};
