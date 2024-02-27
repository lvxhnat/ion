import React from "react";
import * as S from "../style";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "common/constant";

export default function AboutButton() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  return (
    <S.StyledMenuButton
      disableRipple
      disableFocusRipple
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        navigate(ROUTES.ABOUT);
        setAnchorEl(event.currentTarget);
      }}
    >
      <Typography variant="h3">About</Typography>
    </S.StyledMenuButton>
  );
}
