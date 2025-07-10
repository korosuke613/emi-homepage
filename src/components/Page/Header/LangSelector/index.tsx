import {
  Box,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
} from "@mui/joy";
import {
  type Languages,
  defaultLang,
  languageEmojis,
  languageKeys,
  languageNames,
} from "../../../../i18n/ui";

const idPrefix = "lang-selector";

type Props = {
  path: string;
  currentLang: Languages;
  open?: boolean;
};

const generateHref = (lang: Languages, path: string): string => {
  const normalizedPath = path.replace(/^\//, "").replace(/\/$/, "");

  // ブログページかどうかをチェック
  const isBlogPage =
    normalizedPath.startsWith("blog/") ||
    normalizedPath.startsWith("en/blog/") ||
    normalizedPath.startsWith("lo/blog/");

  if (isBlogPage) {
    // ブログページの場合、スラッグを抽出
    const blogSlugMatch = normalizedPath.match(/blog\/(.+)$/);
    if (blogSlugMatch) {
      let slug = blogSlugMatch[1];
      // 末尾のスラッシュを確保
      if (!slug.endsWith("/")) {
        slug += "/";
      }

      // どの言語でアクセスしても同じ内容が表示されるため、
      // リクエストされた言語のURLを生成
      if (lang === defaultLang) {
        return `/blog/${slug}`;
      }
      return `/${lang}/blog/${slug}`;
    }
  }

  // 通常のページの場合（従来の処理）
  if (lang === defaultLang) {
    return `/${normalizedPath}`;
  }

  if (normalizedPath === "") {
    return `/${lang}`;
  }
  return `/${lang}/${normalizedPath}`;
};

export const LangSelector = ({ path, currentLang, open }: Props) => (
  <Box className={idPrefix}>
    <Dropdown open={open}>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{
          root: {
            variant: "outlined",
            color: "neutral",
            "data-testid": "lang-selector-button",
          },
        }}
        sx={{
          height: "50px",
          width: "50px",
          fontFamily: "ui-monospace, 'Courier New', monospace",
          fontWeight: "bold",
        }}
      >
        {languageEmojis[currentLang]}
      </MenuButton>
      <Menu placement="bottom-end">
        {languageKeys.map((lang) => {
          let className = "";
          if (lang === defaultLang) className = `${idPrefix}-default`;

          return (
            <MenuItem
              key={lang}
              selected={lang === currentLang}
              component="a"
              href={generateHref(lang, path)}
            >
              <Box
                className={className}
                aria-label={lang}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <span
                  style={{
                    fontFamily: "ui-monospace, 'Courier New', monospace",
                    fontWeight: "bold",
                  }}
                >
                  {languageEmojis[lang]}
                </span>
                <span>{languageNames[lang]}</span>
              </Box>
            </MenuItem>
          );
        })}
      </Menu>
    </Dropdown>
  </Box>
);
