import { styled } from "@mui/system";

export const AboutWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  overflowY: "scroll",
  "&::-webkit-scrollbar": { display: "none" },
}));
