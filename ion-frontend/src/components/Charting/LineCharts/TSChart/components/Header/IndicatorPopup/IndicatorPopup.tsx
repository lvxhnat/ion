import * as React from 'react';
import * as S from './style';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import Search from 'components/Search';
import SidebarPrompt from './SidebarPrompt';
import ChoiceTable from './ChoiceTable';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
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

export default function IndicatorPopup() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <S.ButtonWrapper startIcon={<CandlestickChartIcon />} onClick={handleClickOpen}>
                Indicators
            </S.ButtonWrapper>
            <BootstrapDialog onClose={handleClose} open={open}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Typography style={{ fontSize: '0.9rem' }}>
                        Indicators, Metrics, Strategies
                    </Typography>
                </BootstrapDialogTitle>

                <DialogContent style={{ padding: 0 }}>
                    <S.SearchWrapper>
                        <Search placeholder={'Search'} fullWidth />
                    </S.SearchWrapper>
                </DialogContent>

                <DialogContent style={{ padding: 0, width: 600, height: 400 }}>
                    <Grid container style={{ height: '100%' }}>
                        <Grid item xs={3}>
                            <SidebarPrompt />
                        </Grid>
                        <Grid item xs={9}>
                            <ChoiceTable />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
