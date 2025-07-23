import type { Languages } from "../i18n/ui";
import type { BlogSchema } from "./microcms";

/**
 * slugの先頭のスラッシュを除去して正規化する
 */
export const normalizeSlug = (slug: string): string => {
  return slug.startsWith("/") ? slug.slice(1) : slug;
};

/**
 * 指定されたslugと同じslugを持つブログの利用可能な言語を取得する
 */
export const getAvailableLanguagesForSlug = (
  blogs: BlogSchema[],
  targetSlug: string,
): Languages[] => {
  const normalizedTargetSlug = normalizeSlug(targetSlug);

  const blogsWithSameSlug = blogs.filter((blog) => {
    const blogNormalizedSlug = normalizeSlug(blog.slug);
    return blogNormalizedSlug === normalizedTargetSlug;
  });

  const availableLanguages = [
    ...new Set(blogsWithSameSlug.flatMap((blog) => blog.language)),
  ];

  return availableLanguages;
};

/**
 * 時系列順に並べられたブログリストから前の記事・次の記事を取得する
 */
export const getPreviousAndNextBlog = (
  blogs: BlogSchema[],
  currentSlug: string,
): { previousBlog: BlogSchema | null; nextBlog: BlogSchema | null } => {
  const normalizedCurrentSlug = normalizeSlug(currentSlug);

  // createdAtで降順（新しい順）にソート
  const sortedBlogs = blogs.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // 現在のブログのインデックスを見つける
  const currentIndex = sortedBlogs.findIndex((blog) => {
    const blogNormalizedSlug = normalizeSlug(blog.slug);
    return blogNormalizedSlug === normalizedCurrentSlug;
  });

  if (currentIndex === -1) {
    return { previousBlog: null, nextBlog: null };
  }

  // 前の記事（より新しい記事）
  const previousBlog = currentIndex > 0 ? sortedBlogs[currentIndex - 1] : null;

  // 次の記事（より古い記事）
  const nextBlog =
    currentIndex < sortedBlogs.length - 1
      ? sortedBlogs[currentIndex + 1]
      : null;

  return { previousBlog, nextBlog };
};
