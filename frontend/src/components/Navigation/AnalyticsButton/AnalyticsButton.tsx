import React from "react";
import * as S from "../style";
import { Stack, Typography } from "@mui/material";
import { FaChartPie } from "react-icons/fa";
import { GiLeafSwirl } from "react-icons/gi";

import { useNavigate } from "react-router-dom";
import { ROUTES } from "common/constant";

interface MenuRowProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

function MenuRow(props: MenuRowProps) {
  return (
    <S.StyledMenuItem onClick={props.onClick} disabled={props.disabled}>
      <S.IconStackWrapper>
        {props.icon}
        <Stack style={{ gap: 5, width: "80%" }}>
          <Typography variant="h3"> {props.title} </Typography>
          <S.ButtonSubtitles variant="subtitle2">
            {props.description}
          </S.ButtonSubtitles>
        </Stack>
      </S.IconStackWrapper>
    </S.StyledMenuItem>
  );
}

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
        <MenuRow
          icon={<GiLeafSwirl style={{ fontSize: 20 }} />}
          title="Watchlist & Analytics"
          description="Add stocks to watchlist and check for correlations"
          onClick={() => handleClose(ROUTES.PORTFOLIO)}
        />
      </S.StyledMenu>
    </React.Fragment>
  );
}
