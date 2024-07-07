import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import ExternalLink from "./ExternalLink";

type Props = {
  children?: ReactNode;
  title: ReactNode;
};

export default function PageLayout({ children, title }: Props) {
  const t = useTranslations("PageLayout");

  return (
    <div>
      <div>
        <div />
      </div>
      <div>
        <h1>{title}</h1>
        <div>{children}</div>
        <div>
          <ExternalLink
            description={t("links.docs.description")}
            href={t("links.docs.href")}
            title={t("links.docs.title")}
          />
          <ExternalLink
            description={t("links.source.description")}
            href={t("links.source.href")}
            title={t("links.source.title")}
          />
        </div>
      </div>
    </div>
  );
}
