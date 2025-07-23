import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { BlogNavigation } from ".";
import type { BlogSchema } from "../../../utils/microcms";

const metaData: Meta = {
  title: "Blog/BlogNavigation",
  component: BlogNavigation,
};

export default metaData;

// Mock blog data
const mockPreviousBlog: BlogSchema = {
  id: "previous-blog",
  createdAt: "2024-09-10T10:00:00.000Z",
  updatedAt: "2024-09-10T10:00:00.000Z",
  publishedAt: "2024-09-10T10:00:00.000Z",
  revisedAt: "2024-09-10T10:00:00.000Z",
  title: "前の記事のタイトル",
  language: ["ja"],
  slug: "previous-article",
  category: {
    id: "category-1",
    createdAt: "2024-09-10T10:00:00.000Z",
    updatedAt: "2024-09-10T10:00:00.000Z",
    publishedAt: "2024-09-10T10:00:00.000Z",
    revisedAt: "2024-09-10T10:00:00.000Z",
    name: "テストカテゴリ",
  },
  content: "<p>前の記事の内容</p>",
};

const mockNextBlog: BlogSchema = {
  id: "next-blog",
  createdAt: "2024-09-08T10:00:00.000Z",
  updatedAt: "2024-09-08T10:00:00.000Z",
  publishedAt: "2024-09-08T10:00:00.000Z",
  revisedAt: "2024-09-08T10:00:00.000Z",
  title: "次の記事のタイトル",
  language: ["ja"],
  slug: "next-article",
  category: {
    id: "category-1",
    createdAt: "2024-09-08T10:00:00.000Z",
    updatedAt: "2024-09-08T10:00:00.000Z",
    publishedAt: "2024-09-08T10:00:00.000Z",
    revisedAt: "2024-09-08T10:00:00.000Z",
    name: "テストカテゴリ",
  },
  content: "<p>次の記事の内容</p>",
};

const mockLongTitlePreviousBlog: BlogSchema = {
  ...mockPreviousBlog,
  title:
    "これは非常に長いタイトルの記事で、ボタンのレイアウトがどのように対処するかをテストします",
};

export const BothPreviousAndNext: StoryObj<typeof BlogNavigation> = {
  args: {
    previousBlog: mockPreviousBlog,
    nextBlog: mockNextBlog,
    currentLang: "ja",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 前の記事ボタンが表示されることを確認
    const previousButton = canvas.getByText("前の記事");
    expect(previousButton).toBeInTheDocument();

    // 次の記事ボタンが表示されることを確認
    const nextButton = canvas.getByText("次の記事");
    expect(nextButton).toBeInTheDocument();

    // タイトルが表示されることを確認
    expect(canvas.getByText("前の記事のタイトル")).toBeInTheDocument();
    expect(canvas.getByText("次の記事のタイトル")).toBeInTheDocument();
  },
};

export const OnlyPrevious: StoryObj<typeof BlogNavigation> = {
  args: {
    previousBlog: mockPreviousBlog,
    nextBlog: null,
    currentLang: "ja",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 前の記事ボタンのみ表示されることを確認
    const previousButton = canvas.getByText("前の記事");
    expect(previousButton).toBeInTheDocument();

    // 次の記事ボタンは表示されないことを確認
    const nextButton = canvas.queryByText("次の記事");
    expect(nextButton).not.toBeInTheDocument();
  },
};

export const OnlyNext: StoryObj<typeof BlogNavigation> = {
  args: {
    previousBlog: null,
    nextBlog: mockNextBlog,
    currentLang: "ja",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 次の記事ボタンのみ表示されることを確認
    const nextButton = canvas.getByText("次の記事");
    expect(nextButton).toBeInTheDocument();

    // 前の記事ボタンは表示されないことを確認
    const previousButton = canvas.queryByText("前の記事");
    expect(previousButton).not.toBeInTheDocument();
  },
};

export const NoNavigation: StoryObj<typeof BlogNavigation> = {
  args: {
    previousBlog: null,
    nextBlog: null,
    currentLang: "ja",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // ナビゲーション要素が表示されないことを確認
    const navigation = canvas.queryByRole("navigation");
    expect(navigation).not.toBeInTheDocument();
  },
};

export const EnglishLocale: StoryObj<typeof BlogNavigation> = {
  args: {
    previousBlog: {
      ...mockPreviousBlog,
      title: "Previous Article Title",
    },
    nextBlog: {
      ...mockNextBlog,
      title: "Next Article Title",
    },
    currentLang: "en",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 英語のラベルが表示されることを確認
    const previousButton = canvas.getByText("Previous");
    const nextButton = canvas.getByText("Next");

    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    // 英語のタイトルが表示されることを確認
    expect(canvas.getByText("Previous Article Title")).toBeInTheDocument();
    expect(canvas.getByText("Next Article Title")).toBeInTheDocument();
  },
};

export const LaotianLocale: StoryObj<typeof BlogNavigation> = {
  args: {
    previousBlog: {
      ...mockPreviousBlog,
      title: "ບົດຄວາມກ່ອນໜ້າ",
    },
    nextBlog: {
      ...mockNextBlog,
      title: "ບົດຄວາມຕໍ່ໄປ",
    },
    currentLang: "lo",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // ラオス語のラベルが表示されることを確認
    const previousButton = canvas.getByText("ກ່ອນໜ້າ");
    const nextButton = canvas.getByText("ຕໍ່ໄປ");

    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  },
};

export const LongTitles: StoryObj<typeof BlogNavigation> = {
  args: {
    previousBlog: mockLongTitlePreviousBlog,
    nextBlog: {
      ...mockNextBlog,
      title:
        "これも非常に長いタイトルで、複数行になる可能性があるかどうかをテストします",
    },
    currentLang: "ja",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 長いタイトルが表示されることを確認
    const longPreviousTitle =
      canvas.getByText(/これは非常に長いタイトルの記事で/);
    const longNextTitle = canvas.getByText(/これも非常に長いタイトルで/);

    expect(longPreviousTitle).toBeInTheDocument();
    expect(longNextTitle).toBeInTheDocument();
  },
};
