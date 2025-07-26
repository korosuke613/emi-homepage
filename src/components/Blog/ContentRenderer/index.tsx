import { Box } from "@mui/joy";
import { parseHtmlWithMuiLinks } from "../../../i18n/utils";

type Props = {
  content: string;
};

export const ContentRenderer = ({ content }: Props) => {
  return (
    <Box
      sx={{
        "& p": {
          wordBreak: "break-all",
          textWrap: "auto",
        },
      }}
    >
      {parseHtmlWithMuiLinks(content)}
    </Box>
  );
};
