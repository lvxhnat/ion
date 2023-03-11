import * as React from 'react';
import * as S from './style';

import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ColorsEnum } from 'common/theme';
import { Typography } from '@mui/material';

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
            {props.openPrompt ? (
                <S.StyledButton
                    variant="text"
                    onClick={handleClickOpen}
                    startIcon={props.openIcon}
                    disableRipple
                >
                    <Typography variant="body2">{props.openPrompt}</Typography>
                </S.StyledButton>
            ) : (
                <S.StyledIconButton onClick={handleClickOpen} disableRipple>
                    {props.openIcon}
                </S.StyledIconButton>
            )}
            <S.BootstrapDialog
                onClose={handleClose}
                open={open}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    style: {
                        backgroundColor: ColorsEnum.darkMode,
                        boxShadow: 'none',
                    },
                }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {props.title}
                </BootstrapDialogTitle>
                {props.children}
            </S.BootstrapDialog>
        </div>
    );
}
