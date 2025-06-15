import {
  AspectRatio,
  Box,
  Card,
  CardContent,
  CardOverflow,
  Divider,
  Link,
  Typography,
} from "@mui/joy";

type Props = {
  title: string;
  description?: string;
  cardImg: string;
  link?: string;
  tags: string[];
};

export const ServiceLinkCard = ({
  title,
  description,
  cardImg,
  link = "#",
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
          href={link}
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
            <div key={tag} style={{ display: "contents" }}>
              <Typography
                level="body-xs"
                fontWeight="sm"
                textColor="text.secondary"
              >
                {tag.startsWith("#") ? tag : `＃${tag}`}
              </Typography>
              {index !== tags.length - 1 && <Divider orientation="vertical" />}
            </div>
          );
        })}
      </CardContent>
    </CardOverflow>
  </Card>
);
