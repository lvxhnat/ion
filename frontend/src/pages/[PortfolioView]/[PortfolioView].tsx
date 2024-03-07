import * as React from "react";
import { useParams } from "react-router-dom";
import { ContainerWrapper } from "components/Wrappers/ContainerWrapper";
import TransactionsTable from "./TransactionsTable";
import { Grid, Typography } from "@mui/material";
import { GetUserPortfolios, getUserPortfolio } from "./request";
import type { ReactTabsFunctionComponent, TabProps } from "react-tabs";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const StyledTab: ReactTabsFunctionComponent<TabProps> = ({
  children,
  ...otherProps
}) => (
  <Tab {...otherProps}>
    <Typography variant="subtitle1"> {children} </Typography>
  </Tab>
);
StyledTab.tabsRole = "Tab"; // Required field to use your custom Tab

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
      <Typography variant="h2" style={{ paddingTop: 10, paddingBottom: 20 }}>
        {portfolio?.name}
      </Typography>
      <Tabs>
        <TabList>
          <StyledTab> Summary </StyledTab>
          <StyledTab> Transactions </StyledTab>
          <StyledTab> Deposits / Withdrawals </StyledTab>
        </TabList>
        <TabPanel>
          <Grid container style={{ paddingTop: 15 }}></Grid>
        </TabPanel>
        <TabPanel>
          <Grid container style={{ paddingTop: 15 }}>
            <TransactionsTable portfolioId={params.portfolioName!} />
          </Grid>
        </TabPanel>
        <TabPanel>
          <Grid container style={{ paddingTop: 15 }}></Grid>
        </TabPanel>
      </Tabs>
    </ContainerWrapper>
  );
}
