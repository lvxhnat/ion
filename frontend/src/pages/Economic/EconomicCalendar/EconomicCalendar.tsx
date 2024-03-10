import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { EconomicCalendarEntry, getEconomicCalendar } from "../requests";
import moment from "moment";

const StyledTableCell = (props: { children?: React.ReactNode }) => {
  return (
    <TableCell>
      <Typography variant="subtitle2">{props.children}</Typography>
    </TableCell>
  );
};
export default function EconomicCalendar() {
  const [entries, setEntries] = React.useState<EconomicCalendarEntry[]>([]);

  React.useEffect(() => {
    getEconomicCalendar().then((res) => setEntries(res.data))
  }, [])


  return (
    <div style={{ height: "100%", overflowY: 'hidden'}}>
    <TableContainer style={{height: "100%", overflowY: "auto"}}>
      <Table
        stickyHeader
        size="small"
        sx={{ width: "100%", height: "100%", tableLayout: "fixed" }}
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Ticker</StyledTableCell>
            <StyledTableCell>Units</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={`${entry.entry_id}-outstandingPositions`}>
              <StyledTableCell key={`${entry.entry_id}-cell2`}>
                {entry.name}
              </StyledTableCell>
              <StyledTableCell key={`${entry.entry_id}-cell3`}>
                {moment(new Date(entry.date)).format("YYYY-MM-DD")}
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      </div>
  );
}
