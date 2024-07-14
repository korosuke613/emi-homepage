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
  ListItem,
  ListItemButton,
  Menu,
  MenuButton,
  MenuItem,
  Sheet,
  Stack,
  Typography,
  styled,
} from "@mui/joy";
import { type Languages, defaultLang } from "../../i18n/ui";
import {
  useLocalTranslations,
  useLocalTranslationsWithElement,
  useSharedTranslations,
} from "../../i18n/utils";
import { LangSelector } from "../LangSelector";

type Props = {
  lang: Languages;
  path: string;
};

export const Header = ({ lang, path = "/" }: Props) => {
  const t = useSharedTranslations(lang);
  const tl = useLocalTranslations(lang);
  const TLE = useLocalTranslationsWithElement(lang);

  return (
    <header>
      <Box component="nav" aria-label="My site">
        <List role="menubar" orientation="horizontal" sx={{ padding: "0px" }}>
          <ListItem>
            <Link
              aria-label="to Home"
              underline="none"
              href={lang === defaultLang ? "/" : `/${lang}`}
            >
              <Typography level="h1">{t("header")}</Typography>
            </Link>
          </ListItem>
          <ListItem
            sx={{
              marginInlineStart: "auto",
              display: { xs: "none", sm: "flex" },
            }}
          >
            <ListItemButton
              role="menuitem"
              component="a"
              href="#horizontal-list"
            >
              {t("route.career")}
            </ListItemButton>
          </ListItem>
          <ListItem
            sx={{
              display: { xs: "none", sm: "flex" },
            }}
          >
            <ListItemButton
              role="menuitem"
              component="a"
              href="#horizontal-list"
            >
              {t("route.links")}
            </ListItemButton>
          </ListItem>

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
              <Dropdown>
                <MenuButton
                  variant="plain"
                  sx={{
                    padding: "unset",
                    width: "48px",
                    minHeight: "-webkit-fill-available",
                    borderRadius: "0%",
                  }}
                >
                  <MoreVert />
                </MenuButton>
                <Menu placement="bottom-end">
                  <MenuItem>
                    <Link
                      underline="none"
                      color="neutral"
                      href="#horizontal-list"
                      textColor={"common.black"}
                    >
                      {t("route.career")}
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      underline="none"
                      color="neutral"
                      href="#horizontal-list"
                      textColor={"common.black"}
                    >
                      {t("route.links")}
                    </Link>
                  </MenuItem>
                </Menu>
              </Dropdown>
            </ListItemButton>
          </ListItem>

          <ListItem
            sx={{
              padding: "5px",
              minHeight: "-webkit-fill-available",
              borderRadius: "0%",
            }}
          >
            <LangSelector path={path} currentLang={lang} />
          </ListItem>
        </List>
      </Box>
    </header>
  );
};
