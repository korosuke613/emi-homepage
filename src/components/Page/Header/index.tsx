import { Box, Link, List, ListItem, ListItemButton } from "@mui/joy";

import { type Languages, defaultLang } from "../../../i18n/ui";
import {
  getRoutePathWithLang,
  isUIKey,
  useSharedTranslations,
} from "../../../i18n/utils";
import { STATIC_ROUTES } from "../../../utils/staticRoute";
import { Typography } from "../../Typography";
import { LangSelector } from "./LangSelector";
import { MobileMenu } from "./MobileMenu";

type Props = {
  lang: Languages;
  currentPathWithoutLang: string;
  keepOpen?: boolean;
};

export const Header = ({
  lang,
  currentPathWithoutLang = "/",
  keepOpen,
}: Props) => {
  const t = useSharedTranslations(lang);

  return (
    <header>
      <Box component="nav" aria-label="My site">
        <List role="menubar" orientation="horizontal" sx={{ padding: "0px" }}>
          <ListItem
            sx={{
              padding: "2px",
            }}
          >
            <Link
              aria-label="to Home"
              underline="none"
              href={lang === defaultLang ? "/" : `/${lang}`}
            >
              <Typography level="h1">{t("header")}</Typography>
            </Link>
          </ListItem>

          {/* デスクトップ用メニュー */}
          {STATIC_ROUTES.map((route, index) => {
            const uiKey = `route.${route}`;
            if (!isUIKey(lang, uiKey)) return null;
            const routePath = getRoutePathWithLang(route, lang);
            return (
              <ListItem
                key={route}
                sx={{
                  display: { xs: "none", sm: "flex" },
                  marginInlineStart: index === 0 ? "auto" : "unset", // 最初の要素を右寄せ
                }}
              >
                <ListItemButton
                  role="menuitem"
                  component="a"
                  href={routePath}
                  selected={currentPathWithoutLang === `/${route}`}
                >
                  {t(uiKey)}
                </ListItemButton>
              </ListItem>
            );
          })}

          {/* モバイル用メニューボタン */}
          <ListItem
            sx={{
              marginInlineStart: { xs: "auto", sm: "0" },
              display: { xs: "flex", sm: "none" },
            }}
          >
            <ListItemButton
              role="menuitem"
              sx={{
                padding: "unset",
              }}
            >
              <MobileMenu
                lang={lang}
                keepOpen={keepOpen}
                currentPathWithoutLang={currentPathWithoutLang}
              />
            </ListItemButton>
          </ListItem>

          {/* 言語切り替えボタン */}
          <ListItem
            sx={{
              padding: "5px",
              borderRadius: "0%",
            }}
          >
            <LangSelector path={currentPathWithoutLang} currentLang={lang} />
          </ListItem>
        </List>
      </Box>
    </header>
  );
};
