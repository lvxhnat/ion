import * as React from 'react';
import { ColorsEnum } from 'common/theme';
import { useThemeStore } from 'store/theme';

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
        <select
            style={{
                backgroundColor: 'transparent',
                color: mode === 'dark' ? ColorsEnum.white : ColorsEnum.black,
                paddingLeft: 2,
                borderRadius: 5,
            }}
            onChange={props.handleChange}
        >
            {props.options.map((entry: SelectOptions, index: number) => (
                <option value={entry.value} key={`${entry.value}_${index}`}>
                    {entry.name}
                </option>
            ))}
        </select>
    );
}
