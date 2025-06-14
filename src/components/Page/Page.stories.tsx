import type { Meta, StoryObj } from "@storybook/react-vite";
import { Page } from ".";

const metaData: Meta = {
  title: "Page",
  component: Page,
};

export default metaData;

export const Default: StoryObj<typeof Page> = {
  args: {
    headerProp: {
      lang: "ja",
      currentPathWithoutLang: "/",
    },

    pageCoverProp: {
      title: "PageCover Title",
    },
  },
};
