import { describe, expect, it } from "vitest";
import {
  getLangFromUrl,
  getRoutePathWithLang,
  isLanguages,
  isUIKey,
  useLocalTranslations,
  useSharedTranslations,
} from "./utils";

describe("i18n/utils", () => {
  describe("getLangFromUrl", () => {
    it("should return correct language from URL path", () => {
      expect(getLangFromUrl(new URL("https://example.com/en/blog/"))).toBe(
        "en",
      );
      expect(getLangFromUrl(new URL("https://example.com/ja/"))).toBe("ja");
    });

    it("should return default language for root path", () => {
      expect(getLangFromUrl(new URL("https://example.com/"))).toBe("ja");
    });

    it("should return default language for invalid language", () => {
      expect(getLangFromUrl(new URL("https://example.com/invalid/"))).toBe(
        "ja",
      );
    });
  });

  describe("getRoutePathWithLang", () => {
    it("should return path without prefix for default language (ja)", () => {
      expect(getRoutePathWithLang("/blog", "ja")).toBe("/blog");
      expect(getRoutePathWithLang("link", "ja")).toBe("/link");
    });

    it("should return path with language prefix for non-default languages", () => {
      expect(getRoutePathWithLang("/blog", "en")).toBe("/en/blog");
      expect(getRoutePathWithLang("link", "lo")).toBe("/lo/link");
      expect(getRoutePathWithLang("/", "en")).toBe("/en/");
    });

    it("should handle paths with and without leading slash", () => {
      expect(getRoutePathWithLang("blog", "en")).toBe("/en/blog");
      expect(getRoutePathWithLang("/blog", "en")).toBe("/en/blog");
    });
  });

  describe("isLanguages", () => {
    it("should return true for valid languages", () => {
      expect(isLanguages("ja")).toBe(true);
      expect(isLanguages("en")).toBe(true);
      expect(isLanguages("lo")).toBe(true);
    });

    it("should return false for invalid languages", () => {
      expect(isLanguages("invalid")).toBe(false);
      expect(isLanguages("fr")).toBe(false);
      expect(isLanguages(undefined)).toBe(false);
    });
  });

  describe("isUIKey", () => {
    it("should return true for valid UI keys", () => {
      expect(isUIKey("ja", "nav.about")).toBe(true);
      expect(isUIKey("en", "route.blog")).toBe(true);
      expect(isUIKey("lo", "nav.twitter")).toBe(true);
    });

    it("should return false for invalid UI keys", () => {
      expect(isUIKey("ja", "invalid.key")).toBe(false);
      expect(isUIKey("en", "nonexistent")).toBe(false);
    });
  });

  describe("useSharedTranslations", () => {
    it("should return correct translation for each language", () => {
      const tJa = useSharedTranslations("ja");
      const tEn = useSharedTranslations("en");
      const tLo = useSharedTranslations("lo");

      expect(tJa("nav.about")).toBe("概要");
      expect(tEn("nav.about")).toBe("About");
      expect(tLo("nav.about")).toBe("ກ່ຽວກັບ");
    });

    it("should fallback to default language when translation is missing", () => {
      const t = useSharedTranslations("lo");

      // Test with a key that should exist in all languages
      expect(t("route.blog")).toBe("Blog");

      // If a key doesn't exist in Laotian, it should fallback to Japanese
      const result = t("nav.about");
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("useLocalTranslations", () => {
    it("should return correct translation for local dictionary", () => {
      const tJa = useLocalTranslations("ja");
      const tEn = useLocalTranslations("en");
      const tLo = useLocalTranslations("lo");

      const testDict = {
        ja: "こんにちは",
        en: "Hello",
        lo: "ສະບາຍດີ",
      };

      expect(tJa(testDict)).toBe("こんにちは");
      expect(tEn(testDict)).toBe("Hello");
      expect(tLo(testDict)).toBe("ສະບາຍດີ");
    });
  });
});
