import type { Meta, StoryObj } from "@storybook/react";
import { ServiceLinkCardMobile } from ".";

const metaData: Meta = {
  title: "ServiceLinkCards/ServiceLinkCardMobile",
  component: ServiceLinkCardMobile,
};

export default metaData;

export const Default: StoryObj<typeof ServiceLinkCardMobile> = {
  args: {
    title: "Yosemite National Park",
    description: "California, USA",
    cardImg:
      "https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318",
    tags: ["Nature", "Mountain", "Lake"],
  },
};
