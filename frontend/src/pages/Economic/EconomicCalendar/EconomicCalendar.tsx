import * as React from "react";
import * as S from '../style';

import {
  Table,
  TableBody,
  TableCell,
  Typography,
} from "@mui/material";
import { EconomicCalendarEntry, getEconomicCalendar } from "../requests";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "common/constant";

const StyledTableCell = (props: { children?: React.ReactNode }) => {
  return (
    <TableCell style={{ paddingTop: 0.5, paddingBottom: 0.5 }}>
      <Typography variant="subtitle2" noWrap>{props.children}</Typography>
    </TableCell>
  );
};

export default function EconomicCalendar() {
  const navigate = useNavigate();
  const [entries, setEntries] = React.useState<EconomicCalendarEntry[]>([]);

  React.useEffect(() => {
    getEconomicCalendar().then((res) => setEntries(res.data))
  }, [])

  return (
    <S.GridWrapper>
      <S.TableContainerWrapper>
        <Table
          stickyHeader
          size="small"
          sx={{ width: "100%", height: "100%", tableLayout: "fixed" }}
        >
          <TableBody>
            {entries.map((entry, index) => (
              <S.StyledTableRow key={`row-${index}-outstandingPositions`} onClick={() => navigate(`${ROUTES.ECONOMIC_DATA}/releases/${entry.fred_release_id}`)}>
                <TableCell width="5%" key={`${entry.entry_id}-cell1`}>🇺🇸</TableCell>
                <StyledTableCell key={`${entry.entry_id}-cell2`}>
                  {entry.name}
                </StyledTableCell>
                <StyledTableCell key={`${entry.entry_id}-cell3`}>
                  {moment(new Date(entry.date)).format("YYYY-MM-DD")}
                </StyledTableCell>
              </S.StyledTableRow>
            ))}
          </TableBody>
        </Table>
        </S.TableContainerWrapper>
      </S.GridWrapper>
  );
}
