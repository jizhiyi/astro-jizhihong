import { type CollectionEntry, getCollection } from "astro:content";

/**
 * 获取博客文章并按发布时间排序（从新到旧）
 */
export async function getSortedPosts(): Promise<CollectionEntry<"blog">[]> {
  const posts = await getCollection("blog");
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/**
 * 按分类获取博客文章
 */
export async function getPostsByCategory(category: string): Promise<CollectionEntry<"blog">[]> {
  const posts = await getSortedPosts();
  return posts.filter(post => post.data.category === category);
}

/**
 * 获取所有分类及其文章数量
 */
export async function getCategories(): Promise<Array<[string, number]>> {
  const posts = await getCollection("blog");
  const categoryMap = new Map<string, number>();

  posts.forEach(post => {
    const category = post.data.category;
    if (category) {
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
    }
  });

  return Array.from(categoryMap.entries()).sort((a, b) => b[1] - a[1]);
}
