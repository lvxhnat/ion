import * as React from 'react';
import * as S from './style';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { INDICATOR_TYPES } from 'components/Charting/LineCharts/TSChart/config';
import { Grid } from '@mui/material';
import { MOMENTUM_INDICATORS } from './configs';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
): any {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function ChoiceTable(): React.ReactElement {
    const [indicatorSelection, setIndicatorSelection] = React.useState<string>(
        MOMENTUM_INDICATORS[0].id
    );
    const [assetSelection, setAssetSelection] = React.useState<string>(rows[0].name);
    const [typeSelection, setTypeSelection] = React.useState<string>(INDICATOR_TYPES.MOMENTUM);

    return (
        <>
            <S.ChipWrapper>
                <S.StyledChip
                    clickable
                    size="small"
                    label={INDICATOR_TYPES.MOMENTUM}
                    variant={typeSelection === INDICATOR_TYPES.MOMENTUM ? 'filled' : 'outlined'}
                    onClick={() => setTypeSelection(INDICATOR_TYPES.MOMENTUM)}
                />
            </S.ChipWrapper>
            <Grid container>
                <Grid item xs={4}>
                    <Table size="small">
                        <TableBody>
                            {rows.map(row => (
                                <TableRow
                                    hover
                                    key={row.name}
                                    selected={assetSelection === row.name}
                                    onClick={() => setAssetSelection(row.name)}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        '&:hover': { cursor: 'pointer' },
                                    }}
                                >
                                    <TableCell
                                        component="td"
                                        scope="row"
                                        style={{ fontSize: '12px', border: 0 }}
                                    >
                                        {row.name}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item xs={8}>
                    <Table size="small">
                        <TableBody>
                            {MOMENTUM_INDICATORS.map(row => (
                                <TableRow
                                    hover
                                    key={row.id}
                                    selected={indicatorSelection === row.id}
                                    onClick={() => setIndicatorSelection(row.id)}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        '&:hover': { cursor: 'pointer' },
                                    }}
                                >
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        style={{ fontSize: '12px', border: 0 }}
                                    >
                                        {row.name}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        </>
    );
}
