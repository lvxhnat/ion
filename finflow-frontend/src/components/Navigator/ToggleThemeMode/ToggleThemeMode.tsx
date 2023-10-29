import * as React from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeStore } from "../../../store/theme";
import StyledIconButton from "../../Button/StyledIconButton";

function ToggleThemeMode() {
  const { mode, setMode } = useThemeStore();

  const handleClick = () => {
    setMode();
  };

  if (!mode) return null;

  return (
    <StyledIconButton onClick={handleClick}>
      {mode === "dark" ? (
        <Brightness7Icon fontSize="small" data-testid="theme-mode-light-id" />
      ) : (
        <Brightness4Icon fontSize="small" data-testid="theme-mode-dark-id" />
      )}
    </StyledIconButton>
  );
}

export default ToggleThemeMode;
