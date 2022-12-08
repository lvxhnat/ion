import * as React from 'react';
import * as S from './style';
import { IntervalSelectionProps } from './type';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Typography from '@mui/material/Typography';

export default function IntervalSelection(props: IntervalSelectionProps) {
    const [intervalSelection, setIntervalSelection] = React.useState<string>('1D');

    const handleChange = (event: React.MouseEvent<HTMLElement>, interval: string) => {
        setIntervalSelection(interval);
    };

    return (
        <S.SubHeaderWrapper>
            <ToggleButtonGroup
                size="small"
                value={intervalSelection}
                exclusive
                onChange={handleChange}
                sx={{ height: 30 }}
            >
                {props.intervals.map((interval: string, index: number) => (
                    <ToggleButton
                        key={`toggle_button_${index}`}
                        sx={{ padding: 0.5 }}
                        disableRipple
                        value={interval}
                    >
                        <Typography variant="body2">{interval}</Typography>
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </S.SubHeaderWrapper>
    );
}
