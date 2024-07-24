import type React from "react";
import type { ReactProps } from "../../utils/react";
import { Header } from "../Header";
import { PageCover } from "../PageCover";

type Props = {
  headerProp: ReactProps<typeof Header>;
  pageCoverProp: ReactProps<typeof PageCover>;
  children?: React.ReactNode;
};

export const Page = ({ headerProp, pageCoverProp, children }: Props) => (
  <>
    <Header {...headerProp} />
    <main>
      <PageCover {...pageCoverProp} />
      {children}
    </main>
    {/* TODO: footer */}
  </>
);
