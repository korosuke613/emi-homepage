import type { Meta, StoryObj } from "@storybook/react";
import { PageCover } from ".";

const metaData: Meta = {
  title: "Page/PageCover",
  component: PageCover,
};

export default metaData;

export const Default: StoryObj<typeof PageCover> = {
  args: {
    title: "PageCover Title",
  },
};

export const Tablet: StoryObj<typeof PageCover> = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
  args: {
    title: "PageCover Title",
  },
};

export const LargeMobile: StoryObj<typeof PageCover> = {
  parameters: {
    viewport: {
      defaultViewport: "mobile2",
    },
  },
  args: {
    title: "PageCover Title",
  },
};

export const SmallMobile: StoryObj<typeof PageCover> = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  args: {
    title: "PageCover Title",
  },
};
