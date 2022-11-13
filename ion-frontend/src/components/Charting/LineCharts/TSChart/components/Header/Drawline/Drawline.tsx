import * as React from 'react';
import * as S from './style';

import GestureIcon from '@mui/icons-material/Gesture';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import IconButton from '@mui/material/IconButton';

import { addDraw, removeDraw } from 'components/Charting/LineCharts/BaseLineChart/plugins';
import { removeDrawnLines } from 'components/Charting/LineCharts/BaseLineChart/plugins/addDraw/addDraw';
import Tooltip from '@mui/material/Tooltip';

export default function Drawline() {
    const [isDraw, setIsDraw] = React.useState<boolean>(false);

    function handleClick() {
        if (!isDraw) {
            addDraw();
        } else {
            removeDraw();
        }
        setIsDraw(!isDraw);
    }

    return (
        <S.ButtonWrapper
            onClick={handleClick}
            startIcon={
                isDraw ? <GestureIcon fontSize="small" /> : <QueryStatsIcon fontSize="small" />
            }
        >
            {isDraw ? 'Draw Mode' : 'Tooltip Mode'}
        </S.ButtonWrapper>
    );
}

export function Clearlines() {
    return (
        <Tooltip title="Remove lines drawn on the current chart" sx={{ padding: 0 }}>
            <IconButton disableRipple onClick={() => removeDrawnLines()}>
                <DeleteSweepIcon fontSize="small" />
            </IconButton>
        </Tooltip>
    );
}
