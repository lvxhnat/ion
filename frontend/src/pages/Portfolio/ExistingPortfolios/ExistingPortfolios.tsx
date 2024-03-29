import * as React from "react";
import * as S from "./style";
import { GetUserPortfolios, deleteUserPortfolio } from "../requests";
import Typography from "@mui/material/Typography";
import { ColorsEnum } from "common/theme";
import { useThemeStore } from "store/theme";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, IconButton, Link } from "@mui/material";
import { ROUTES } from "common/constant";
import AccordionPortfolio from "./AccordionPortfolio/AccordionPortfolio";

interface ExistingPortfoliosProps {
  portfolios: GetUserPortfolios[];
  setPortfolios: (value: GetUserPortfolios[]) => void;
}

export default function ExistingPortfolios(props: ExistingPortfoliosProps) {
  const theme = useThemeStore();
  const [expanded, setExpanded] = React.useState<string | false>();

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleDelete = (portfolioId: string) => {
    deleteUserPortfolio(portfolioId);
    props.setPortfolios(
      props.portfolios.filter((entry) => entry.portfolio_id !== portfolioId)
    );
  };

  return (
    <div style={{ height: "100%" }}>
      {props.portfolios.length === 0 ? (
        <Typography align="center">
          {" "}
          You have no existing Portfolios.{" "}
        </Typography>
      ) : null}
      {props.portfolios.map((entry, index) => (
        <S.Accordion
          key={entry.portfolio_id}
          expanded={expanded ? expanded === entry.portfolio_id : index === 0}
          onChange={handleChange(entry.portfolio_id)}
        >
          <S.AccordionSummary>
            <Grid container display="flex" alignItems="center">
              <Grid item xs={6}>
                <Typography
                  variant="h2"
                  style={{
                    color:
                      theme.mode === "dark"
                        ? ColorsEnum.primary
                        : ColorsEnum.black,
                  }}
                >
                  <Link href={`${ROUTES.PORTFOLIO}/${entry.portfolio_id}`}>
                    {entry.name}
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={6} display="flex" justifyContent="flex-end">
                {expanded === entry.portfolio_id ? (
                  <IconButton
                    onClick={() => handleDelete(entry.portfolio_id)}
                    style={{ zIndex: 100 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : null}
              </Grid>
            </Grid>
          </S.AccordionSummary>
          <S.AccordionDetails>
            <AccordionPortfolio portfolioId={entry.portfolio_id} />
          </S.AccordionDetails>
        </S.Accordion>
      ))}
    </div>
  );
}
