import * as React from 'react';
import * as S from './style';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { INDICATOR_ENGINE } from 'components/Charting/LineCharts/TSChart/helpers/indicators';
import { GeneralTableTypeProp } from './configs';
import Typography from '@mui/material/Typography';

export default function ChoiceTable(): React.ReactElement {
    const [indicatorGroupSelection, setIndicatorGroupSelection] = React.useState<string>(
        Object.keys(INDICATOR_ENGINE)[0]
    );
    const [indicatorSelection, setIndicatorSelection] = React.useState<string | null>(null);
    return (
        <>
            <S.ChipWrapper>
                {Object.keys(INDICATOR_ENGINE).map((key: string) => (
                    <S.StyledChip
                        clickable
                        size="small"
                        key={key}
                        label={
                            <Typography variant="body1">{INDICATOR_ENGINE[key].name}</Typography>
                        }
                        variant={indicatorGroupSelection === key ? 'filled' : 'outlined'}
                        onClick={() => setIndicatorGroupSelection(key)}
                    />
                ))}
            </S.ChipWrapper>
            <Table size="small">
                <TableBody>
                    {INDICATOR_ENGINE[indicatorGroupSelection].types.map(
                        (engines: GeneralTableTypeProp<number[]>) => (
                            <TableRow
                                hover
                                key={engines.id}
                                selected={indicatorSelection === engines.id}
                                onClick={() => setIndicatorSelection(engines.id)}
                                sx={{ '&:hover': { cursor: 'pointer' } }}
                            >
                                <TableCell component="th" scope="row" style={{ border: 0 }}>
                                    <Typography variant="body1">{engines.name}</Typography>
                                </TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </>
    );
}
