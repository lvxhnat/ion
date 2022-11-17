import * as React from 'react';
import * as RS from '../style';

import GestureIcon from '@mui/icons-material/Gesture';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import IconButton from '@mui/material/IconButton';

import { addDraw, removeDraw } from 'components/Charting/LineCharts/BaseLineChart/plugins';
import { removeDrawnLines } from 'components/Charting/LineCharts/BaseLineChart/plugins/addDraw/addDraw';
import Tooltip from '@mui/material/Tooltip';
import { ColorsEnum } from 'common/theme';

export default function Drawline(props: { baseId: string }) {
    const [isDraw, setIsDraw] = React.useState<boolean>(false);

    function handleClick() {
        if (!isDraw) {
            addDraw({ baseId: props.baseId });
        } else {
            removeDraw({ baseId: props.baseId });
        }
        setIsDraw(!isDraw);
    }

    return (
        <div>
            <RS.ButtonWrapper
                onClick={handleClick}
                startIcon={
                    isDraw ? <GestureIcon fontSize="small" /> : <QueryStatsIcon fontSize="small" />
                }
                style={{ backgroundColor: ColorsEnum.darkGrey }}
                variant="contained"
            >
                {isDraw ? 'Draw Mode' : 'Tooltip Mode'}
            </RS.ButtonWrapper>
        </div>
    );
}

export function Clearlines(props: { baseId: string }) {
    return (
        <Tooltip title="Remove lines drawn on the current chart" sx={{ padding: 0 }}>
            <IconButton disableRipple onClick={() => removeDrawnLines({ baseId: props.baseId })}>
                <DeleteSweepIcon fontSize="small" />
            </IconButton>
        </Tooltip>
    );
}
