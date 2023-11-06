import * as React from 'react';
import * as S from './style';

import Typography from '@mui/material/Typography';

export default function NumericChoice(props: { label: string; [x: string]: any }) {
    return (
        <S.ChoiceContainer>
            <div style={{ width: '40%' }}>
                <Typography variant="subtitle2">
                    {props.label.charAt(0).toUpperCase() + props.label.slice(1)}
                </Typography>
            </div>
            <div style={{ width: '60%' }}>
                <S.NumericChoiceInput {...props} type="number" dir="rtl" />
            </div>
        </S.ChoiceContainer>
    );
}
