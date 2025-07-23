import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/joy";
import { type Languages, defaultLang } from "../../../i18n/ui";
import { useLocalTranslations } from "../../../i18n/utils";
import { normalizeSlug } from "../../../utils/blogUtils";
import type { BlogSchema } from "../../../utils/microcms";

type Props = {
  previousBlog: BlogSchema | null;
  nextBlog: BlogSchema | null;
  currentLang: Languages;
};

const generateBlogUrl = (slug: string, lang: Languages): string => {
  const normalizedSlug = normalizeSlug(slug);

  if (lang === defaultLang) {
    return `/blog/${normalizedSlug}/`;
  }
  return `/${lang}/blog/${normalizedSlug}/`;
};

export const BlogNavigation = ({
  previousBlog,
  nextBlog,
  currentLang,
}: Props) => {
  const t = useLocalTranslations(currentLang);

  const previousLabel = t({
    en: "Previous",
    ja: "前の記事",
    lo: "ກ່ອນໜ້າ",
  });

  const nextLabel = t({
    en: "Next",
    ja: "次の記事",
    lo: "ຕໍ່ໄປ",
  });

  if (!previousBlog && !nextBlog) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 2,
        marginTop: 4,
        paddingTop: 3,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Previous blog */}
      <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
        {previousBlog && (
          <Button
            component="a"
            href={generateBlogUrl(previousBlog.slug, currentLang)}
            variant="outlined"
            startDecorator={<ChevronLeft />}
            sx={{
              flexDirection: "column",
              alignItems: "flex-start",
              padding: 2,
              height: "auto",
              maxWidth: "300px",
            }}
          >
            <Typography level="body-sm" sx={{ opacity: 0.7 }}>
              {previousLabel}
            </Typography>
            <Typography
              level="body-md"
              sx={{
                textAlign: "left",
                whiteSpace: "normal",
                wordBreak: "break-word",
                fontWeight: "normal",
              }}
            >
              {previousBlog.title}
            </Typography>
          </Button>
        )}
      </Box>

      {/* Next blog */}
      <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
        {nextBlog && (
          <Button
            component="a"
            href={generateBlogUrl(nextBlog.slug, currentLang)}
            variant="outlined"
            endDecorator={<ChevronRight />}
            sx={{
              flexDirection: "column",
              alignItems: "flex-end",
              padding: 2,
              height: "auto",
              maxWidth: "300px",
            }}
          >
            <Typography level="body-sm" sx={{ opacity: 0.7 }}>
              {nextLabel}
            </Typography>
            <Typography
              level="body-md"
              sx={{
                textAlign: "right",
                whiteSpace: "normal",
                wordBreak: "break-word",
                fontWeight: "normal",
              }}
            >
              {nextBlog.title}
            </Typography>
          </Button>
        )}
      </Box>
    </Box>
  );
};
