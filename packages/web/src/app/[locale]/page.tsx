import PageLayout from "@/components/PageLayout";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = {
  params: { locale: string };
};

export default function IndexPage({ params: { locale } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  const t = useTranslations("IndexPage");

  return (
    <PageLayout title={t("title")}>
      <p>
        {t.rich("description", {
          code: (chunks) => <code>{chunks}</code>,
        })}
      </p>
    </PageLayout>
  );
}
