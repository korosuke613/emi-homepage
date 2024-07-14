import type { Languages } from "../../i18n/ui";
import {
  useLocalTranslations,
  useLocalTranslationsWithElement,
  useSharedTranslations,
} from "../../i18n/utils";

type Props = {
  lang: Languages;
};

export const Header = ({ lang }: Props) => {
  const t = useSharedTranslations(lang);
  const tl = useLocalTranslations(lang);
  const TLE = useLocalTranslationsWithElement(lang);

  return (
    <header>
      <h1>{t("header")}</h1>
      <nav>
        <ul>
          <li>
            <a href="/ja/about">概要</a>
          </li>
          <li>
            <a href="/ja/twitter">ツイッター</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
