import { Paper } from "@mui/material";
import { styled } from "@mui/system";
import { ColorsEnum } from "common/theme";

const widthSettings = {
  width: "100%",
  maxWidth: 800,
};
export const SearchWrapper = styled("form")(({ theme }) => ({
  ...widthSettings,
  display: "flex",
  alignItems: "center",
  border: `1px solid ${ColorsEnum.coolgray6}`,
}));

export const ResultsWrapper = styled(Paper)(({ theme }) => ({
  ...widthSettings,
  zIndex: 10,
  height: 300,
  overflowY: 'scroll',
  position: "absolute",
}));
