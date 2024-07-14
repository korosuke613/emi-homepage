import {
  Box,
  Link,
  List,
  ListItem,
  ListItemButton,
  Typography,
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
      <Box component="nav" aria-label="My site" sx={{ flexGrow: 1 }}>
        <List role="menubar" orientation="horizontal">
          <ListItem>
            <Link
              aria-label="to Home"
              underline="none"
              href={lang === defaultLang ? "/" : `/${lang}`}
            >
              <Typography level="h1">{t("header")}</Typography>
            </Link>
          </ListItem>
          <ListItem sx={{ marginInlineStart: "auto" }}>
            <ListItemButton
              role="menuitem"
              component="a"
              href="#horizontal-list"
            >
              {t("route.career")}
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              role="menuitem"
              component="a"
              href="#horizontal-list"
            >
              {t("route.links")}
            </ListItemButton>
          </ListItem>
          <ListItem>
            <LangSelector path={path} currentLang={lang} />
          </ListItem>
        </List>
      </Box>
    </header>
  );
};
