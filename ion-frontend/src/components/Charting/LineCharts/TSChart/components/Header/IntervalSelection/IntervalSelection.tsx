import * as React from 'react';
import * as S from './style';
import { IntervalSelectionProps } from './type';
import { ColorsEnum } from 'common/theme';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

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
            >
                {props.intervals.map((interval: string) => (
                    <ToggleButton disableRipple value={interval} key={interval}>
                        {interval}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </S.SubHeaderWrapper>
    );
}
