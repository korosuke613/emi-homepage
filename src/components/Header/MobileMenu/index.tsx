import { MoreVert } from "@mui/icons-material";
import {
  Dropdown,
  Link,
  ListDivider,
  Menu,
  MenuButton,
  MenuItem,
} from "@mui/joy";

import { type Languages, defaultLang, type ui } from "../../../i18n/ui";
import {
  isUIKey,
  useLocalTranslations,
  useLocalTranslationsWithElement,
  useSharedTranslations,
} from "../../../i18n/utils";
import type { StaticRoutes } from "../../../utils/staticRoute";

type Props = {
  lang: Languages;
  routes: StaticRoutes;
  keepOpen?: boolean;
  selectedItem?: string;
};

export const MobileMenu = ({
  lang,
  keepOpen = false,
  selectedItem,
  routes,
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
        {routes.map(({ name, path }) => {
          const uiKey = `route.${name}`;
          if (isUIKey(lang, uiKey)) {
            return (
              <MenuItem key={name} selected={selectedItem === name}>
                <Link
                  underline="none"
                  color="neutral"
                  href={path}
                  textColor={"common.black"}
                >
                  {t(uiKey)}
                </Link>
              </MenuItem>
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
