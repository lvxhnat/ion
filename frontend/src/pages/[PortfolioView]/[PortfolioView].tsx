import * as React from "react";
import { useParams } from "react-router-dom";
import { ContainerWrapper } from "components/Wrappers/ContainerWrapper";
import TransactionsTable from "./TransactionsTable";
import { Grid, Typography } from "@mui/material";
import { GetUserPortfolios, getUserPortfolio } from "./request";

export default function PortfolioView() {
  const params = useParams();
  const [portfolio, setPortfolio] = React.useState<GetUserPortfolios>();

  React.useEffect(() => {
    getUserPortfolio(params.portfolioName!).then((res) =>
      setPortfolio(res.data)
    );
  }, []);

  return (
    <ContainerWrapper>
      <Grid container>
        <Typography variant="h2" style={{ paddingTop: 10, paddingBottom: 10 }}>
          {portfolio?.name}
        </Typography>
        <Grid container>
          <Grid item xs={9}>
            <TransactionsTable />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}
