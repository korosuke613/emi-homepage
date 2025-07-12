import { Box, Link } from "@mui/joy";

import type { ReactNode } from "react";

type Props = {
  svgIcon: ReactNode;
  link: string;
  color?: {
    primary: string;
    secondary: string;
    gradient: string;
  };
};

export const IconCard = ({
  svgIcon,
  link = "#",
  color = {
    primary: "#1976D2",
    secondary: "#42A5F5",
    gradient: "linear-gradient(45deg, #42A5F5, #1976D2)",
  },
}: Props) => {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        border: "2px solid",
        borderColor: "neutral.outlinedBorder",
        borderRadius: "12px",
        padding: "0px",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
          borderColor: color.primary,
          "& .social-icon": {
            background: color.gradient,
            color: "white",
            transform: "scale(1.1)",
          },
          "& .social-title": {
            color: color.primary,
          },
        },
      }}
    >
      <Box
        className="social-icon"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: {
            xs: 30,
            sm: 35,
          },
          height: {
            xs: 30,
            sm: 35,
          },
          borderRadius: "12px",
          color: color.primary,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "& svg": {
            fontSize: {
              xs: "1.5rem",
            },
          },
        }}
      >
        {svgIcon}
      </Box>
    </Link>
  );
};
