import { styled } from "@mui/material/styles";
import { ColorsEnum } from "common/theme";

type StyledButtonProps = {
  buttonType: "primary" | "secondary";
};

export const StyledButton = styled("button")<StyledButtonProps>(
  ({ theme, buttonType }) => ({
    backgroundColor:
      buttonType === "primary" ? ColorsEnum.darkGreen : ColorsEnum.warmgray2,
    color: ColorsEnum.white,
    fontWeight: "bold",
    border: "none",
    padding: `3px 10px`,
    borderRadius: 2,
    "&:hover": {
      cursor: "pointer",
    },
  })
);
