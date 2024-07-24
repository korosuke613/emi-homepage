import type { TypographyTypeMap } from "@mui/joy";
import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from ".";

const metaData: Meta = {
  title: "Typography",
  component: Typography,
};

export default metaData;

const levels: TypographyTypeMap["props"]["level"][] = [
  "h1",
  "h2",
  "h3",
  "h4",
  "title-lg",
  "title-md",
  "title-sm",
  "body-lg",
  "body-md",
  "body-sm",
  "inherit",
] as const;

export const Default: StoryObj<typeof Typography> = {
  args: {
    children: "Hello World",
  },
  render: (args) => (
    <>
      {levels.map((level) => (
        <Typography key={level} level={level}>
          {level}: {args.children}
        </Typography>
      ))}
    </>
  ),
};
