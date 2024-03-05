import React from "react";
import { Avatar, Divider, Menu, MenuItem, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import { app } from "../../../common/firebase/firebase";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "common/constant";
import { useCookies } from "react-cookie";
import ToggleThemeMode from "./ToggleThemeMode";

const ProfileButton: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const [, , removeCookies] = useCookies();

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
      removeCookies("user");
    });
    handleMenuClose();
  };

  return (
    <div>
      <Avatar
        onClick={handleMenuOpen}
        style={{ cursor: "pointer" }}
        sx={{ width: 30, height: 30 }}
      />

      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem>
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              gap: 50,
            }}
          >
            <Typography variant="h3"> Light Theme </Typography>
            <div style={{ justifyContent: "flex-end" }}>
              <ToggleThemeMode />
            </div>
          </div>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <Typography variant="h3"> Logout </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileButton;
