import React from "react";
import { NavigatorWrapper } from "../../components/Navigator";
import { Grid } from "@mui/material";
import LivePlayerWidget from "./LivePlayer/LivePlayerWidget";

export default function Overview() {
  return (
    <NavigatorWrapper>
      <Grid item xs={3}></Grid>
      <Grid item xs={6}></Grid>
      <Grid item xs={3}>
        <LivePlayerWidget />
      </Grid>
    </NavigatorWrapper>
  );
}
