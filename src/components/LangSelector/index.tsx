import {
  Box,
  Dropdown,
  IconButton,
  Link,
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
} from "../../i18n/ui";

const idPrefix = "lang-selector";

type Props = {
  path: string;
  currentLang: Languages;
  open?: boolean;
};

const generateHref = (lang: Languages, path: string): string => {
  const normalizedPath = path.replace(/^\//, "").replace(/\/$/, "");

  // デフォルト言語の場合
  if (lang === defaultLang) {
    return `/${normalizedPath}`;
  }

  // それ以外の言語の場合
  if (normalizedPath === "") {
    // パスが空の場合
    return `/${lang}`;
  }
  return `/${lang}/${normalizedPath}`;
};

export const LangSelector = ({ path, currentLang, open }: Props) => (
  <Box className={idPrefix}>
    <Dropdown open={open}>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "outlined", color: "neutral" } }}
      >
        {languageEmojis[currentLang]}
      </MenuButton>
      <Menu>
        {languageKeys.map((lang) => {
          let className = "";
          if (lang === defaultLang) className = `${idPrefix}-default`;

          return (
            <MenuItem key={lang} selected={lang === currentLang}>
              <Box className={className} aria-label={lang}>
                <Link
                  underline="none"
                  color="neutral"
                  href={generateHref(lang, path)}
                  textAlign="left"
                >
                  {`${languageEmojis[lang]} ${languageNames[lang]}`}
                </Link>
              </Box>
            </MenuItem>
          );
        })}
      </Menu>
    </Dropdown>
  </Box>
);
