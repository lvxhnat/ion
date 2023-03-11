import * as React from 'react';
import * as S from './style';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import Grid from '@mui/material/Grid';

import Search from 'components/Search';
import SidebarPrompt from './SidebarPrompt';
import ChoiceTable from './ChoiceTable';
import BootstrapDialogFrame from 'components/Dialog';

interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    disableRipple
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

export default function IndicatorPopup(props: { setData: Function }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <BootstrapDialogFrame
            title="Indicators, Metrics, Strategies"
            openIcon={<CandlestickChartIcon fontSize="small" />}
        >
            <DialogContent style={{ padding: 0 }}>
                <S.SearchWrapper>
                    <Search placeholder={'Search'} fullWidth />
                </S.SearchWrapper>
            </DialogContent>

            <DialogContent style={{ padding: 0, width: '100%', height: 450 }}>
                <Grid container style={{ height: '100%' }}>
                    <Grid item xs={3}>
                        <SidebarPrompt />
                    </Grid>
                    <Grid item xs={9}>
                        <ChoiceTable setData={props.setData} />
                    </Grid>
                </Grid>
            </DialogContent>
        </BootstrapDialogFrame>
    );
}
