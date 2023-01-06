import * as React from 'react';

import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableBody from '@mui/material/TableBody';
import Grid from '@mui/material/Grid';

import { IntRange } from 'common/types';
import { ColorsEnum } from 'common/theme';
import { typeIconHints, Types } from 'common/theme/components/icons';

const ColorHint = (props: { color: any; text?: string }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {props.text ? <Typography variant="subtitle2">{props.text}</Typography> : null}
            <span
                style={{ width: 7, height: 7, backgroundColor: props.color, borderRadius: '50%' }}
            />
        </div>
    );
};

const CompositionBar = (props: { first: IntRange<0, 100>; second: IntRange<0, 100> }) => {
    return (
        <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', width: '100%', height: 3 }}>
                <div
                    style={{
                        display: 'flex',
                        width: `${props.first}%`,
                        backgroundColor: ColorsEnum.upHint,
                    }}
                />
                <div
                    style={{
                        display: 'flex',
                        width: `${props.second}%`,
                        backgroundColor: ColorsEnum.downHint,
                    }}
                />
            </div>
        </div>
    );
};

const StyledTableCell = (props: { children?: any; width: number; [rest: string]: any }) => {
    return (
        <TableCell
            width={`${props.width}%`}
            style={{
                padding: 0,
                paddingLeft: 5,
                paddingRight: 5,
                border: 'none',
            }}
            {...props.rest}
        >
            <Typography variant="subtitle2">{props.children}</Typography>
        </TableCell>
    );
};

export default function ColumnPanel(props: { type: Types; name: string }) {
    const numericValues = [
        { prompt: '', first: '', second: '', empty: true },
        {
            prompt: <ColorHint color={ColorsEnum.upHint} text="Valid" />,
            first: '21.2K',
            second: '100%',
            empty: false,
        },
        {
            prompt: <ColorHint color={ColorsEnum.downHint} text="Missing" />,
            first: '0',
            second: '0%',
            empty: false,
        },
        { prompt: '', first: '', second: '', empty: true },
        { prompt: 'Mean', first: 312321, second: '', empty: false },
        { prompt: 'Std. Deviation', first: 9231, second: '', empty: false },
        { prompt: '', first: '', second: '', empty: true },
        { prompt: 'Quantiles', first: 320432, second: 'Min', empty: false },
        { prompt: '', first: 212185, second: '25%', empty: false },
        { prompt: '', first: 532172, second: '50%', empty: false },
        { prompt: '', first: 832100, second: '75%', empty: false },
        { prompt: '', first: 932183, second: 'Max', empty: false },
    ];

    const textValues = [
        { prompt: '', first: '', second: '', empty: true },
        {
            prompt: <ColorHint color={ColorsEnum.upHint} text="Valid" />,
            first: '21.2K',
            second: '100%',
            empty: false,
        },
        {
            prompt: <ColorHint color={ColorsEnum.downHint} text="Missing" />,
            first: '0',
            second: '0%',
            empty: false,
        },
        { prompt: '', first: '', second: '', empty: true },
        { prompt: 'Unique', first: '25.3K', second: '', empty: false },
        { prompt: 'Most Common', first: 'yo', second: '20%', empty: false },
    ];

    let tableValues;

    if (props.type === 'TEXT' || props.type === 'DATETIME') {
        tableValues = textValues;
    } else {
        tableValues = numericValues;
    }

    return (
        <Grid container style={{ padding: 5 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 5 }}>
                {typeIconHints[props.type]}
                {props.name}
            </div>
            <CompositionBar first={90} second={10} />
            <Table>
                <TableBody>
                    {tableValues.map((entry, index) => {
                        if (entry.empty) {
                            return (
                                <TableRow key={`emptyRow_${index}`}>
                                    <TableCell colSpan={5} style={{ border: 0, padding: 5 }} />
                                </TableRow>
                            );
                        } else {
                            return (
                                <TableRow key={`row${entry.prompt}_${index}`}>
                                    <StyledTableCell width={40}>{entry.prompt}</StyledTableCell>
                                    <StyledTableCell width={40}></StyledTableCell>
                                    <StyledTableCell width={10}>{entry.first}</StyledTableCell>
                                    <StyledTableCell width={10}>{entry.second}</StyledTableCell>
                                </TableRow>
                            );
                        }
                    })}
                </TableBody>
            </Table>
        </Grid>
    );
}
