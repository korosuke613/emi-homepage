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
  },
};

export const English: StoryObj<typeof MobileMenu> = {
  args: {
    lang: "en",
  },
};
