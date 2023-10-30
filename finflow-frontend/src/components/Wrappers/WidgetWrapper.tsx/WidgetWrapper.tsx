import * as React from 'react';
import { useNavigate } from 'react-router';
import { WidgetWrapperProps } from './type';

import Box from '@mui/system/Box';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

export default function WidgetWrapper(props: WidgetWrapperProps) {
    const navigate = useNavigate();

    return (
        <Box style={{ width: '100%', paddingLeft: 5, paddingRight: 5 }}>
            <Grid
                container
                alignItems="flex-start"
                style={{ padding: props.title && props.redirectURL ? 5 : 0 }}
            >
                <Grid container item xs={6}>
                    <Typography align="left" variant="h3">
                        {props.title}
                    </Typography>
                    {props.redirectURL ? (
                        <IconButton disableRipple onClick={() => navigate(props.redirectURL!)}>
                            <FullscreenIcon />
                        </IconButton>
                    ) : (
                        <></>
                    )}
                </Grid>
                <Grid container item xs={6}></Grid>
            </Grid>
            {props.children}
        </Box>
    );
}
