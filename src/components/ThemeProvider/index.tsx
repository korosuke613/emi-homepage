import { CssVarsProvider, extendTheme } from "@mui/joy";
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

// システムのダークモード設定を検出
const getSystemColorScheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

// ローカルストレージからテーマ設定を取得
const getStoredMode = (): ColorMode => {
  if (typeof window === "undefined") return "system";
  try {
    const stored = localStorage.getItem("color-mode") as ColorMode;
    return stored || "system";
  } catch {
    return "system";
  }
};

const theme = extendTheme({
  fontFamily: {
    body: fontFamily,
    display: fontFamily,
  },
  // ダークモード用の追加設定
  colorSchemes: {
    light: {
      // ライトモード固有の設定（必要に応じて追加）
    },
    dark: {
      // ダークモード固有の設定（必要に応じて追加）
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

const ThemeProviderInner = ({ children }: Props) => {
  const [mode, setModeState] = useState<ColorMode>("system");

  // 初期化時にストレージからモードを読み込み
  useEffect(() => {
    const storedMode = getStoredMode();
    setModeState(storedMode);
  }, []);

  // モード変更時にストレージに保存し、MUI Joy のカラースキームを設定
  const setMode = (newMode: ColorMode) => {
    setModeState(newMode);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("color-mode", newMode);
      } catch {
        // ストレージが利用できない場合は無視
      }
    }
  };

  // トグル機能（light -> dark -> system -> light の順）
  const toggleMode = () => {
    const modes: ColorMode[] = ["light", "dark", "system"];
    const currentIndex = modes.indexOf(mode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setMode(modes[nextIndex]);
  };

  // システムモードの場合の実際のカラースキーム計算
  const resolvedColorScheme = mode === "system" ? getSystemColorScheme() : mode;

  const value: ThemeContextType = {
    mode,
    setMode,
    toggleMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      <CssVarsProvider
        theme={theme}
        defaultMode={resolvedColorScheme}
        modeStorageKey="joy-mode"
      >
        {children}
      </CssVarsProvider>
    </ThemeContext.Provider>
  );
};

export const ThemeProvider = ({ children }: Props) => (
  <ThemeProviderInner>{children}</ThemeProviderInner>
);
