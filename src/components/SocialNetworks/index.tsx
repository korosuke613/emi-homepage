import { Facebook, Instagram } from "@mui/icons-material";
import { SocialNetworksTemplate } from "./SocialNetworksTemplate";

export const SocialNetworks = () => (
  <SocialNetworksTemplate
    socialLinks={[
      {
        title: "@amy_from_japan",
        link: "https://www.instagram.com/amy_from_japan",
        description: "顔",
        svgIcon: <Instagram />,
        tags: ["Instagram"],
      },
      {
        title: "@yesmypanda",
        link: "https://www.instagram.com/yesmypanda",
        description: "連絡つきやすい",
        svgIcon: <Instagram />,
        tags: ["Instagram"],
      },
      {
        title: "牧浦えみ  (Amy)",
        link: "https://www.facebook.com/yesmypanda",
        description: "社内広報メイン",
        svgIcon: <Facebook />,
        tags: ["Facebook"],
      },
    ]}
  />
);
