import { CssVarsProvider, extendTheme } from "@mui/joy";
import type { ReactNode } from "react";
import { getFontFamily } from "../../utils/theme";

type Props = {
  children: ReactNode;
};

// 最小限のテーマを直接作成
const createMinimalTheme = () =>
  extendTheme({
    fontFamily: {
      body: getFontFamily(),
      display: getFontFamily(),
    },
  });

// 最小限のテーマプロバイダー
export const MinimalThemeProvider = ({ children }: Props) => {
  const theme = createMinimalTheme();

  return <CssVarsProvider theme={theme}>{children}</CssVarsProvider>;
};
