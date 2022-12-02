import * as React from 'react';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ColorsEnum } from 'common/theme';
import { Typography } from '@mui/material';

export const StyledButton = styled(Button)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? ColorsEnum.white : ColorsEnum.coolgray1,
    padding: `calc(${theme.spacing(0.5)} + 0.1vw) calc(${theme.spacing(1)} + 0.1vw)`,
}));

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

export default function BootstrapDialogFrame(props: {
    title: string;
    openIcon: React.ReactElement;
    openPrompt?: string;
    children: any;
}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <StyledButton
                variant="text"
                onClick={handleClickOpen}
                startIcon={props.openIcon}
                disableRipple
            >
                <Typography variant="body2">{props.openPrompt}</Typography>
            </StyledButton>
            <BootstrapDialog
                onClose={handleClose}
                open={open}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    },
                }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {props.title}
                </BootstrapDialogTitle>
                {props.children}
            </BootstrapDialog>
        </div>
    );
}
