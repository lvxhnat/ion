import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { GetUserPortfolios, createUserPortfolio } from "./requests";
import { useThemeStore } from "store/theme";
import { AuthContext } from "providers/AuthProvider/AuthProvider";

interface PortfolioDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

const PortfolioDialog: React.FC<PortfolioDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    onSubmit(name);
    onClose(); // Close the dialog upon submission
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>Create a Portfolio</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Portfolio Name"
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

interface PortfolioPopupProps {
  portfolios: GetUserPortfolios[];
  setPortfolios: (value: GetUserPortfolios[]) => void;
}

export default function PortfolioPopup(props: PortfolioPopupProps) {
  const [open, setOpen] = useState(false);
  const theme = useThemeStore();
  const { user } = React.useContext(AuthContext)!;

  React.useEffect(() => {}, [user]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = (name: string) => {
    if (user)
      createUserPortfolio(user.uid, name).then((res) =>
        props.setPortfolios([...props.portfolios, res.data])
      );
  };

  return (
    <div>
      <Button
        variant={theme.mode === "dark" ? "outlined" : "contained"}
        onClick={handleOpen}
      >
        <Typography variant="h3" fontWeight="bold">
          Create Portfolio
        </Typography>
      </Button>
      <PortfolioDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
