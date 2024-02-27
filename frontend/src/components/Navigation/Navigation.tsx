import * as S from "./style";
import * as React from "react";

import Logo from "../../assets/logo.png";

import { useNavigate } from "react-router-dom";
import { ROUTES } from "common/constant";
import AlternativeDataButton from "./AlternativeDataButton";
import ProfileButton from "./ProfileButton";
import AnalyticsButton from "./AnalyticsButton";
import AboutButton from "./AboutButton/AboutButton";
import { Grid } from "@mui/material";

interface NavigationProps {
  hideNavigate?: boolean;
}

export default function Navigation(props: NavigationProps) {
  const navigate = useNavigate();

  return (
    <Grid container style={{ paddingTop: 10, paddingBottom: 10 }}>
      <Grid item xs={2}>
        <S.IconButtonWrapper
          disableRipple
          onClick={() => navigate(ROUTES.LANDING)}
        >
          <img
            src={Logo}
            alt="home"
            style={{ width: props.hideNavigate ? 150 : 100 }}
          />
        </S.IconButtonWrapper>
      </Grid>
      <Grid
        item
        xs={8}
        style={{ display: "flex", gap: 25 }}
        justifyContent="center"
      >
        {props.hideNavigate ? (
          <></>
        ) : (
          <React.Fragment>
            <AnalyticsButton />
            <AlternativeDataButton />
            <AboutButton />
          </React.Fragment>
        )}
      </Grid>
      <Grid item xs={2} display="flex" justifyContent="flex-end">
        {props.hideNavigate ? <></> : <ProfileButton />}
      </Grid>
    </Grid>
  );
}
