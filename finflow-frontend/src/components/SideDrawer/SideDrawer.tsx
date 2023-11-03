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
import { ListSubheader, Typography } from '@mui/material';
import { ROUTES } from '../../common/routes';
import { useLocation, useNavigate } from 'react-router-dom';
import StyledIconButton from '../Button/StyledIconButton';
import { ColorsEnum } from '../../common/theme';

interface SideDrawerProps {
    drawerWidth: number;
    open: boolean;
    handleDrawerClose: () => void;
    handleDrawerOpen: () => void;
}

interface StyledListItemButtonProps {
    selected?: boolean;
    [others: string]: any;
}

const StyledListItemButton = (props: StyledListItemButtonProps) => {
    return (
        <ListItemButton
            disableRipple
            sx={{
                justifyContent: props.open ? 'initial' : 'center',
                px: 2.5,
                paddingTop: 0.5,
                paddingBottom: 0.5,
            }}
            {...props}
        >
            {props.children}
        </ListItemButton>
    )
}

export default function SideDrawer(props: SideDrawerProps) {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <S.Drawer variant="permanent" open={props.open}>
            <S.DrawerHeader open={props.open}>
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
            {/* <StyledListItemButton
                        disabled={location.pathname === ROUTES.OVERVIEW}
                        onClick={() => navigate(ROUTES.OVERVIEW)}
                    >
                        <HomeIcon fontSize="small" />
                    </StyledListItemButton> */}
            <ListItem disablePadding>
                        <StyledListItemButton
                            onClick={() => navigate(ROUTES.PORTFOLIO)}
                            disableRipple
                            style={{
                                display: props.open ? 'none' : 'flex',
                                borderLeft: location.pathname === ROUTES.PORTFOLIO ? `2px solid ${ColorsEnum.primary}` : 'none',
                                color: location.pathname === ROUTES.PORTFOLIO ? ColorsEnum.primary : 'none'
                            }}
                        >
                            <DonutSmallIcon fontSize="small"/>
                        </StyledListItemButton>
                    </ListItem>
                    <ListSubheader component="div" style={{borderLeft: location.pathname === ROUTES.PORTFOLIO && props.open ? `2px solid ${ColorsEnum.primary}` : 'none',}}>
                        <ListItemText
                            primary={
                                <Typography
                                    variant="subtitle1"
                                    component="div"
                                    sx={{
                                        color: location.pathname === ROUTES.PORTFOLIO ? ColorsEnum.primary : ColorsEnum.warmgray2,
                                        fontWeight: 500,
                                        gap: 1,
                                        display: 'flex', 
                                        alignItems: 'center'
                                    }}
                                >
                                    <DonutSmallIcon fontSize="small"/>
                                    PORTFOLIOS
                                </Typography>
                            }
                            sx={{ opacity: props.open ? 1 : 0 }}
                        />{' '}
                    </ListSubheader>
                {['Portfolio 1', 'Portfolio 2', 'Portfolio 3'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <StyledListItemButton>
                            <ListItemText
                                disableTypography
                                primary={<Typography variant="body2">{text}</Typography>}
                                sx={{ opacity: props.open ? 1 : 0 }}
                            />
                        </StyledListItemButton>
                    </ListItem>
                ))}
            </List>
        </S.Drawer>
    );
}
