import * as React from "react";
import { ContainerWrapper } from "components/Wrappers/ContainerWrapper";
import PortfolioPopup from "./PortfolioPopup";
import { Grid, Typography } from "@mui/material";
import { ColorsEnum } from "common/theme";
import { useThemeStore } from "store/theme";
import ExistingPortfolios from "./ExistingPortfolios/ExistingPortfolios";
import PortfolioAlert from "./PortfolioAlert/PortfolioAlert";
import { GetUserPortfolios, getUserPortfolios } from "./requests";
import { useFirebaseUserStore } from "store/user/user";

export default function Portfolio() {
  const theme = useThemeStore();
  const [portfolios, setPortfolios] = React.useState<GetUserPortfolios[]>([]);
  const user = useFirebaseUserStore((state) => state.user);

  React.useEffect(() => {
    if (user) getUserPortfolios(user.user_id).then((res) => setPortfolios(res.data));
  }, [user]);

  return (
    <ContainerWrapper>
      <Grid container style={{ padding: 25, gap: 25, overflowY: 'hidden' }}>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h1"> All Portfolios </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <PortfolioPopup portfolios={portfolios} setPortfolios={setPortfolios} />
          </Grid>
        </Grid>
        <Grid
          container
          style={{
            backgroundColor:
              theme.mode === "dark"
                ? ColorsEnum.darkerGrey
                : ColorsEnum.offWhite,
            padding: 25,
            height: '100%',
            overflowY: 'auto'
          }}
        >
          <ExistingPortfolios portfolios={portfolios} setPortfolios={setPortfolios} />
        </Grid>
        <PortfolioAlert/>
      </Grid>
    </ContainerWrapper>
  );
}
