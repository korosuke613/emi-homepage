import type { Meta, StoryObj } from "@storybook/react";
import { Header } from ".";

const metaData: Meta = {
  title: "Page/Header",
  component: Header,
};

export default metaData;

export const Default: StoryObj<typeof Header> = {
  args: {
    lang: "ja",
  },
};

export const Tablet: StoryObj<typeof Header> = {
  // モバイル用に画面を狭める
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },

  args: {
    lang: "ja",
  },
};

export const LargeMobile: StoryObj<typeof Header> = {
  // モバイル用に画面を狭める
  parameters: {
    viewport: {
      defaultViewport: "mobile2",
    },
  },

  args: {
    lang: "ja",
  },
};

export const SmallMobile: StoryObj<typeof Header> = {
  // モバイル用に画面を狭める
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },

  args: {
    lang: "ja",
  },
};
