import type { Meta, StoryObj } from "@storybook/react";
import { Header } from ".";

const metaData: Meta = {
  title: "Header",
  component: Header,
};

export default metaData;

export const Default: StoryObj<typeof Header> = {
  args: {
    lang: "ja",
  },
};

export const MobileView: StoryObj<typeof Header> = {
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
