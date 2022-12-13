import * as React from 'react';
import * as d3 from 'd3';
import { getTableQuery } from 'data/ingestion/postgres';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { ColorsEnum } from 'common/theme';
import { StyledTableRow } from '../BaseTable/StyledTableRow';
import { StyledTableCell } from '../BaseTable/StyledTableCell';
import { TableRow } from '@mui/material';

export default function TreasuryTables() {
    const [data, setData] = React.useState<any[]>([]);
    const [visData, setVisData] = React.useState<{}>({});

    React.useEffect(() => {
        getTableQuery('us_bill_rates').then(data => {
            setData(data.data);
        });
    }, []);

    return (
        <TableContainer style={{ width: '100%' }}>
            <Table style={{ minWidth: 150 }} aria-label="a dense table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: ColorsEnum.coolgray8 }}>
                        {data.length !== 0
                            ? Object.keys(data[0]).map((column: string, index: number) => {
                                  return (
                                      <StyledTableCell isHeader key={`treasury_header_${index}`}>
                                          {column}
                                      </StyledTableCell>
                                  );
                              })
                            : null}
                    </TableRow>
                    <TableRow>
                        {/* {data.length !== 0
                            ? Object.keys(data[0]).map((column: string, index: number) => {
                                  return (
                                      <BaseLineChart
                                          baseId={`treasury_historicalChart`}
                                          defaultData={data}
                                          width={100}
                                          height={30}
                                          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                                      />
                                  );
                              })
                            : null} */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length !== 0
                        ? data.map((data, index: number) => (
                              <StyledTableRow key={`treasury_row_${index}`}>
                                  {Object.keys(data).map((dataKey: string, index: number) => {
                                      let res: string;
                                      if (index === 0) {
                                          const date: Date = new Date(data[dataKey]);
                                          res = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
                                      } else {
                                          res = data[dataKey];
                                      }
                                      return (
                                          <StyledTableCell key={`treasury_cell_${dataKey}`}>
                                              <label>{res}</label>
                                          </StyledTableCell>
                                      );
                                  })}
                              </StyledTableRow>
                          ))
                        : null}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
