import React from 'react';
import { Avatar, Menu, MenuItem } from '@mui/material';
import { getAuth } from 'firebase/auth';
import { app } from '../../../common/firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'common/constant';
import { useCookies } from 'react-cookie';

const ProfileButton: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const [cookies, , removeCookies] = useCookies(['access_token', 'refresh_token']);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        const auth = getAuth(app);
        auth.signOut().then(() => {
            navigate(ROUTES.SIGNIN);
            removeCookies('access_token');
            removeCookies('refresh_token');
        });
        handleMenuClose();
    };

    return (
        <div>
            <Avatar
                onClick={handleMenuOpen}
                style={{ cursor: 'pointer' }}
                sx={{ width: 30, height: 30 }}
            />

            <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                <MenuItem onClick={handleLogout}>Dark Color Theme</MenuItem>
            </Menu>
        </div>
    );
};

export default ProfileButton;
