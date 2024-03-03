import * as React from "react";
import { ContainerWrapper } from "components/Wrappers/ContainerWrapper";
import TransactionsTable from "./TransactionsTable";
import { Grid } from "@mui/material";

export default function Portfolio() {
  return (
    <ContainerWrapper>
      <Grid container>
        <Grid xs={9}>
          <TransactionsTable />
        </Grid>
        <Grid xs={3}></Grid>
      </Grid>
    </ContainerWrapper>
  );
}
