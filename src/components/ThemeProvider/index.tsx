import { CssVarsProvider, extendTheme } from "@mui/joy";

// Webフォントを削除し、システムフォントのみを使用

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

// システムセリフフォントのみを使用（フォント遅延ロード問題を解決）
const fontFamily = '"Times New Roman", "Times", "Georgia", serif';

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
