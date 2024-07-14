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
