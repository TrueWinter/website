import SnowCMSClient from '@binaryfrost/snowcms-client';
import type { CollectionEntryWithRenderedData, CollectionEntryWithTitle } from '@binaryfrost/snowcms-client/types/CollectionEntry';
import { getCollection, type CollectionEntry } from 'astro:content';

export const config = {
  url: process.env.CMS_API_URL!,
  website: process.env.CMS_WEBSITE_ID!,
  collections: {
    projects: {
      collection: process.env.CMS_COLLECTION_PROJECTS!, // "Project Order" Collection
      entry: process.env.CMS_COLLECTION_PROJECTS_ENTRY!, // "Project Order" Entry
    },
    blog: process.env.CMS_COLLECTION_BLOG!
  },
  key: process.env.CMS_API_KEY!
};

const client = new SnowCMSClient(
  config.url,
  config.website,
  config.key
);

async function getAllEntries(collection: string): Promise<CollectionEntryWithTitle[]> {
  let page = 1;
  let pages = 0;

  const entryPages: CollectionEntryWithTitle[][] = [];

  const entries = client.getCollectionEntries(collection, {
    limit: 100
  });

  while (page !== pages) {
    pages = await entries.getPages();
    page = entries.currentPage;

    entryPages.push(await entries.goToPage(page));
  }

  return entryPages.flat();
}

export interface Project {
  name: string
  url: string
  description: string
}

interface ProjectOrder {
  projects: CollectionEntryWithRenderedData<Project>[]
}

export async function getProjects(): Promise<Project[]> {
  const { collection, entry } = config.collections.projects;
  const { data } = await client.getCollectionEntry
    <CollectionEntryWithRenderedData<ProjectOrder>>(collection, entry);

  return data.projects.map((project) => project.data);
}

interface BlogPost {
  title: string
  slug: string
  description: string
  content: string
}

export async function getBlogPosts(): Promise<CollectionEntryWithRenderedData<BlogPost>[]> {
  const entries = await getAllEntries(config.collections.blog);
  return client.getCollectionEntriesData<BlogPost>(entries);
}

export async function getSortedBlogPosts(): Promise<CollectionEntry<'blog'>[]> {
  return (await getCollection('blog')).sort((a, b) => b.data.date - a.data.date);
}
