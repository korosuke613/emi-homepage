import { AspectRatio, Box, Grid, Table } from "@mui/joy";
import type { Languages } from "../../../i18n/ui";
import {
  useLocalTranslations,
  useLocalTranslationsWithElement,
} from "../../../i18n/utils";
import { Typography } from "../../Typography";

type Props = {
  lang: Languages;
};

export const About = ({ lang }: Props) => {
  const tl = useLocalTranslations(lang);
  const tle = useLocalTranslationsWithElement(lang);

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
          <Typography level="h2">About</Typography>
        </Grid>
        <Grid xs={12} textAlign={"left"}>
          <Typography level="body-md">
            {tle({
              dict: {
                ja: `障害者施設をメインに、ラオスにての英語教師、リモートで日本の会社の広報、個人でイラストレーターをしております。<br />
2022年新卒で株式会社staraにて障害者の就労支援を始める。<br />
2023年から2年間SNSアイコン作成やブログの挿絵などのイラストレーター業務を行う。<br />
2025年よりJICA海外協力隊でラオスで英語教師として在任中。<br />`,
                en: `I am an English teacher in Laos, a remote PR person for a Japanese company, and a private illustrator, mainly at a facility for the disabled.<br />
In 2022, he graduated from stara Inc. and started working as an employment support for people with disabilities.<br />
From 2023, I worked as an illustrator for 2 years, creating SNS icons and illustrations for blogs.<br />
From 2025, he is currently serving as an English teacher in Laos with JICA Overseas Cooperation Volunteers.<br />`,
                lo: `ຂ້ອຍເປັນຄູສອນພາສາອັງກິດຢູ່ລາວ, ເປັນພະນັກງານ PR ທາງໄກຂອງບໍລິສັດຍີ່ປຸ່ນ, ແລະເປັນນັກແຕ້ມຮູບສ່ວນຕົວ, ຫຼັກແມ່ນຢູ່ສຳນັກງານພິການ.<br />
ໃນປີ 2022, ລາວໄດ້ຈົບການສຶກສາຈາກ stara Inc. ແລະເລີ່ມເຮັດວຽກສະໜັບສະໜູນການຈ້າງງານຄົນພິການ.<br />
ຕັ້ງແຕ່ປີ 2023, ຂ້ອຍໄດ້ເຮັດວຽກເປັນນັກແຕ້ມຮູບເປັນເວລາ 2 ປີ, ສ້າງໄອຄອນ SNS ແລະຮູບປະກອບບລອກ.<br />
ຕັ້ງແຕ່ປີ 2025, ລາວປັດຈຸບັນກຳລັງປະຈຳການເປັນຄູສອນພາສາອັງກິດຢູ່ລາວກັບ JICA ອາສາສະໝັກຮ່ວມມືຕ່າງປະເທດ.<br />`,
              },
            })}
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
                  key: tl({
                    ja: "名称",
                    en: "Name",
                    lo: "ຊື່",
                  }),
                  value: tl({
                    ja: "牧浦 えみ（まきうら えみ）",
                    en: "Emi  Makiura (Amy)",
                    lo: "ມາກິອູຣະ ເອມີ (Amy)",
                  }),
                },
                {
                  key: tl({
                    ja: "所在地",
                    en: "Location",
                    lo: "ທີ່ຕັ້ງ",
                  }),
                  value: tl({
                    ja: "ラオス人民民主共和国　ビエンチャン",
                    en: "Vientiane, Lao People's Democratic Republic",
                    lo: "ນະຄອນຫຼວງວຽງຈັນ, ສາທາລະນະລັດປະຊາທິປະໄຕປະຊາຊົນລາວ",
                  }),
                },
                {
                  key: tl({
                    ja: "お問い合わせ",
                    en: "Contact",
                    lo: "ຕິດຕໍ່",
                  }),
                  value: tl({
                    ja: "考え中",
                    en: "TBD",
                    lo: "ກຳລັງພິຈາລະນາ",
                  }),
                },
                {
                  key: tl({
                    ja: "事業内容",
                    en: "Business Activities",
                    lo: "ກິດຈະກຳທຸລະກິດ",
                  }),
                  value: tl({
                    ja: "障害者就労継続支援、デジタル絵制作(SNSアイコン、名刺、商品パッケージ)、アナログ絵(デッサン全般)、英語教師",
                    en: "Continuous employment support for people with disabilities, digital picture production (SNS icons, business cards, product packaging), analog pictures (general sketching), English teacher",
                    lo: "ການສະໜັບສະໜູນການຈ້າງງານຕໍ່ເນື່ອງສຳລັບຄົນພິການ, ການຜະລິດຮູບແບບດິຈິຕອນ (ໄອຄອນ SNS, ນາມບັດ, ບັນຈຸສິນຄ້າ), ຮູບແບບອະນາລອກ (ການແຕ້ມຮູບທົ່ວໄປ), ຄູສອນພາສາອັງກິດ",
                  }),
                },
              ].map((row) => (
                <>
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
                </>
              ))}
            </tbody>
          </Table>
        </Grid>
      </Grid>
    </>
  );
};
