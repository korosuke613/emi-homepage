import { Typography as TypographyBase, type TypographyTypeMap } from "@mui/joy";
import type { ReactNode } from "react";

type Props = {
  level?: TypographyTypeMap["props"]["level"];
  children: ReactNode;
};

export const Typography = ({
  level,
  children,
  ...props
}: Props & TypographyTypeMap["props"]) => (
  <TypographyBase level={level} {...props}>
    {children}
  </TypographyBase>
);
