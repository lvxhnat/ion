import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeStore } from "../../../store/theme";

function ToggleThemeMode() {
  const { mode, setMode } = useThemeStore();

  const handleClick = () => {
    setMode();
  };

  if (!mode) return null;

  return (
    <IconButton
      onClick={handleClick}
      disableRipple
      color="inherit"
      style={{ border: "1px solid white", width: 35, height: 35 }}
    >
      {mode === "dark" ? (
        <Brightness7Icon fontSize="small" data-testid="theme-mode-light-id" />
      ) : (
        <Brightness4Icon fontSize="small" data-testid="theme-mode-dark-id" />
      )}
    </IconButton>
  );
}

export default ToggleThemeMode;
