import { IconButton } from '@mui/material';
import * as React from 'react';

interface StyledIconButtonProps {
    children: React.ReactNode;
    outline?: boolean;
    [others: string]: any;
}

export default function StyledIconButton(props: StyledIconButtonProps) {
    return (
        <IconButton
            disableRipple
            color="inherit"
            style={{ border: props.outline ? '1px solid white' : 'none', width: 30, height: 30 }}
            {...props}
        >
            {props.children}
        </IconButton>
    );
}
