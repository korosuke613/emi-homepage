import {
  AspectRatio,
  Box,
  Card,
  CardContent,
  CardOverflow,
  Chip,
  Divider,
  Link,
  Typography,
} from "@mui/joy";

type Props = {
  title: string;
  description?: string;
  cardImg: string;
  tags: string[];
};

export const ServiceLinkCardMobile = ({
  title,
  description,
  cardImg,
  tags,
}: Props) => (
  <>
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
      <AspectRatio ratio="1" sx={{ width: 90 }}>
        <img src={cardImg} loading="lazy" alt="" />
      </AspectRatio>
      <CardContent>
        <Typography level="title-lg" id="card-description">
          {title}
        </Typography>
        <Typography level="body-sm" aria-describedby="card-description" mb={1}>
          <Link
            overlay
            underline="none"
            href="#interactive-card"
            sx={{ color: "text.tertiary" }}
          >
            {description}
          </Link>
        </Typography>
        <Box>
          {tags?.map((tag) => {
            return (
              <Chip
                key={tag}
                variant="outlined"
                size="sm"
                sx={{ pointerEvents: "none" }}
              >
                {tag.startsWith("#") ? tag : `＃${tag}`}
              </Chip>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  </>
);
