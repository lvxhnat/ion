import * as React from 'react';
import { getTableQuery } from 'data/ingestion/postgres';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { ColorsEnum } from 'common/theme';

export default function TreasuryTables() {
    const [data, setData] = React.useState<any[]>([]);

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
                                      <TableCell key={`treasury_header_${index}`}>
                                          {column}
                                      </TableCell>
                                  );
                              })
                            : null}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length !== 0
                        ? data.map((data, index: number) => (
                              <TableRow key={`treasury_row_${index}`}>
                                  {Object.keys(data).map(dataKey => {
                                      return (
                                          <TableCell key={`treasury_cell_${dataKey}`}>
                                              <label>{data[dataKey]}</label>
                                          </TableCell>
                                      );
                                  })}
                              </TableRow>
                          ))
                        : null}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
