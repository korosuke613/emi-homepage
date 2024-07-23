import type { Meta, StoryObj } from "@storybook/react";
import { MobileMenu } from ".";

const metaData: Meta = {
  title: "Header/MobileMenu",
  component: MobileMenu,
};

export default metaData;

export const Default: StoryObj<typeof MobileMenu> = {
  args: {
    lang: "ja",
    routes: [
      { name: "career", path: "/career" },
      { name: "link", path: "/link" },
      { name: "blog", path: "/blog" },
    ],
  },
};

export const English: StoryObj<typeof MobileMenu> = {
  args: {
    lang: "en",
    routes: [
      { name: "career", path: "/en/career" },
      { name: "link", path: "/en/link" },
      { name: "blog", path: "/en/blog" },
    ],
  },
};
