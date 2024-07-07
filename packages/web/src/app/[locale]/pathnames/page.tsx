import PageLayout from "@/components/PageLayout";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = {
  params: { locale: string };
};

export default function PathnamesPage({ params: { locale } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  const t = useTranslations("PathnamesPage");

  return (
    <PageLayout title={t("title")}>
      <div>
        {t.rich("description", {
          p: (chunks) => <p>{chunks}</p>,
          code: (chunks) => <code>{chunks}</code>,
        })}
      </div>
    </PageLayout>
  );
}
