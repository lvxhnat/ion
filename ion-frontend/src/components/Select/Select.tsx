import * as React from 'react';
import { ColorsEnum } from 'common/theme';
import { useThemeStore } from 'store/theme';
import { Typography } from '@mui/material';

interface SelectProps {
    options: SelectOptions[];
    handleChange: React.ChangeEventHandler<HTMLSelectElement>;
}

interface SelectOptions {
    value: string;
    name: string;
}

export default function Select(props: SelectProps) {
    const { mode } = useThemeStore();
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <select
                style={{
                    backgroundColor: 'transparent',
                    color: mode === 'dark' ? ColorsEnum.white : ColorsEnum.black,
                    paddingLeft: 2,
                    borderRadius: 2,
                    height: 25,
                    fontSize: `calc(0.4rem + 0.3vw)`,
                }}
                onChange={props.handleChange}
            >
                {props.options.map((entry: SelectOptions, index: number) => (
                    <option value={entry.value} key={`${entry.value}_${index}`}>
                        <Typography variant="subtitle2">{entry.name}</Typography>
                    </option>
                ))}
            </select>
        </div>
    );
}
