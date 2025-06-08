import type { Meta, StoryObj } from "@storybook/react";
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
