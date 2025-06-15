import type { Languages } from "../../../i18n/ui";
import { MinimalThemeProvider } from "../../MinimalThemeProvider";
import { LangSelector } from "./LangSelector";

type Props = {
  path: string;
  currentLang: Languages;
  open?: boolean;
};

export const LangSelectorWithTheme = (props: Props) => (
  <MinimalThemeProvider>
    <LangSelector {...props} />
  </MinimalThemeProvider>
);
