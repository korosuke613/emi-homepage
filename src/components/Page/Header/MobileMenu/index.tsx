import { MoreVert } from "@mui/icons-material";
import {
  Box,
  Dropdown,
  Link,
  ListDivider,
  Menu,
  MenuButton,
  MenuItem,
} from "@mui/joy";

import { type Languages, defaultLang, type ui } from "../../../../i18n/ui";
import {
  getRoutePathWithLang,
  isUIKey,
  useLocalTranslations,
  useLocalTranslationsWithElement,
  useSharedTranslations,
} from "../../../../i18n/utils";
import { STATIC_ROUTES } from "../../../../utils/staticRoute";

type Props = {
  lang: Languages;
  keepOpen?: boolean;
  selectedItem?: string;
  currentPathWithoutLang?: string;
};

export const MobileMenu = ({
  lang,
  keepOpen = false,
  currentPathWithoutLang = "/",
}: Props) => {
  const t = useSharedTranslations(lang);
  const tl = useLocalTranslations(lang);
  const TLE = useLocalTranslationsWithElement(lang);

  return (
    <Dropdown>
      <MenuButton
        variant="plain"
        sx={{
          padding: "unset",
          width: "48px",
          height: "48px",
          borderRadius: "0%",
        }}
      >
        <MoreVert />
      </MenuButton>
      <Menu
        placement="bottom-end"
        size="lg"
        variant="plain"
        sx={{
          width: "100%",
          boxShadow: "none",
        }}
        {...(keepOpen ? { open: keepOpen } : {})} // open が渡された場合のみ open を設定
      >
        <ListDivider />
        {STATIC_ROUTES.map((route) => {
          const uiKey = `route.${route}`;
          const routePath = getRoutePathWithLang(route, lang);
          if (isUIKey(lang, uiKey)) {
            return (
              <Box
                component="a"
                href={routePath}
                sx={{
                  textDecoration: "none",
                }}
              >
                <MenuItem
                  key={route}
                  selected={currentPathWithoutLang === `/${route}`}
                  href={routePath}
                >
                  {t(uiKey)}
                </MenuItem>
              </Box>
            );
          }
          console.error(`[MobileMenu] route is not found: ${name}`);
          return null;
        })}
        <ListDivider />
      </Menu>
    </Dropdown>
  );
};
