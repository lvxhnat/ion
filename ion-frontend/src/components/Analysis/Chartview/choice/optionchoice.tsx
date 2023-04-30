import * as React from 'react';
import * as S from './style';

import Typography from '@mui/material/Typography';
import Select from 'components/Select';

export default function OptionChoice(props: { 
    label: string;
    options: string[]|number[]; 
    [others: string]: any;
 }) {
    return (
        <S.ChoiceContainer>
            <div style={{ width: '40%' }}>
                <Typography variant="subtitle2">
                    {props.label.charAt(0).toUpperCase() + props.label.slice(1)}
                </Typography>
            </div>
            <div style={{ width: '60%' }}>
                <Select 
                    {...props}
                    options={props.options.map((entry) => {
                        return {value: entry.toString(), name: entry.toString()}
                    })}
                />
            </div>
        </S.ChoiceContainer>
    );
}
