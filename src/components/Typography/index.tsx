import { Typography as TypographyBase, type TypographyTypeMap } from "@mui/joy";

type Props = {
  level?: TypographyTypeMap["props"]["level"];
  children: React.ReactNode;
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
