import * as React from "react";
import { useParams } from "react-router-dom";
import { ContainerWrapper } from "components/Wrappers/ContainerWrapper";
import TransactionsTable from "./TransactionsTable";
import { Grid } from "@mui/material";

export default function PortfolioView() {
  const params = useParams();
  return (
    <ContainerWrapper>
      <Grid container>
        <Grid item xs={9}>
          <TransactionsTable />
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </ContainerWrapper>
  );
}
