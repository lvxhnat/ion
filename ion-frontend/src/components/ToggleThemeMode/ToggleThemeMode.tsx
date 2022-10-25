import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeStore } from 'store/theme';

function ToggleThemeMode() {
  const { mode, setMode } = useThemeStore();

  const handleClick = () => {
    setMode();
  };

  if (!mode) return null;

  return (
    <IconButton aria-label="delete" onClick={handleClick}>
      {mode === 'dark' ? (
        <LightModeIcon data-testid="theme-mode-light-id" />
      ) : (
        <DarkModeIcon data-testid="theme-mode-dark-id" />
      )}
    </IconButton>
  );
};

export default ToggleThemeMode;
