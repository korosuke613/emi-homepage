import { MoreVert } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Dropdown,
  Grid,
  IconButton,
  Link,
  List,
  ListDivider,
  ListItem,
  ListItemButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Sheet,
  Stack,
  Typography,
  styled,
} from "@mui/joy";

import { type Languages, defaultLang } from "../../i18n/ui";
import {
  isUIKey,
  useLocalTranslations,
  useLocalTranslationsWithElement,
  useSharedTranslations,
} from "../../i18n/utils";
import { LangSelector } from "../LangSelector";
import { MobileMenu } from "./MobileMenu";
import type { StaticRoutes } from "../../utils/staticRoute";

type Props = {
  lang: Languages;
  currentPath: string;
  routes: StaticRoutes;
  keepOpen?: boolean;
  selectedItem?: string;
  isStorybook?: boolean;
};

export const Header = ({
  lang,
  currentPath = "/",
  routes,
  keepOpen = false,
  selectedItem,
  isStorybook = false,
}: Props) => {
  const t = useSharedTranslations(lang);
  const tl = useLocalTranslations(lang);
  const TLE = useLocalTranslationsWithElement(lang);

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
          {routes.map(({ name, path }, index) => {
            const uiKey = `route.${name}`;
            if (!isUIKey(lang, uiKey)) return null;
            return (
              <ListItem
                key={name}
                sx={{
                  display: { xs: "none", sm: "flex" },
                  marginInlineStart: index === 0 ? "auto" : "unset", // 最初の要素を右寄せ
                }}
              >
                <ListItemButton
                  role="menuitem"
                  component="a"
                  href={path}
                  selected={selectedItem === name}
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
              <MobileMenu lang={lang} routes={routes} />
            </ListItemButton>
          </ListItem>

          {/* 言語切り替えボタン */}
          <ListItem
            sx={{
              padding: "5px",
              borderRadius: "0%",
            }}
          >
            <LangSelector path={currentPath} currentLang={lang} />
          </ListItem>
        </List>
      </Box>
    </header>
  );
};
