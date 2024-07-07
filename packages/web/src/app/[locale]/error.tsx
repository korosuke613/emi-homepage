"use client";

import PageLayout from "@/components/PageLayout";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

type Props = {
  error: Error;
  reset(): void;
};

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export default function Error({ error, reset }: Props) {
  const t = useTranslations("Error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageLayout title={t("title")}>
      <div>
        {t.rich("description", {
          p: (chunks) => <p>{chunks}</p>,
          retry: (chunks) => (
            <button onClick={reset} type="button">
              {chunks}
            </button>
          ),
        })}
      </div>
    </PageLayout>
  );
}
