import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";
import { LangSelector } from ".";

const metaData: Meta = {
  title: "Page/Header/LangSelector",
  component: LangSelector,
};

export default metaData;

export const Default: StoryObj<typeof LangSelector> = {
  args: {
    path: "/",
    currentLang: "ja",
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button"));

    // Wait for menu to open and items to be rendered - menu renders in body
    await waitFor(() => screen.getByRole("menu"));
    const items = screen.getAllByRole("menuitem");
    for (const item of items) {
      const div = item.children[0] as HTMLDivElement;
      const classNames = div?.className.split(" ") ?? [];
      const ariaLabel = div?.getAttribute("aria-label");
      const href = item.getAttribute("href");
      if (classNames.includes("lang-selector-default")) {
        expect(href).toBe("/");
      } else {
        expect(href).toBe(`/${ariaLabel}`);
      }
    }
  },
};

export const SubDirectory: StoryObj<typeof LangSelector> = {
  args: {
    path: "hoge",
    currentLang: "ja",
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button"));

    // Wait for menu to open and items to be rendered - menu renders in body
    await waitFor(() => screen.getByRole("menu"));
    const items = screen.getAllByRole("menuitem");
    for (const item of items) {
      const div = item.children[0] as HTMLDivElement;
      const classNames = div?.className.split(" ") ?? [];
      const ariaLabel = div?.getAttribute("aria-label");

      const href = item.getAttribute("href");
      if (classNames.includes("lang-selector-default")) {
        expect(href).toBe("/hoge");
      } else {
        expect(href).toBe(`/${ariaLabel}/hoge`);
      }
    }
  },
};

export const LaotianLanguage: StoryObj<typeof LangSelector> = {
  args: {
    path: "/",
    currentLang: "lo",
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // ラオス語フラグボタンが表示されることを確認
    const laosButton = canvas.getByRole("button", { name: "LO" });
    expect(laosButton).toBeInTheDocument();

    await userEvent.click(laosButton);

    // Wait for menu to open and items to be rendered - menu renders in body
    await waitFor(() => screen.getByRole("menu"));

    // 全ての言語オプションが表示されることを確認
    const items = screen.getAllByRole("menuitem");
    expect(items).toHaveLength(3); // ja, en, lo

    // ラオス語オプションが存在することを確認
    const laosMenuItem = screen.getByText("LO ລາວ");
    expect(laosMenuItem).toBeInTheDocument();
  },
};

export const LaotianBlogPage: StoryObj<typeof LangSelector> = {
  args: {
    path: "/lo/blog/sample/",
    currentLang: "lo",
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "LO" }));

    // Wait for menu to open and items to be rendered - menu renders in body
    await waitFor(() => screen.getByRole("menu"));

    // ブログページでのラオス語言語切り替えが機能することを確認
    const laosMenuItem = screen.getByText("LO ລາວ");
    expect(laosMenuItem).toBeInTheDocument();
  },
};
