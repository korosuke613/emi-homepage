import { CssVarsProvider, extendTheme } from "@mui/joy";

// フォントはLayout.astroでpreloadされ、ここで最適化されたCSSを読み込み
// 本番環境のみフォント読み込み（開発時高速化のため）
// font-display: swap を使用した最適化版を使用
if (import.meta.env.PROD || import.meta.env.PUBLIC_PRODUCTION) {
  import("../../styles/fonts-optimized.css");
}

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
  : '"Noto Serif JP", "Times New Roman", serif';

const theme = extendTheme({
  fontFamily: {
    body: fontFamily,
    display: fontFamily,
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

export const ThemeProvider = ({ children }: Props) => (
  <CssVarsProvider theme={theme}>{children}</CssVarsProvider>
);
