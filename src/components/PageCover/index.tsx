import {
  Box,
  Divider,
  Dropdown,
  Grid,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  Sheet,
} from "@mui/joy";
import type React from "react";
import {
  type Languages,
  defaultLang,
  languageEmojis,
  languageKeys,
  languageNames,
} from "../../i18n/ui";
import { Typography } from "../Typography";

type Props = {
  title: string;
  description?: string;
};

export const PageCover = ({ title, description }: Props) => (
  <Box
    sx={{
      textAlign: "center",
    }}
  >
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={12}>
        <Box
          height={{
            xs: "6rem",
            sm: "8rem",
            md: "10rem",
          }}
          sx={{
            alignContent: "center",
          }}
        >
          <Typography level="h1">{title}</Typography>
        </Box>
      </Grid>
    </Grid>
  </Box>
);
