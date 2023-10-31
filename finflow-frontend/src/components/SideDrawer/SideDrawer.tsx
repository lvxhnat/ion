import * as React from 'react';
import * as S from './style';

import HomeIcon from '@mui/icons-material/Home';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import { Typography } from '@mui/material';
import { ROUTES } from '../../common/routes';
import { useLocation, useNavigate } from 'react-router-dom';
import StyledIconButton from '../Button/StyledIconButton';

interface SideDrawerProps {
    drawerWidth: number;
    open: boolean;
    handleDrawerClose: () => void;
    handleDrawerOpen: () => void;
}

export default function SideDrawer(props: SideDrawerProps) {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <S.Drawer variant="permanent" open={props.open}>
            <S.DrawerHeader open={props.open}>
                <div style={{ width: '100%', display: props.open ? 'block' : 'none' }}>
                    <StyledIconButton
                        disabled={location.pathname === ROUTES.OVERVIEW}
                        onClick={() => navigate(ROUTES.OVERVIEW)}
                    >
                        <HomeIcon fontSize="small" />
                    </StyledIconButton>
                </div>
                <IconButton
                    onClick={() =>
                        props.open ? props.handleDrawerClose() : props.handleDrawerOpen()
                    }
                >
                    {!props.open ? (
                        <ChevronRightIcon fontSize="small" />
                    ) : (
                        <ChevronLeftIcon fontSize="small" />
                    )}
                </IconButton>
            </S.DrawerHeader>
            <Divider variant="middle" />
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                justifyContent: props.open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: props.open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {index % 2 === 0 ? (
                                    <InboxIcon fontSize="small" />
                                ) : (
                                    <MailIcon fontSize="small" />
                                )}
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{ opacity: props.open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider variant="middle" />
            <List>
                {['Portfolio 1', 'Portfolio 2', 'Portfolio 3'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: props.open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemText primary={text} sx={{ opacity: props.open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </S.Drawer>
    );
}
