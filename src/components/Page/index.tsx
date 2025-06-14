import type React from "react";
import type { ReactProps } from "../../utils/react";
import { ThemeProvider } from "../ThemeProvider";
import { Header } from "./Header";
import { PageCover } from "./PageCover";

type Props = {
  headerProp: ReactProps<typeof Header>;
  pageCoverProp: ReactProps<typeof PageCover>;
  children?: React.ReactNode;
};

export const Page = ({ headerProp, pageCoverProp, children }: Props) => (
  <ThemeProvider>
    <Header {...headerProp} />
    <main>
      <PageCover {...pageCoverProp} />
      {children}
    </main>
    {/* TODO: footer */}
  </ThemeProvider>
);
