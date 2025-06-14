import { Box, Link, Typography } from "@mui/joy";
import { type Languages, defaultLang, languageEmojis } from "../../../i18n/ui";
import { useLocalTranslations } from "../../../i18n/utils";

type Props = {
  blog: {
    slug: string;
    language: Languages[];
  };
  currentLang: Languages;
  availableLanguagesForSlug: Languages[];
};

const generateBlogUrl = (slug: string, lang: Languages): string => {
  // スラッシュを正規化
  const normalizedSlug = slug.startsWith("/") ? slug.slice(1) : slug;

  if (lang === defaultLang) {
    return `/blog/${normalizedSlug}/`;
  }
  return `/${lang}/blog/${normalizedSlug}/`;
};

export const LanguageFallbackNotice = ({
  blog,
  currentLang,
  availableLanguagesForSlug,
}: Props) => {
  const availableLanguages = availableLanguagesForSlug;
  const isCurrentLanguageSupported = availableLanguages.includes(currentLang);
  const t = useLocalTranslations(currentLang);

  const warningMessage = t({
    en: `This blog is not available in ${languageEmojis.en}. Displaying in ${languageEmojis[availableLanguages[0]]}.`,
    ja: `このブログは日本語では利用できません。${languageEmojis[availableLanguages[0]]} で表示しています。`,
    lo: `ບລອກນີ້ບໍ່ມີຢູ່ໃນ ${languageEmojis.lo}. ສະແດງໃນ ${languageEmojis[availableLanguages[0]]}.`,
  });

  const availableLanguagesLabel = t({
    en: "Available languages:",
    ja: "利用可能な言語:",
    lo: "ພາສາທີ່ມີ:",
  });

  return (
    <>
      {!isCurrentLanguageSupported && (
        <Box sx={{ marginBottom: 2 }}>
          {/* 言語が対応していない場合の通知 */}
          <Box
            sx={{
              backgroundColor: "warning.softBg",
              color: "warning.softColor",
              padding: 1.5,
              borderRadius: "sm",
              marginBottom: 2,
              border: "1px solid",
              borderColor: "warning.outlinedBorder",
            }}
          >
            <Typography level="body-md">{warningMessage}</Typography>
            <Typography level="body-md">
              {availableLanguagesLabel}{" "}
              {availableLanguages.map((lang, index) => (
                <span key={lang}>
                  <Link href={generateBlogUrl(blog.slug, lang)}>
                    {languageEmojis[lang]}
                  </Link>
                  {index < availableLanguages.length - 1 && " "}
                </span>
              ))}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};
