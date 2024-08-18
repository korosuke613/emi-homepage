import { Grid } from "@mui/joy";
import type { ReactProps } from "../../../utils/react";
import { ServiceLinkCardMobile } from "../../ServiceLinkCards/ServiceLinkCardMobile";

type Props = {
  socialLinks: ReactProps<typeof ServiceLinkCardMobile>[];
};

export const SocialNetworksTemplate = ({ socialLinks }: Props) => (
  <Grid
    container
    spacing={2}
    maxWidth={1400}
    margin={"auto"}
    sx={{
      flexGrow: 1,
    }}
    marginBottom={"1rem"}
  >
    {socialLinks.map((card) => (
      <>
        <Grid
          key={card.title}
          xs={12}
          sm={6}
          md={4}
          textAlign={"left"}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <ServiceLinkCardMobile key={card.title} {...card} />
        </Grid>
      </>
    ))}
  </Grid>
);
