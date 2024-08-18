import { Grid } from "@mui/joy";
import type { ReactProps } from "../../utils/react";
import { ServiceLinkCard } from "./ServiceLinkCard";
import { ServiceLinkCardMobile } from "./ServiceLinkCardMobile";

type Props = {
  serviceLinkCard: ReactProps<typeof ServiceLinkCard>[];
};

export const ServiceLinkCards = ({ serviceLinkCard = [] }: Props) => (
  <>
    <Grid
      container
      spacing={2}
      maxWidth={1400}
      margin={"auto"}
      sx={{
        flexGrow: 1,
      }}
      marginBottom={"1rem"}
      display={{ xs: "none", sm: "flex" }}
    >
      {serviceLinkCard.map((card) => (
        <>
          <Grid
            key={card.title}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            textAlign={"left"}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <ServiceLinkCard key={card.title} {...card} />
          </Grid>
        </>
      ))}
    </Grid>

    <Grid
      container
      spacing={2}
      maxWidth={1400}
      margin={"auto"}
      sx={{
        flexGrow: 1,
      }}
      marginBottom={"1rem"}
      display={{ xs: "flex", sm: "none" }}
    >
      {serviceLinkCard.map((card) => (
        <>
          <Grid
            key={card.title}
            xs={12}
            textAlign={"left"}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <ServiceLinkCardMobile key={card.title} {...card} />
          </Grid>
        </>
      ))}
    </Grid>
  </>
);
