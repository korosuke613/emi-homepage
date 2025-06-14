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
