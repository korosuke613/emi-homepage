import type { Meta, StoryObj } from "@storybook/react-vite";
import { LanguageFallbackNotice } from ".";

const metaData: Meta = {
  title: "Blog/LanguageFallbackNotice",
  component: LanguageFallbackNotice,
};

export default metaData;

export const JapaneseWithEnglishBlog: StoryObj<typeof LanguageFallbackNotice> =
  {
    args: {
      blog: {
        slug: "sample-blog",
        language: ["en"],
      },
      currentLang: "ja",
    },
  };

export const EnglishWithJapaneseBlog: StoryObj<typeof LanguageFallbackNotice> =
  {
    args: {
      blog: {
        slug: "sample-blog",
        language: ["ja"],
      },
      currentLang: "en",
    },
  };

export const LaotianWithJapaneseBlog: StoryObj<typeof LanguageFallbackNotice> =
  {
    args: {
      blog: {
        slug: "sample-blog",
        language: ["ja"],
      },
      currentLang: "lo",
    },
  };

export const LaotianWithEnglishBlog: StoryObj<typeof LanguageFallbackNotice> = {
  args: {
    blog: {
      slug: "sample-blog",
      language: ["en"],
    },
    currentLang: "lo",
  },
};

export const LaotianWithMultiLanguageBlog: StoryObj<
  typeof LanguageFallbackNotice
> = {
  args: {
    blog: {
      slug: "sample-blog",
      language: ["ja", "en"],
    },
    currentLang: "lo",
  },
};
