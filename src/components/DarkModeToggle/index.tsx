import { IconButton, Tooltip } from "@mui/joy";
import { MdDarkMode, MdLightMode, MdSettingsBrightness } from "react-icons/md";

import { useThemeMode } from "../ThemeProvider";

const icons = {
  light: <MdLightMode />,
  dark: <MdDarkMode />,
  system: <MdSettingsBrightness />,
};

const tooltipTexts = {
  light: "ライトモード",
  dark: "ダークモード",
  system: "システム設定に従う",
};

type Props = {
  size?: "sm" | "md" | "lg";
  variant?: "plain" | "outlined" | "soft" | "solid";
};

export const DarkModeToggle = ({ size = "sm", variant = "plain" }: Props) => {
  const { mode, toggleMode } = useThemeMode();

  return (
    <Tooltip title={tooltipTexts[mode]} placement="bottom">
      <IconButton
        size={size}
        variant={variant}
        onClick={toggleMode}
        aria-label={`現在のテーマモード: ${tooltipTexts[mode]}`}
        sx={{
          color: "neutral.500",
          "&:hover": {
            color: "neutral.700",
            backgroundColor: "neutral.100",
          },
          transition: "all 0.2s ease",
        }}
      >
        {icons[mode]}
      </IconButton>
    </Tooltip>
  );
};
