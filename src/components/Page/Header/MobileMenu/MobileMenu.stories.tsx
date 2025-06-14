import type { Meta, StoryObj } from "@storybook/react-vite";
import { MobileMenu } from ".";

const metaData: Meta = {
  title: "Page/Header/MobileMenu",
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
