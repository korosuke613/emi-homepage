import { Box } from "@mui/joy";
import type { ReactProps } from "../../../utils/react";
import { IconCard } from "../../IconCard";

type Props = {
  socialLinks: ReactProps<typeof IconCard>[];
};

export const SocialNetworksTemplate = ({ socialLinks }: Props) => (
  <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center" }}>
    {socialLinks.map((card) => (
      <Box key={card.link} sx={{ display: "flex", justifyContent: "center" }}>
        <IconCard {...card} />
      </Box>
    ))}
  </Box>
);
