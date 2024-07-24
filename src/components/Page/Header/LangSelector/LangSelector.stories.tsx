import type { Meta, StoryObj } from "@storybook/react";
import { expect, screen, userEvent, within } from "@storybook/test";
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

    const items = screen.getAllByRole("menuitem");
    for (const item of items) {
      const link = within(item).getByRole("link");
      const href = link.getAttribute("href");
      const linkParent = link.parentElement;
      const classNames = linkParent?.className.split(" ") ?? [];
      const ariaLabel = linkParent?.getAttribute("aria-label");

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

    const items = screen.getAllByRole("menuitem");
    for (const item of items) {
      const link = within(item).getByRole("link");
      const href = link.getAttribute("href");
      const linkParent = link.parentElement;
      const classNames = linkParent?.className.split(" ") ?? [];
      const ariaLabel = linkParent?.getAttribute("aria-label");

      if (classNames.includes("lang-selector-default")) {
        expect(href).toBe("/hoge");
      } else {
        expect(href).toBe(`/${ariaLabel}/hoge`);
      }
    }
  },
};
