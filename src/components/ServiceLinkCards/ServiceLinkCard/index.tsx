import {
  AspectRatio,
  Box,
  Card,
  CardContent,
  CardOverflow,
  Divider,
  Link,
  Typography,
  type CardTypeMap,
} from "@mui/joy";
import type { ReactProps } from "../../../utils/react";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

type Props = {
  title: string;
  description?: string;
  cardImg: string;
  tags: string[];
};

export const ServiceLinkCard = ({
  title,
  description,
  cardImg,
  tags,
}: Props) => (
  <Card
    variant="outlined"
    sx={{
      width: "100%",
      maxWidth: "360px",
      "&:hover": {
        boxShadow: "md",
        borderColor: "neutral.outlinedHoverBorder",
      },
    }}
  >
    <CardOverflow>
      <AspectRatio ratio="2">
        <Box component="img" src={cardImg} loading="lazy" alt="" />
      </AspectRatio>
    </CardOverflow>
    <CardContent>
      <Typography level="title-md">{title}</Typography>
      <Typography
        level="body-sm"
        aria-describedby="card-description"
        mb={1}
        height={"2.5rem"}
      >
        <Link
          overlay
          underline="none"
          href="#interactive-card"
          sx={{ color: "text.tertiary" }}
        >
          {description}
        </Link>
      </Typography>
    </CardContent>
    <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
      <Divider inset="context" />
      <CardContent orientation="horizontal">
        {tags?.map((tag, index) => {
          return (
            <>
              <Typography
                key={tag}
                level="body-xs"
                fontWeight="sm"
                textColor="text.secondary"
              >
                {tag.startsWith("#") ? tag : `＃${tag}`}
              </Typography>
              {index !== tags.length - 1 && <Divider orientation="vertical" />}
            </>
          );
        })}
      </CardContent>
    </CardOverflow>
  </Card>
);
