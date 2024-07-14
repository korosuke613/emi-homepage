import type { Meta, StoryObj } from "@storybook/react";
import { LangSelector } from ".";

const metaData: Meta = {
  title: "LangSelector",
  component: LangSelector,
};

export default metaData;

export const Default: StoryObj<typeof LangSelector> = {
  args: {
    path: "/",
  },
};
