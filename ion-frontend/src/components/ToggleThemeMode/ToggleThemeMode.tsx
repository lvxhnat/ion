import { useThemeStore } from 'store/theme';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function ToggleThemeMode() {
  const { mode, setMode } = useThemeStore();

  const handleClick = () => {
    setMode();
  };

  if (!mode) return null;

  return (
    <IconButton aria-label="delete" onClick={handleClick} disableRipple>
      {mode === 'dark' ? (
        <Brightness7Icon data-testid="theme-mode-light-id" />
      ) : (
        <Brightness4Icon data-testid="theme-mode-dark-id" />
      )}
    </IconButton>
  );
};

export default ToggleThemeMode;
