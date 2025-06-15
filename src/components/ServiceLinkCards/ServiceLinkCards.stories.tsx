import type { Meta, StoryObj } from "@storybook/react-vite";
import { ServiceLinkCards } from ".";
import type { ReactProps } from "../../utils/react";

const metaData: Meta = {
  title: "ServiceLinkCards",
  component: ServiceLinkCards,
};

export default metaData;

const defaultArgs: ReactProps<typeof ServiceLinkCards> = {
  serviceLinkCard: [
    {
      title: "Yosemite National Park",
      description: "California, USA",
      cardImg:
        "https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318",
      tags: ["Nature", "Mountain", "Lake"],
    },
    {
      title: "Grand Canyon National Park",
      description: "Arizona, USA",
      cardImg:
        "https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318",
      tags: ["Nature", "Canyon", "Desert"],
    },
    {
      title: "Yellowstone National Park",
      description: "Wyoming, USA",
      cardImg:
        "https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318",
      tags: ["Nature", "Geysers", "Wildlife"],
    },
  ],
};

export const Default: StoryObj<typeof ServiceLinkCards> = {
  args: defaultArgs,
};

export const Tablet: StoryObj<typeof ServiceLinkCards> = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
  args: defaultArgs,
};

export const LargeMobile: StoryObj<typeof ServiceLinkCards> = {
  parameters: {
    viewport: {
      defaultViewport: "mobile2",
    },
  },
  args: defaultArgs,
};

export const SmallMobile: StoryObj<typeof ServiceLinkCards> = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  args: defaultArgs,
};
