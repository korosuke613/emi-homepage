import { Facebook, Instagram, Palette } from "@mui/icons-material";
import type { Languages } from "../../i18n/ui";
import { useContentTranslations } from "../../i18n/utils";
import { SocialNetworksTemplate } from "./SocialNetworksTemplate";

type Props = {
  lang: Languages;
};

export const SocialNetworks = ({ lang }: Props) => {
  const content = useContentTranslations(lang);

  return (
    <SocialNetworksTemplate
      socialLinks={[
        {
          title: "@amy_from_japan",
          link: "https://www.instagram.com/amy_from_japan",
          description: content.social("顔"),
          svgIcon: <Instagram />,
          tags: ["Instagram"],
        },
        {
          title: "@yesmypanda",
          link: "https://www.instagram.com/yesmypanda",
          description: content.social("連絡つきやすい"),
          svgIcon: <Instagram />,
          tags: ["Instagram"],
        },
        {
          title: "牧浦えみ  (Amy)",
          link: "https://www.facebook.com/yesmypanda",
          description: content.social("社内広報メイン"),
          svgIcon: <Facebook />,
          tags: ["Facebook"],
        },
        {
          title: "イラストポートフォリオ",
          link: "https://arts.hp.peraichi.com/amy?_ga=2.128552268.1503877285.1735563908-405999167.1735563908&_gl=1*ucpmdk*_gcl_au*MjM2MDIwNDcyLjE3MzU1NjM5MDg",
          description: content.social("イラストポートフォリオ"),
          svgIcon: <Palette />,
          tags: ["Portfolio"],
        },
      ]}
    />
  );
};
