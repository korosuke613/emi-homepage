import type { Meta, StoryObj } from "@storybook/react";
import { ServiceLinkCards } from ".";

const metaData: Meta = {
  title: "ServiceLinkCards",
  component: ServiceLinkCards,
};

export default metaData;

export const Default: StoryObj<typeof ServiceLinkCards> = {
  args: {
    serviceLinkCard: [
      {
        title: "Yosemite National Park",
        description: "California, USA",
        cardImg:
          "https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318",
        tags: ["Nature", "Mountain", "Lake"],
      },
      {
        title: "Yosemite National Park",
        description: "California, USA",
        cardImg:
          "https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318",
        tags: ["Nature", "Mountain", "Lake"],
      },
      {
        title: "Yosemite National Park",
        description: "California, USA",
        cardImg:
          "https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318",
        tags: ["Nature", "Mountain", "Lake"],
      },
    ],
  },
};
