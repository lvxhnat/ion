import * as React from "react";
import * as S from "../../style";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

interface OutstandingPositionsProps {
  portfolioId: string;
}

const StyledTableCell = (props: { children?: React.ReactNode }) => {
  return (
    <TableCell>
      <Typography variant="subtitle1">{props.children}</Typography>
    </TableCell>
  );
};
export default function OutstandingPositions(props: OutstandingPositionsProps) {
  const [activePositions, setActivePositions] = React.useState<any[]>([]);
  React.useEffect(() => {}, []);

  return (
    <S.TransactionsWrapper>
      <Table
        stickyHeader
        size="small"
        sx={{ tableLayout: "fixed", width: "100%", height: "100%" }}
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Ticker</StyledTableCell>
            <StyledTableCell>Units</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activePositions.map((position) => (
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
    </S.TransactionsWrapper>
  );
}
