import { TableContainer } from "@mui/material";
import { styled } from "@mui/system";

export const TransactionsWrapper = styled(TableContainer)(({ theme }) => ({
    height: "100%",
    overflowY: "hidden",
}));
export const TransactionTableWrapper = styled("div")(({ theme }) => ({
    height: "500px",
    overflowY: "auto",
    "&::-webkit-scrollbar": { display: "none" },
}));