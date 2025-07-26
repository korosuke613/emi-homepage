import { DarkMode, LightMode, SettingsBrightness } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/joy";
import type { Languages } from "../../i18n/ui";
import { useSharedTranslations } from "../../i18n/utils";
import { useThemeMode } from "../ThemeProvider";

type Props = {
  lang: Languages;
};

export const DarkModeToggle = ({ lang }: Props) => {
  const { mode, toggleMode } = useThemeMode();
  const t = useSharedTranslations(lang);

  const icons = {
    light: <LightMode />,
    dark: <DarkMode />,
    system: <SettingsBrightness />,
  };

  const tooltipTexts = {
    light: t("theme.light"),
    dark: t("theme.dark"),
    system: t("theme.system"),
  };

  return (
    <Tooltip title={tooltipTexts[mode]} arrow>
      <IconButton
        variant="outlined"
        color="neutral"
        onClick={toggleMode}
        aria-label={tooltipTexts[mode]}
        sx={{
          height: "50px",
          width: "50px",
        }}
      >
        {icons[mode]}
      </IconButton>
    </Tooltip>
  );
};
