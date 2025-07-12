import {
  AirRounded,
  Facebook,
  GitHub,
  Instagram,
  Twitter,
} from "@mui/icons-material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SocialNetworksTemplate } from ".";
import type { ReactProps } from "../../../utils/react";

const metaData: Meta = {
  title: "SocialNetworks/SocialNetworksTemplate",
  component: SocialNetworksTemplate,
};

export default metaData;

const defaultArgs: ReactProps<typeof SocialNetworksTemplate> = {
  socialLinks: [
    {
      link: "https://www.facebook.com",
      svgIcon: <Facebook />,
      color: {
        primary: "#1877F2",
        secondary: "#42A5F5",
        gradient: "linear-gradient(45deg, #42A5F5, #1877F2)",
      },
    },
    {
      link: "https://www.twitter.com",
      svgIcon: <Twitter />,
      color: {
        primary: "#1DA1F2",
        secondary: "#AAB8C2",
        gradient: "linear-gradient(45deg, #AAB8C2, #1DA1F2)",
      },
    },
    {
      link: "https://www.instagram.com",
      svgIcon: <Instagram />,
      color: {
        primary: "#E4405F",
        secondary: "#F77737",
        gradient: "linear-gradient(45deg, #F77737, #E4405F, #C13584)",
      },
    },
    {
      link: "https://www.github.com",
      svgIcon: <GitHub />,
      color: {
        primary: "#181717",
        secondary: "#24292E",
        gradient: "linear-gradient(45deg, #24292E, #181717)",
      },
    },
    {
      link: "https://korosuke613.dev",
      svgIcon: <AirRounded />,
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
