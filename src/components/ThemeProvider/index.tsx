import { CssVarsProvider, extendTheme, useColorScheme } from "@mui/joy";
import { createContext, useContext, useEffect, useState } from "react";

// フォントはLayout.astroでpreloadされ、@font-face定義も直接Layout.astroに含まれる
// 本番環境のみフォント読み込み（開発時高速化のため）
// font-display: swap を使用した最適化版を使用

const fontSize = {
  "1": "0.625rem",
  "2": "0.75rem",
  "3": "0.8125rem",
  "4": "0.875rem",
  "5": "1rem",
  "6": "1.125rem",
  "7": "1.25rem",
  "8": "1.5rem",
  "9": "1.75rem",
  "10": "2rem",
  "11": "2.625rem",
  "12": "3rem",
};

// 開発環境ではシステムセリフフォントを優先してFOUCを防止
const isDevelopment =
  !import.meta.env.PROD && !import.meta.env.PUBLIC_PRODUCTION;
const fontFamily = isDevelopment
  ? '"Times New Roman", "Times", "Georgia", serif'
  : '"Noto Serif JP", "Times New Roman", "Times", "Georgia", serif';

// テーマモードコンテキスト
type ColorMode = "light" | "dark" | "system";

interface ThemeContextType {
  mode: ColorMode;
  setMode: (mode: ColorMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeMode must be used within a ThemeProvider");
  }
  return context;
};

const theme = extendTheme({
  fontFamily: {
    body: fontFamily,
    display: fontFamily,
  },
  // MUI Joy のデフォルトダークモードカラーを使用
  colorSchemes: {
    light: {
      palette: {
        background: {
          body: "var(--joy-palette-common-white, #FFF)",
          surface: "var(--joy-palette-neutral-50, #F7F7F8)",
        },
        primary: {
          // Links and primary elements in light mode
          50: "#E3F2FD",
          100: "#BBDEFB",
          200: "#90CAF9",
          300: "#64B5F6",
          400: "#42A5F5",
          500: "#1976D2", // Default MUI blue for light mode
          600: "#1565C0",
          700: "#0D47A1",
          800: "#0A3D91",
          900: "#072F72",
          // Visited link color for light mode - distinguishable purple
          // visited: "#7C3AED", // RGB(124,58,237) - purple for visited links
        },
      },
    },
    dark: {
      palette: {
        background: {
          body: "#22282F", // RGB(34,40,47) - softer dark background
          surface: "#2A3038", // Slightly lighter surface for contrast
        },
        primary: {
          // Links and primary elements in dark mode - better contrast and visibility
          50: "#EDF4FF",
          100: "#DBE7FF",
          200: "#BED3FF",
          300: "#91B5FF",
          400: "#6B9AFF",
          500: "#8BC5FF", // RGB(139,197,255) - even brighter blue for better visibility in dark mode
          600: "#5A9AFF",
          700: "#4A84E6",
          800: "#3B6DB8",
          900: "#2D5490",
          // Visited link color for dark mode - distinguishable purple/lavender
          // visited: "#B19CD9", // RGB(177,156,217) - soft purple for visited links
        },
        text: {
          primary: "#E8EAED", // Softer white text for better readability
          secondary: "#BDC1C6", // Muted text color
        },
      },
    },
  },
});

theme.typography.h1 = {
  ...theme.typography.h1,
  fontSize: fontSize[12],
  [theme.breakpoints.only("sm")]: {
    fontSize: fontSize[11],
  },
  [theme.breakpoints.only("xs")]: {
    fontSize: fontSize[9],
  },
};

theme.typography.h2 = {
  ...theme.typography.h2,
  fontSize: fontSize[10],
  [theme.breakpoints.only("sm")]: {
    fontSize: fontSize[9],
  },
  [theme.breakpoints.only("xs")]: {
    fontSize: fontSize[8],
  },
};

theme.typography.h3 = {
  ...theme.typography.h3,
  fontSize: fontSize[9],
  [theme.breakpoints.only("sm")]: {
    fontSize: fontSize[8],
  },
  [theme.breakpoints.only("xs")]: {
    fontSize: fontSize[7],
  },
};

theme.typography.h4 = {
  ...theme.typography.h4,
  fontSize: fontSize[8],
  [theme.breakpoints.only("sm")]: {
    fontSize: fontSize[7],
  },
  [theme.breakpoints.only("xs")]: {
    fontSize: fontSize[6],
  },
};

theme.typography["body-md"] = {
  ...theme.typography["body-md"],
  fontSize: fontSize[5],
  [theme.breakpoints.only("sm")]: {
    fontSize: fontSize[4],
  },
  [theme.breakpoints.only("xs")]: {
    fontSize: fontSize[3],
  },
};

type Props = {
  children: React.ReactNode;
};

// MUI Joy の color scheme を使った実装
const ThemeProviderInner = ({ children }: Props) => {
  return (
    <CssVarsProvider
      theme={theme}
      defaultMode="system"
      modeStorageKey="joy-color-scheme"
    >
      <ThemeModeManager>{children}</ThemeModeManager>
    </CssVarsProvider>
  );
};

// CSS Custom Properties を即座に更新する関数
const applyThemeToDOM = (resolvedMode: "light" | "dark") => {
  const root = document.documentElement;

  if (resolvedMode === "dark") {
    // ダークモードのCSS variables を即座に適用
    root.style.backgroundColor = "#22282F";
    root.style.setProperty("--joy-palette-background-body", "#22282F");
    root.style.setProperty("--joy-palette-background-surface", "#2A3038");
    root.style.setProperty("--joy-palette-text-primary", "#E8EAED");
    root.style.setProperty("--joy-palette-text-secondary", "#BDC1C6");
    root.style.setProperty("--joy-palette-primary-500", "#8BC5FF");
    root.style.setProperty("--joy-palette-primary-visited", "#B19CD9");
    root.setAttribute("data-joy-color-scheme", "dark");
    root.setAttribute("data-color-scheme", "dark");
  } else {
    // ライトモードのCSS variables を即座に適用
    root.style.backgroundColor = "#FFFFFF";
    root.style.setProperty("--joy-palette-background-body", "#FFFFFF");
    root.style.setProperty("--joy-palette-background-surface", "#F7F7F8");
    root.style.setProperty("--joy-palette-text-primary", "rgba(25, 25, 25, 1)");
    root.style.setProperty(
      "--joy-palette-text-secondary",
      "rgba(25, 25, 25, 0.6)",
    );
    root.style.setProperty(
      "--joy-palette-primary-500",
      "rgba(25, 118, 210, 1)",
    );
    root.style.setProperty("--joy-palette-primary-visited", "#7C3AED");
    root.setAttribute("data-joy-color-scheme", "light");
    root.setAttribute("data-color-scheme", "light");
  }
};

// MUI Joy の useColorScheme を使ってモード管理
const ThemeModeManager = ({ children }: { children: React.ReactNode }) => {
  const { mode, setMode, systemMode } = useColorScheme();
  const [customMode, setCustomMode] = useState<ColorMode>("system");

  // MUI Joy のモードと同期
  useEffect(() => {
    if (mode) {
      setCustomMode(mode as ColorMode);
    }
  }, [mode]);

  // システムモードまたはカスタムモード変更時にDOMを即座に更新
  useEffect(() => {
    if (customMode === "system") {
      const resolvedMode =
        systemMode ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light");
      applyThemeToDOM(resolvedMode);
    } else if (customMode === "light" || customMode === "dark") {
      applyThemeToDOM(customMode);
    }
  }, [customMode, systemMode]);

  // カスタムモード設定
  const setCustomModeWithSync = (newMode: ColorMode) => {
    setCustomMode(newMode);
    setMode(newMode);

    // 実際に適用されるテーマを計算して即座にDOMに適用
    let resolvedMode: "light" | "dark";
    if (newMode === "system") {
      resolvedMode =
        systemMode ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light");
    } else {
      resolvedMode = newMode as "light" | "dark";
    }

    applyThemeToDOM(resolvedMode);
  };

  // トグル機能（light -> dark -> system -> light の順）
  const toggleMode = () => {
    const modes: ColorMode[] = ["light", "dark", "system"];
    const currentIndex = modes.indexOf(customMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setCustomModeWithSync(modes[nextIndex]);
  };

  const value: ThemeContextType = {
    mode: customMode,
    setMode: setCustomModeWithSync,
    toggleMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const ThemeProvider = ({ children }: Props) => (
  <ThemeProviderInner>{children}</ThemeProviderInner>
);
