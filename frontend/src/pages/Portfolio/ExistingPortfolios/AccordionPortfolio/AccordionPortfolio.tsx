import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import {
  BaseTickerParams,
  getPortfolioTickers,
} from "pages/[PortfolioView]/request";

interface AccordionPortfolioProps {
  portfolioId: string;
}

const StyledTableCell = (props: {
  children?: React.ReactNode;
  header?: boolean;
}) => {
  return (
    <TableCell>
      <Typography variant={props.header ? "subtitle2" : "subtitle1"}>
        {props.children}
      </Typography>
    </TableCell>
  );
};

export default function AccordionPortfolio(props: AccordionPortfolioProps) {
  const [tickers, setTickers] = React.useState<BaseTickerParams[]>([]);

  React.useEffect(() => {
    // Get the transactions existing in the portfolio
    getPortfolioTickers(props.portfolioId).then((res) => {
      setTickers(res.data);
    });
  }, []);

  return (
    <Table
      stickyHeader
      size="small"
      sx={{ tableLayout: "fixed", width: "100%", height: "100%" }}
    >
      <TableHead>
        <TableRow>
          <StyledTableCell header>Ticker</StyledTableCell>
          <StyledTableCell header>Units</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tickers.map((position) => (
          <TableRow key={`${position.ticker}-outstandingPositions`}>
            <StyledTableCell key={`${position.ticker}-cell2`}>
              {position.ticker}
            </StyledTableCell>
            <StyledTableCell key={`${position.ticker}-cell3`}>
              {position.units}
            </StyledTableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
