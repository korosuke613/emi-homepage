import { CssVarsProvider, extendTheme } from "@mui/joy";
import type { Languages } from "../../../i18n/ui";
import { MobileMenu } from "./MobileMenu";

// フォント設定
const isDevelopment = typeof window !== 'undefined' && 
  !import.meta.env.PROD && !import.meta.env.PUBLIC_PRODUCTION;
const fontFamily = isDevelopment
  ? '"Times New Roman", "Times", "Georgia", serif'
  : '"Noto Serif JP", "Times New Roman", serif';

// 最小限のテーマ設定
const theme = extendTheme({
  fontFamily: {
    body: fontFamily,
    display: fontFamily,
  },
});

type Props = {
  lang: Languages;
  keepOpen?: boolean;
  currentPathWithoutLang: string;
};

export const MobileMenuWithTheme = (props: Props) => (
  <CssVarsProvider theme={theme}>
    <MobileMenu {...props} />
  </CssVarsProvider>
);