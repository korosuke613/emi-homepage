import { AspectRatio, Box, Grid, Table } from "@mui/joy";
import type { Languages } from "../../../i18n/ui";
import {
  useContentTranslations,
  useContentTranslationsWithElement,
} from "../../../i18n/utils";
import { Typography } from "../../Typography";

type Props = {
  lang: Languages;
};

export const About = ({ lang }: Props) => {
  const content = useContentTranslations(lang);
  const contentWithElement = useContentTranslationsWithElement(lang);

  return (
    <>
      <Grid
        container
        spacing={{
          xs: 2,
          sm: 4,
        }}
        maxWidth={1400}
        margin={"auto"}
        sx={{
          flexGrow: 1,
        }}
        marginBottom={"1rem"}
      >
        <Grid xs={12} textAlign={"left"}>
          <Typography level="h2">{content.about("About")}</Typography>
        </Grid>
        <Grid xs={12} textAlign={"left"}>
          <Typography level="body-md">
            {contentWithElement.about("profile_description")}
          </Typography>
        </Grid>
        <Grid
          xs={12}
          sm={3}
          lg={2}
          textAlign={"left"}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <AspectRatio
            variant="plain"
            ratio="1"
            sx={{ width: { xs: "40%", sm: "100%" } }}
          >
            <Box component="img" src="/about.jpg" loading="lazy" alt="" />
          </AspectRatio>
        </Grid>
        <Grid xs={12} sm={9} lg={10}>
          <Table>
            <tbody>
              {[
                {
                  key: content.about("名称"),
                  value: content.about("牧浦 えみ（まきうら えみ）"),
                },
                {
                  key: content.about("所在地"),
                  value: content.about("ラオス人民民主共和国　ビエンチャン"),
                },
                {
                  key: content.about("お問い合わせ"),
                  value: content.about("考え中"),
                },
                {
                  key: content.about("事業内容"),
                  value: content.about("障害者就労継続支援、デジタル絵制作(SNSアイコン、名刺、商品パッケージ)、アナログ絵(デッサン全般)、英語教師"),
                },
              ].map((row) => (
                <tr key={row.key}>
                  <Box
                    component="td"
                    sx={{
                      height: "auto",
                      width: {
                        xs: "30%",
                        sm: "20%",
                        md: "15%",
                      },
                      alignContent: "center",
                    }}
                  >
                    <Typography level="body-md" fontWeight={"lg"}>
                      {row.key}:
                    </Typography>
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      width: {
                        xs: "70%",
                        sm: "75%",
                        md: "80%",
                      },
                      height: "auto",
                      alignContent: "center",
                    }}
                  >
                    <Typography level="body-md">{row.value}</Typography>
                  </Box>
                </tr>
              ))}
            </tbody>
          </Table>
        </Grid>
      </Grid>
    </>
  );
};
