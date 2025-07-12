import { Facebook, Instagram, Palette } from "@mui/icons-material";
import type { Languages } from "../../i18n/ui";
import { SocialNetworksTemplate } from "./SocialNetworksTemplate";

type Props = {
  lang: Languages;
};

export const SocialNetworks = ({ lang }: Props) => {
  return (
    <SocialNetworksTemplate
      socialLinks={[
        {
          link: "https://www.instagram.com/yesmypanda",
          svgIcon: <Instagram />,
          color: {
            primary: "#E4405F",
            secondary: "#F77737",
            gradient: "linear-gradient(45deg, #F77737, #E4405F, #C13584)",
          },
        },
        {
          link: "https://www.facebook.com/yesmypanda",
          svgIcon: <Facebook />,
          color: {
            primary: "#1877F2",
            secondary: "#42A5F5",
            gradient: "linear-gradient(45deg, #42A5F5, #1877F2)",
          },
        },
        {
          link: "https://arts.hp.peraichi.com/amy",
          svgIcon: <Palette />,
          color: {
            primary: "#9C27B0",
            secondary: "#BA68C8",
            gradient: "linear-gradient(45deg, #BA68C8, #9C27B0)",
          },
        },
      ]}
    />
  );
};
