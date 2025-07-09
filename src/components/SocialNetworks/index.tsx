import { Facebook, Instagram } from "@mui/icons-material";
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
      ]}
    />
  );
};
