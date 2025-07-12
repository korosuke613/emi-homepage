import {
  AspectRatio,
  Box,
  Card,
  CardContent,
  Chip,
  Link,
  Typography,
  extendTheme,
} from "@mui/joy";

import type { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  cardImg?: string;
  svgIcon?: ReactNode;
  link?: string;
  tags: string[];
};

const theme = extendTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      md: 600,
      lg: 900,
      xl: 1200,
    },
  },
});

// Brand colors for different social platforms
const getBrandColor = (tags: string[]) => {
  const tag = tags[0]?.toLowerCase();
  switch (tag) {
    case "instagram":
      return {
        primary: "#E4405F",
        secondary: "#F77737",
        gradient: "linear-gradient(45deg, #F77737, #E4405F, #C13584)",
      };
    case "facebook":
      return {
        primary: "#1877F2",
        secondary: "#42A5F5",
        gradient: "linear-gradient(45deg, #42A5F5, #1877F2)",
      };
    case "portfolio":
      return {
        primary: "#9C27B0",
        secondary: "#BA68C8",
        gradient: "linear-gradient(45deg, #BA68C8, #9C27B0)",
      };
    default:
      return {
        primary: "#1976D2",
        secondary: "#42A5F5",
        gradient: "linear-gradient(45deg, #42A5F5, #1976D2)",
      };
  }
};

export const ServiceLinkCardMobile = ({
  title,
  description,
  cardImg,
  svgIcon,
  link = "#",
  tags,
}: Props) => {
  const brandColor = getBrandColor(tags);

  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: "90%",
        border: "2px solid",
        borderColor: "neutral.outlinedBorder",
        borderRadius: "16px",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
          borderColor: brandColor.primary,
          "& .social-icon": {
            background: brandColor.gradient,
            color: "white",
            transform: "scale(1.1)",
          },
          "& .social-title": {
            color: brandColor.primary,
          },
        },
      }}
    >
      {cardImg && (
        <AspectRatio
          ratio="1"
          sx={{
            minWidth: {
              xs: 50,
              sm: 90,
            },
          }}
        >
          <img src={cardImg} loading="lazy" alt="" />
        </AspectRatio>
      )}
      {svgIcon && (
        <Box
          className="social-icon"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: {
              xs: 50,
              sm: 70,
            },
            height: {
              xs: 50,
              sm: 70,
            },
            margin: {
              xs: "8px",
              sm: "12px",
            },
            borderRadius: "12px",
            background: "linear-gradient(45deg, #f5f5f5, #e0e0e0)",
            color: brandColor.primary,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "& svg": {
              fontSize: {
                xs: "1.5rem",
                sm: "2rem",
              },
            },
          }}
        >
          {svgIcon}
        </Box>
      )}
      <CardContent sx={{ padding: "12px 16px" }}>
        <Typography
          level="title-md"
          className="social-title"
          sx={{
            fontWeight: 600,
            fontSize: {
              xs: "0.875rem",
              sm: "1rem",
            },
            marginBottom: "4px",
            transition: "color 0.3s ease",
          }}
        >
          {title}
        </Typography>
        <Typography
          level="body-sm"
          sx={{
            fontSize: {
              xs: "0.75rem",
              sm: "0.875rem",
            },
            marginBottom: "8px",
          }}
        >
          <Link
            overlay
            underline="none"
            href={link}
            sx={{
              color: "text.tertiary",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              minHeight: "1.25rem",
              "&:hover": {
                color: brandColor.primary,
              },
            }}
          >
            {description}
          </Link>
        </Typography>
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "flex",
            },
          }}
        >
          {tags?.map((tag) => {
            return (
              <Chip
                key={tag}
                variant="soft"
                size="sm"
                sx={{
                  pointerEvents: "none",
                  backgroundColor: `${brandColor.primary}15`,
                  color: brandColor.primary,
                  fontWeight: 500,
                  fontSize: "0.75rem",
                }}
              >
                {tag.startsWith("#") ? tag : `＃${tag}`}
              </Chip>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};
