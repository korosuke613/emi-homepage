import {
  AspectRatio,
  Box,
  Card,
  CardContent,
  Chip,
  Link,
  Typography,
} from "@mui/joy";

import type { ReactNode } from "react";
import { MinimalThemeProvider } from "../../MinimalThemeProvider";

type Props = {
  title: string;
  description?: string;
  cardImg?: string;
  svgIcon?: ReactNode;
  link?: string;
  tags: string[];
};

export const ServiceLinkCardMobile = ({
  title,
  description,
  cardImg,
  svgIcon,
  link = "#",
  tags,
}: Props) => (
  <MinimalThemeProvider>
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: "90%",
        "&:hover": {
          boxShadow: "md",
          borderColor: "neutral.outlinedHoverBorder",
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
      {svgIcon && svgIcon}
      <CardContent>
        <Typography level="title-md" id="card-description">
          {title}
        </Typography>
        <Typography level="body-sm" aria-describedby="card-description">
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
                variant="outlined"
                size="sm"
                sx={{
                  pointerEvents: "none",
                }}
              >
                {tag.startsWith("#") ? tag : `＃${tag}`}
              </Chip>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  </MinimalThemeProvider>
);
