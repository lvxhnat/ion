import React from "react";
import * as S from "../style";
import { Stack, Typography } from "@mui/material";
import { RiBankFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "common/constant";

export default function AlternativeDataButton() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = (link: string) => {
    setAnchorEl(null);
    navigate(link);
  };

  return (
    <React.Fragment>
      <S.StyledMenuButton
        disableRipple
        disableFocusRipple
        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
          setAnchorEl(event.currentTarget)
        }
      >
        <Typography variant="h3">Alternative Data</Typography>
      </S.StyledMenuButton>
      <S.StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <S.StyledMenuItem onClick={() => handleClose(ROUTES.ECONOMIC_DATA)}>
          <S.IconStackWrapper>
            <RiBankFill style={{ fontSize: 20 }} />
            <Stack style={{ gap: 5, width: "80%" }}>
              <Typography variant="h3"> US Economic Data </Typography>
              <S.ButtonSubtitles variant="subtitle2">
                Access the FRED Database, track 823,000 US and international
                time series from 114 sources.{" "}
              </S.ButtonSubtitles>
            </Stack>
          </S.IconStackWrapper>
        </S.StyledMenuItem>
      </S.StyledMenu>
    </React.Fragment>
  );
}
