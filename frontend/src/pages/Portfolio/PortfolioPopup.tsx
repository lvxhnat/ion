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
import { useFirebaseUserStore } from "store/user/user";
import { useThemeStore } from "store/theme";

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
  const user = useFirebaseUserStore((state) => state.user);

  React.useEffect(() => {}, [user]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = (name: string) => {
    if (user)
      createUserPortfolio(user.user_id, name).then((res) =>
        props.setPortfolios([...props.portfolios, res.data])
      );
  };

  return (
    <div>
      <Button
        variant={theme.mode === "dark" ? "outlined" : "contained"}
        onClick={handleOpen}
      >
        <Typography variant="h3">Create Portfolio</Typography>
      </Button>
      <PortfolioDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
