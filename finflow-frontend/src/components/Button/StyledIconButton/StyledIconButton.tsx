import { IconButton } from '@mui/material';
import * as React from 'react';

interface StyledIconButtonProps {
    children: React.ReactNode;
    [others: string]: any;
}

export default function StyledIconButton(props: StyledIconButtonProps) {
    return (
        <IconButton
            disableRipple
            color="inherit"
            style={{ border: '1px solid white', width: 30, height: 30 }}
            {...props}
        >
            {props.children}
        </IconButton>
    );
}
