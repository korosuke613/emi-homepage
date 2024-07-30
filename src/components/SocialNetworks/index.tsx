import { Facebook, GitHub, Instagram, Twitter } from "@mui/icons-material";

import type { ReactProps } from "../../utils/react";
import type { ServiceLinkCardMobile } from "../ServiceLinkCards/ServiceLinkCardMobile";
import { SocialNetworksTemplate } from "./SocialNetworksTemplate";
import { FaSquareThreads } from "react-icons/fa6";

export const SocialNetworks = () => (
  <SocialNetworksTemplate
    socialLinks={[
      {
        title: "Futa Hirakoba",
        description: "滅多に使ってない",
        link: "https://www.facebook.com/futa.hirakoba.5",
        svgIcon: <Facebook />,
        tags: ["Facebook"],
      },
      {
        title: "@Shitimi_613",
        link: "https://twitter.com/Shitimi_613",
        description: "エンジニアアカウント",
        svgIcon: <Twitter />,
        tags: ["Twitter"],
      },
      {
        title: "@AiraKagoshima",
        link: "https://twitter.com/AiraKagoshima",
        description: "裏アカウント",
        svgIcon: <Twitter />,
        tags: ["Twitter"],
      },
      {
        title: "@tibi_auwa_auwa",
        link: "https://www.instagram.com/tibi_auwa_auwa/",
        description: "ストーリーメイン",
        svgIcon: <Instagram />,
        tags: ["Instagram"],
      },
      {
        title: "@tibi_auwa_auwa",
        link: "https://www.threads.net/@tibi_auwa_auwa",
        svgIcon: <FaSquareThreads size={24} color="636B74" />,
        tags: ["Threads"],
      },
      {
        title: "@korosuke613",
        link: "https://github.com/korosuke613",
        svgIcon: <GitHub />,
        tags: ["GitHub"],
      },
    ]}
  />
);
