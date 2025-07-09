import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
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
      availableLanguagesForSlug: ["en"],
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
      availableLanguagesForSlug: ["ja"],
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
      availableLanguagesForSlug: ["ja"],
    },
  };

export const LaotianWithEnglishBlog: StoryObj<typeof LanguageFallbackNotice> = {
  args: {
    blog: {
      slug: "sample-blog",
      language: ["en"],
    },
    currentLang: "lo",
    availableLanguagesForSlug: ["en"],
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
    availableLanguagesForSlug: ["ja", "en"],
  },
};

export const SameSlugMultipleLanguagesJapaneseAndEnglish: StoryObj<
  typeof LanguageFallbackNotice
> = {
  args: {
    blog: {
      slug: "sample",
      language: ["ja"], // 現在表示中のブログは日本語のみ
    },
    currentLang: "lo", // ラオス語でアクセス
    availableLanguagesForSlug: ["ja", "en"], // 同じslugで日本語と英語版が存在
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // フォールバック通知が表示されることを確認
    const warningMessage = canvas.getByText(/ບລອກນີ້ບໍ່ມີຢູ່ໃນ LO\. ສະແດງໃນ JA\./);
    expect(warningMessage).toBeInTheDocument();

    // 「利用可能な言語」ラベルが表示されることを確認
    const availableLanguagesLabel = canvas.getByText(/ພາສາທີ່ມີ:/);
    expect(availableLanguagesLabel).toBeInTheDocument();

    // 日本語と英語の両方の国旗リンクが表示されることを確認
    const japaneseLink = canvas.getByRole("link", { name: "JA" });
    const englishLink = canvas.getByRole("link", { name: "EN" });

    expect(japaneseLink).toBeInTheDocument();
    expect(englishLink).toBeInTheDocument();

    // 適切なURLが設定されることを確認
    expect(japaneseLink).toHaveAttribute("href", "/blog/sample/");
    expect(englishLink).toHaveAttribute("href", "/en/blog/sample/");

    // ラオス語の国旗は表示されないことを確認（利用可能言語に含まれていないため）
    const laotianLink = canvas.queryByRole("link", { name: "LO" });
    expect(laotianLink).not.toBeInTheDocument();
  },
};

export const NoFallbackNeeded: StoryObj<typeof LanguageFallbackNotice> = {
  args: {
    blog: {
      slug: "sample",
      language: ["ja"],
    },
    currentLang: "ja", // サポートされている言語でアクセス
    availableLanguagesForSlug: ["ja", "en"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // フォールバック通知が表示されないことを確認
    const warningMessage =
      canvas.queryByText(/このブログは日本語では利用できません/);
    expect(warningMessage).not.toBeInTheDocument();

    const englishWarningMessage = canvas.queryByText(
      /This blog is not available/,
    );
    expect(englishWarningMessage).not.toBeInTheDocument();

    const laotianWarningMessage = canvas.queryByText(/ບລອກນີ້ບໍ່ມີຢູ່ໃນ/);
    expect(laotianWarningMessage).not.toBeInTheDocument();

    // 利用可能言語ラベルも表示されないことを確認
    const availableLanguagesLabel = canvas.queryByText(/利用可能な言語:/);
    expect(availableLanguagesLabel).not.toBeInTheDocument();
  },
};
