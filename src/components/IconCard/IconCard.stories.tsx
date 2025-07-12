import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconCard } from ".";
import type { ReactProps } from "../../utils/react";
import { Instagram } from "@mui/icons-material";

const metaData: Meta = {
  title: "IconCard",
  component: IconCard,
};

export default metaData;

const defaultArgs: ReactProps<typeof IconCard> = {
  svgIcon: <Instagram />,
  link: "https://www.instagram.com",
};

export const LargeMobile: StoryObj<typeof IconCard> = {
  parameters: {
    viewport: {
      defaultViewport: "mobile2",
    },
  },
  args: {
    ...defaultArgs,
  },
};

export const SmallMobile: StoryObj<typeof IconCard> = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  args: defaultArgs,
};
