import { Box, Grid } from "@mui/joy";
import { Typography } from "../../Typography";

type Props = {
  title: string;
  description?: string;
};

export const PageCover = ({ title }: Props) => (
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
