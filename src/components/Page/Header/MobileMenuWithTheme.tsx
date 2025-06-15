import type { Languages } from "../../../i18n/ui";
import { MinimalThemeProvider } from "../../MinimalThemeProvider";
import { MobileMenu } from "./MobileMenu";

type Props = {
  lang: Languages;
  keepOpen?: boolean;
  currentPathWithoutLang: string;
};

export const MobileMenuWithTheme = (props: Props) => (
  <MinimalThemeProvider>
    <MobileMenu {...props} />
  </MinimalThemeProvider>
);
