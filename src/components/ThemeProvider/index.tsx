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
      },
    },
    dark: {
      palette: {
        background: {
          body: "var(--joy-palette-common-black, #09090D)",
          surface: "var(--joy-palette-neutral-900, #171A1C)",
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

// MUI Joy の useColorScheme を使ってモード管理
const ThemeModeManager = ({ children }: { children: React.ReactNode }) => {
  const { mode, setMode } = useColorScheme();
  const [customMode, setCustomMode] = useState<ColorMode>("system");

  // MUI Joy のモードと同期
  useEffect(() => {
    if (mode) {
      setCustomMode(mode as ColorMode);
    }
  }, [mode]);

  // カスタムモード設定
  const setCustomModeWithSync = (newMode: ColorMode) => {
    setCustomMode(newMode);
    setMode(newMode);
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
