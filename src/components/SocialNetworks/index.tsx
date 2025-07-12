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
          title: "@yesmypanda",
          link: "https://www.instagram.com/yesmypanda",
          svgIcon: <Instagram />,
          tags: ["Instagram"],
          simplified: true,
        },
        {
          title: "牧浦えみ  (Amy)",
          link: "https://www.facebook.com/yesmypanda",
          svgIcon: <Facebook />,
          tags: ["Facebook"],
          simplified: true,
        },
        {
          title: "イラストポートフォリオ",
          link: "https://arts.hp.peraichi.com/amy?_ga=2.128552268.1503877285.1735563908-405999167.1735563908&_gl=1*ucpmdk*_gcl_au*MjM2MDIwNDcyLjE3MzU1NjM5MDg",
          svgIcon: <Palette />,
          tags: ["Portfolio"],
          simplified: true,
        },
      ]}
    />
  );
};
