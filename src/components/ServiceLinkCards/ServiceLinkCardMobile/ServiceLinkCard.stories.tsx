import type { Meta, StoryObj } from "@storybook/react";
import { ServiceLinkCardMobile } from ".";
import type { ReactProps } from "../../../utils/react";

const metaData: Meta = {
  title: "ServiceLinkCards/ServiceLinkCardMobile",
  component: ServiceLinkCardMobile,
};

export default metaData;

const defaultArgs: ReactProps<typeof ServiceLinkCardMobile> = {
  title: "Yosemite National Park",
  description:
    "California, USA, California, USA, California, USA, California, USA",
  cardImg:
    "https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318",
  tags: ["Nature", "Mountain", "Lake"],
};

export const LargeMobile: StoryObj<typeof ServiceLinkCardMobile> = {
  parameters: {
    viewport: {
      defaultViewport: "mobile2",
    },
  },
  args: {
    ...defaultArgs,
  },
};

export const SmallMobile: StoryObj<typeof ServiceLinkCardMobile> = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  args: defaultArgs,
};
