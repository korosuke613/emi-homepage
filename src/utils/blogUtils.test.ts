import { describe, expect, it } from "vitest";
import { getAvailableLanguagesForSlug, normalizeSlug } from "./blogUtils";
import type { BlogSchema } from "./microcms";

describe("blogUtils", () => {
  describe("normalizeSlug", () => {
    it("should remove leading slash from slug", () => {
      expect(normalizeSlug("/test-slug")).toBe("test-slug");
      expect(normalizeSlug("/blog/article")).toBe("blog/article");
    });

    it("should return slug as-is when no leading slash", () => {
      expect(normalizeSlug("test-slug")).toBe("test-slug");
      expect(normalizeSlug("blog/article")).toBe("blog/article");
    });

    it("should handle empty string", () => {
      expect(normalizeSlug("")).toBe("");
    });

    it("should handle single slash", () => {
      expect(normalizeSlug("/")).toBe("");
    });
  });

  describe("getAvailableLanguagesForSlug", () => {
    const mockBlogs: BlogSchema[] = [
      {
        id: "1",
        slug: "/test-article",
        language: ["ja", "en"],
        title: "Test Article",
        content: "Content",
        createdAt: "2023-01-01",
        updatedAt: "2023-01-01",
        publishedAt: "2023-01-01",
        revisedAt: "2023-01-01",
        eyecatch: { url: "", width: 0, height: 0 },
        category: {
          id: "1",
          name: "test",
          createdAt: "2023-01-01",
          updatedAt: "2023-01-01",
          publishedAt: "2023-01-01",
          revisedAt: "2023-01-01",
        },
      },
      {
        id: "2",
        slug: "test-article", // same slug without leading slash
        language: ["lo"],
        title: "Test Article Laotian",
        content: "Content",
        createdAt: "2023-01-01",
        updatedAt: "2023-01-01",
        publishedAt: "2023-01-01",
        revisedAt: "2023-01-01",
        eyecatch: { url: "", width: 0, height: 0 },
        category: {
          id: "1",
          name: "test",
          createdAt: "2023-01-01",
          updatedAt: "2023-01-01",
          publishedAt: "2023-01-01",
          revisedAt: "2023-01-01",
        },
      },
      {
        id: "3",
        slug: "/different-article",
        language: ["ja"],
        title: "Different Article",
        content: "Content",
        createdAt: "2023-01-01",
        updatedAt: "2023-01-01",
        publishedAt: "2023-01-01",
        revisedAt: "2023-01-01",
        eyecatch: { url: "", width: 0, height: 0 },
        category: {
          id: "1",
          name: "test",
          createdAt: "2023-01-01",
          updatedAt: "2023-01-01",
          publishedAt: "2023-01-01",
          revisedAt: "2023-01-01",
        },
      },
    ];

    it("should return all languages for blogs with same slug", () => {
      const result = getAvailableLanguagesForSlug(mockBlogs, "/test-article");
      expect(result).toEqual(expect.arrayContaining(["ja", "en", "lo"]));
      expect(result).toHaveLength(3);
    });

    it("should handle slug with or without leading slash", () => {
      const resultWithSlash = getAvailableLanguagesForSlug(
        mockBlogs,
        "/test-article",
      );
      const resultWithoutSlash = getAvailableLanguagesForSlug(
        mockBlogs,
        "test-article",
      );

      expect(resultWithSlash).toEqual(resultWithoutSlash);
    });

    it("should return unique languages only", () => {
      const blogsWithDuplicates: BlogSchema[] = [
        ...mockBlogs,
        {
          id: "4",
          slug: "test-article",
          language: ["ja", "en"], // duplicate languages
          title: "Test Article Duplicate",
          content: "Content",
          createdAt: "2023-01-01",
          updatedAt: "2023-01-01",
          publishedAt: "2023-01-01",
          revisedAt: "2023-01-01",
          eyecatch: { url: "", width: 0, height: 0 },
          category: {
            id: "1",
            name: "test",
            createdAt: "2023-01-01",
            updatedAt: "2023-01-01",
            publishedAt: "2023-01-01",
            revisedAt: "2023-01-01",
          },
        },
      ];

      const result = getAvailableLanguagesForSlug(
        blogsWithDuplicates,
        "test-article",
      );
      expect(result).toEqual(expect.arrayContaining(["ja", "en", "lo"]));
      expect(result).toHaveLength(3);
    });

    it("should return single language for single blog", () => {
      const result = getAvailableLanguagesForSlug(
        mockBlogs,
        "/different-article",
      );
      expect(result).toEqual(["ja"]);
    });

    it("should return empty array for non-existent slug", () => {
      const result = getAvailableLanguagesForSlug(mockBlogs, "/non-existent");
      expect(result).toEqual([]);
    });

    it("should handle blogs with multiple languages", () => {
      const blogWithMultipleLanguages: BlogSchema[] = [
        {
          id: "5",
          slug: "/multi-lang-blog",
          language: ["ja", "en", "lo"],
          title: "Multi Language Blog",
          content: "Content",
          createdAt: "2023-01-01",
          updatedAt: "2023-01-01",
          publishedAt: "2023-01-01",
          revisedAt: "2023-01-01",
          eyecatch: { url: "", width: 0, height: 0 },
          category: {
            id: "1",
            name: "test",
            createdAt: "2023-01-01",
            updatedAt: "2023-01-01",
            publishedAt: "2023-01-01",
            revisedAt: "2023-01-01",
          },
        },
      ];

      const result = getAvailableLanguagesForSlug(
        blogWithMultipleLanguages,
        "/multi-lang-blog",
      );
      expect(result).toEqual(expect.arrayContaining(["ja", "en", "lo"]));
      expect(result).toHaveLength(3);
    });
  });
});
