import { Facebook, GitHub, Instagram, Twitter } from "@mui/icons-material";
import type { Meta, StoryObj } from "@storybook/react";
import { SocialNetworksTemplate } from ".";
import type { ReactProps } from "../../../utils/react";

const metaData: Meta = {
  title: "SocialNetworksTemplate",
  component: SocialNetworksTemplate,
};

export default metaData;

const defaultArgs: ReactProps<typeof SocialNetworksTemplate> = {
  socialLinks: [
    {
      title: "Futa Hirakoba",
      description: "滅多に使ってない",
      link: "https://www.facebook.com",
      svgIcon: <Facebook />,
      tags: ["Facebook"],
    },
    {
      title: "@Shitimi_613",
      link: "https://www.twitter.com",
      description: "エンジニアアカウント",
      svgIcon: <Twitter />,
      tags: ["Twitter"],
    },
    {
      title: "@AiraKagoshima",
      link: "https://www.twitter.com",
      description: "裏アカウント",
      svgIcon: <Twitter />,
      tags: ["Twitter"],
    },
    {
      title: "@tibi_auwa_auwa",
      link: "https://www.instagram.com",
      description: "ストーリーメイン",
      svgIcon: <Instagram />,
      tags: ["Instagram"],
    },
    {
      title: "@korosuke613",
      link: "https://www.github.com",
      svgIcon: <GitHub />,
      tags: ["GitHub"],
    },
  ],
};

export const Default: StoryObj<typeof SocialNetworksTemplate> = {
  args: defaultArgs,
};

export const Tablet: StoryObj<typeof SocialNetworksTemplate> = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
  args: defaultArgs,
};

export const LargeMobile: StoryObj<typeof SocialNetworksTemplate> = {
  parameters: {
    viewport: {
      defaultViewport: "mobile2",
    },
  },
  args: defaultArgs,
};

export const SmallMobile: StoryObj<typeof SocialNetworksTemplate> = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  args: defaultArgs,
};
