import React from "react";
import { Avatar, Divider, Menu, MenuItem, Typography } from "@mui/material";
import ToggleThemeMode from "./ToggleThemeMode";
import { AuthContext } from "providers/AuthProvider/AuthProvider";

const ProfileButton: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { user, logout } = React.useContext(AuthContext)!;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Avatar
        onClick={handleMenuOpen}
        style={{ cursor: "pointer" }}
        sx={{ width: 30, height: 30 }}
        src={user?.photoURL ?? ""}
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
        <MenuItem onClick={logout}>
          <Typography variant="h3"> Logout </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileButton;
