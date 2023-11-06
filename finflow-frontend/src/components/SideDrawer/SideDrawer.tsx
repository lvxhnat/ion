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
import MultilineChartIcon from '@mui/icons-material/MultilineChart';
import { Box, ListSubheader, Typography } from '@mui/material';
import { ROUTES } from '../../common/routes';
import { useLocation, useNavigate } from 'react-router-dom';
import { ColorsEnum } from '../../common/theme';

interface SideDrawerProps {
    drawerWidth: number;
    open: boolean;
    handleDrawerClose: () => void;
    handleDrawerOpen: () => void;
}

interface StyledListItemButtonProps {
    open?: boolean;
    selected?: boolean;
    padding?: 'tight' | 'none';
    [others: string]: any;
}

const StyledListItemButton = (props: StyledListItemButtonProps) => {
    const { selected, ...others } = props
    return (
        <ListItemButton
            disableRipple
            sx={{
                display: props.open ? 'flex' : 'none',
                justifyContent: 'center',
                px: 2.5,
                paddingTop: props.padding ? (props.padding === 'tight' ? 0.5 : 0) : 1,
                paddingBottom: props.padding ? (props.padding === 'tight' ? 0.5 : 0) : 1,
                borderLeft: selected ? `3px solid ${ColorsEnum.primary}` : 'none',
                color: selected ? ColorsEnum.primary : ColorsEnum.white,
            }}
            {...others}
        >
            {props.children}
        </ListItemButton>
    );
};

interface StyledListItemTIButtonProps extends StyledListItemButtonProps {
    route: string; // Type of ROUTES
    text: string;
    icon: React.ReactNode;
}

const StyledListItemTIButton = (props: StyledListItemTIButtonProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const color = location.pathname === props.route ? ColorsEnum.primary : ColorsEnum.white;
    return (
        <ListItemButton
            sx={{
                justifyContent: 'center',
                px: 2.5,
                paddingTop: 0.5,
                paddingBottom: 0.5,
                borderLeft: props.selected ? `3px solid ${ColorsEnum.primary}` : 'none',
                color: props.selected ? ColorsEnum.primary : ColorsEnum.white,
            }}
            onClick={() => navigate(props.route)}
            disableRipple
        >
            <ListItemIcon
                sx={{
                    minWidth: 0,
                    mr: props.open ? 1 : 'auto',
                    justifyContent: 'center',
                    color: color,
                }}
            >
                {props.icon}
            </ListItemIcon>
            <ListItemText
                primary={
                    <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{
                            color: color,
                            fontWeight: 500,
                            display: 'flex',
                            alignItems: 'flex-start',
                        }}
                    >
                        {props.text}
                    </Typography>
                }
                sx={{ opacity: props.open ? 1 : 0 }}
            />
        </ListItemButton>
    );
};

const PaddedDivider = () => {
    return (
        <Box style={{ paddingTop: 10, paddingBottom: 10 }}>
            <Divider variant="middle" sx={{ borderBottomWidth: 1, backgroundColor: ColorsEnum.warmgray1 }} />
        </Box>
    );
};

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
                    style={{ color: ColorsEnum.white }}
                >
                    {!props.open ? (
                        <ChevronRightIcon fontSize="small" />
                    ) : (
                        <ChevronLeftIcon fontSize="small" />
                    )}
                </IconButton>
            </S.DrawerHeader>
            <List>
                <PaddedDivider />

                <StyledListItemTIButton
                    text="Home"
                    open={props.open}
                    selected={location.pathname === ROUTES.OVERVIEW}
                    icon={<HomeIcon fontSize="small" />}
                    route={ROUTES.OVERVIEW}
                />

                <PaddedDivider />

                <ListItem disablePadding>
                    <StyledListItemButton
                        open={!props.open}
                        selected={location.pathname === ROUTES.PORTFOLIO}
                        onClick={() => navigate(ROUTES.PORTFOLIO)}
                    >
                        <MultilineChartIcon fontSize="small" color="inherit" />
                    </StyledListItemButton>
                </ListItem>

                <ListSubheader
                    component="div"
                    style={{
                        backgroundColor: 'transparent',
                    }}
                >
                    <ListItemText
                        primary={
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{
                                    fontWeight: 500,
                                    gap: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: ColorsEnum.coolgray3
                                }}
                            >
                                <div style={{ color: location.pathname === ROUTES.PORTFOLIO
                                            ? ColorsEnum.primary
                                            : ColorsEnum.white, display: 'flex'}}>
                                <MultilineChartIcon
                                    fontSize="small"
                                    color="inherit"
                                />
                                </div>
                                PORTFOLIOS
                            </Typography>
                        }
                        sx={{ opacity: props.open ? 1 : 0 }}
                    />{' '}
                </ListSubheader>
                {['Portfolio 1', 'Portfolio 2', 'Portfolio 3'].map((text, i) => (
                    <ListItem key={text} disablePadding sx={{ paddingTop: i === 0 ? 1 : 0 }}>
                        <StyledListItemButton padding="tight" open={props.open}>
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
