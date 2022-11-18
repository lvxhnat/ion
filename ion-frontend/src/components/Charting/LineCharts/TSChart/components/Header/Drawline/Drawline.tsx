import * as React from 'react';
import * as RS from '../style';
import * as S from './style';

import GestureIcon from '@mui/icons-material/Gesture';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import { addDraw, removeDraw } from 'components/Charting/LineCharts/BaseLineChart/plugins';
import { removeDrawnLines } from 'components/Charting/LineCharts/BaseLineChart/plugins/addDraw/addDraw';
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
                style={{ backgroundColor: ColorsEnum.darkGrey, width: 150, height: 30 }}
                variant="contained"
            >
                <Typography variant="body2">{isDraw ? 'Draw Mode' : 'Tooltip Mode'}</Typography>
            </RS.ButtonWrapper>
        </div>
    );
}

export function Clearlines(props: { baseId: string }) {
    return (
        <S.StyledIconButton
            onClick={() => removeDrawnLines({ baseId: props.baseId })}
            sx={{ height: 30, width: 30 }}
        >
            <Tooltip title="Remove lines drawn on the current chart" sx={{ padding: 0 }}>
                <DeleteSweepIcon fontSize="small" />
            </Tooltip>
        </S.StyledIconButton>
    );
}
