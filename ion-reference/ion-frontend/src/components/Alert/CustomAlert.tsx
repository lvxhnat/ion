import * as React from 'react';

import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

export default function CustomAlert(props: { text: string }) {
    return (
        <Alert
            variant="outlined"
            severity="error"
            style={{ padding: 1, paddingLeft: 10, display: 'flex', alignItems: 'center' }}
            icon={<CloseIcon style={{ fontSize: 15 }} />}
        >
            <Typography variant="subtitle2">{props.text}</Typography>
        </Alert>
    );
}
