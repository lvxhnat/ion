import React from "react";
import * as S from "../style";
import { Stack, Typography } from "@mui/material";
import { FaChartPie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "common/constant";

export default function AnalyticsButton() {
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
        <Typography variant="h3">Analytics</Typography>
      </S.StyledMenuButton>
      <S.StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <S.StyledMenuItem onClick={() => handleClose(ROUTES.PORTFOLIO)}>
          <S.IconStackWrapper>
            <FaChartPie style={{ fontSize: 20 }} />
            <Stack style={{ gap: 5, width: "80%" }}>
              <Typography variant="h3"> Portfolio Analytics </Typography>
              <S.ButtonSubtitles variant="subtitle2">
                Analyse ETF Positions
              </S.ButtonSubtitles>
            </Stack>
          </S.IconStackWrapper>
        </S.StyledMenuItem>
      </S.StyledMenu>
    </React.Fragment>
  );
}
