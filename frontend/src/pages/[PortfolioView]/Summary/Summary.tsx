import * as React from "react";
import { Grid } from "@mui/material";
import OutstandingPositions from "./OutstandingPositions";

interface SummaryProps {
  portfolioId: string;
}

export default function Summary(props: SummaryProps) {
  return (
    <Grid container>
      <Grid item xs={5}>
        <OutstandingPositions {...props} />
      </Grid>
      <Grid item xs={7}></Grid>
    </Grid>
  );
}
