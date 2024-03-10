import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/system";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { ColorsEnum } from "common/theme";

export const StyledMenu = styled(Menu)(({ theme }) => ({
  width: `calc(350px + 2vw)`,
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  gap: 5,
  fontWeight: "bold",
  width: `calc(350px + 2vw)`,
  whiteSpace: "unset",
  wordBreak: "break-all",
}));

export const StyledMenuButton = styled(Button)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? ColorsEnum.white : ColorsEnum.black,
  "&:hover": {
    cursor: "pointer",
  },
  borderRadius: "20px",
}));

export const ButtonSubtitles = styled(Typography)(({ theme }) => ({
  color:
    theme.palette.mode === "dark" ? ColorsEnum.warmgray5 : ColorsEnum.warmgray2,
  width: "100%",
}));

export const NavigationPanel = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  padding: `${theme.spacing(1)} 0`,
}));

export const IconStackWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  gap: 10,
  width: "100%",
}));

export const IconButtonWrapper = styled(IconButton)(({ theme }) => ({
  padding: 0,
  paddingLeft: 5,
  paddingRight: 5,
  borderRadius: 0,
}));
