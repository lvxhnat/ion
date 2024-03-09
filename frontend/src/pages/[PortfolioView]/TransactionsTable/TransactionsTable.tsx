import * as React from "react";
import * as S from "../style";
import { v4 as uuid } from "uuid";
import {
  Button,
  Chip,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { TickerEntry } from "./type"; // Ensure this import matches your type definition
import {
  deletePortfolioTransaction,
  getPortfolioTickers,
  insertPortfolioTransaction,
} from "../request";
import { ColorsEnum } from "common/theme";

interface Field {
  id: string;
  label: string;
  type: "text" | "number" | "select";
  options?: string[];
}

const fields: Field[] = [
  { id: "ticker", label: "Ticker", type: "text" },
  {
    id: "type",
    label: "Type",
    type: "select",
    options: ["Buy", "Sell", "Dividend"],
  },
  { id: "units", label: "Units", type: "number" },
  { id: "remarks", label: "Remarks", type: "text" },
];

interface TransactionsTableProps {
  portfolioId: string;
}

type TypeCellProps = "Buy" | "Sell" | "Dividend";
const TypeCell = (props: { type: TypeCellProps }) => {
  const colors = {
    Buy: ColorsEnum.green,
    Sell: ColorsEnum.red,
    Dividend: ColorsEnum.yellow,
  };
  return (
    <Chip
      size="small"
      label={props.type}
      style={{
        backgroundColor: colors[props.type],
        color: ColorsEnum.white,
        fontSize: `calc(0.5rem + 0.3vw)`,
      }}
    />
  );
};

export default function TransactionsTable(props: TransactionsTableProps) {
  const [rowActive, setRowActive] = React.useState<boolean>(false);
  const [transactions, setTransactions] = React.useState<TickerEntry[]>([]);
  const [editId, setEditId] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Get the transactions existing in the portfolio
    getPortfolioTickers(props.portfolioId).then((res) => {
      setTransactions(res.data);
    });
  }, []);

  const handleAdd = () => {
    const newTicker: TickerEntry = {
      transaction_id: uuid(),
      portfolio_id: props.portfolioId,
      ticker: "",
      type: "Buy",
      units: 0,
      remarks: "",
    };
    setTransactions([newTicker, ...transactions]);
    setEditId(newTicker.transaction_id);
    setRowActive(true);
  };

  const handleChange = (id: string, field: string, value: any) => {
    setTransactions(
      transactions.map((t) =>
        t.transaction_id === id ? { ...t, [field]: value } : t
      )
    );
  };

  const handleDelete = (id: string) => {
    setTransactions(transactions.filter((t) => t.transaction_id !== id));
    if (editId === id) setEditId(null);
    deletePortfolioTransaction(id);
    setRowActive(false);
  };

  const handleSave = (transaction: TickerEntry) => {
    if (transaction.units === 0 || transaction.ticker === "") {
      alert("Please ensure units are not 0, and ticker is not empty.");
      return; // Stop the save operation if conditions are not met
    }

    setEditId(null);
    const newTickers = transactions.map((t) =>
      t.transaction_id === transaction.transaction_id ? transaction : t
    );
    insertPortfolioTransaction(props.portfolioId, transaction);
    setTransactions(newTickers);
    setRowActive(false);
  };

  const handleEdit = (id: string) => {
    setEditId(id);
    setRowActive(true);
  };

  return (
    <S.TransactionsWrapper>
      <Grid container display="flex" justifyContent="flex-end">
        <Button
          startIcon={<AddBoxIcon />}
          onClick={handleAdd}
          variant="contained"
          color="primary"
          style={{ marginBottom: "20px" }}
          disabled={rowActive}
        >
          <Typography variant="subtitle1">Add Transaction</Typography>
        </Button>
      </Grid>
      <S.TransactionTableWrapper>
        <Table stickyHeader size="small" sx={{ width: "100%", height: "100%" }}>
          <TableHead>
            <TableRow>
              {fields.map((field) => (
                <TableCell
                  key={field.id}
                  sx={{
                    py: 0.5,
                    width: field.id === "remarks" ? "15%" : "10%",
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                  }}
                >
                  <Typography variant="subtitle1">{field.label}</Typography>
                </TableCell>
              ))}
              <TableCell sx={{ py: 0.5, width: "10%" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.transaction_id}>
                {fields.map((field) => {
                  const value = transaction[field.id as keyof TickerEntry];
                  return (
                    <TableCell key={field.id} sx={{ py: 0.5 }}>
                      {editId === transaction.transaction_id ? (
                        field.type === "select" ? (
                          <Select
                            value={value}
                            onChange={(e) =>
                              handleChange(
                                transaction.transaction_id,
                                field.id,
                                e.target.value
                              )
                            }
                            fullWidth
                            size="small"
                          >
                            {field.options?.map((option) => (
                              <MenuItem key={option} value={option}>
                                <Typography variant="subtitle1">
                                  {option}
                                </Typography>
                              </MenuItem>
                            ))}
                          </Select>
                        ) : (
                          <TextField
                            type={field.type}
                            value={value.toString()}
                            onChange={(e) =>
                              handleChange(
                                transaction.transaction_id,
                                field.id,
                                e.target.value
                              )
                            }
                            variant="outlined"
                            size="small"
                            fullWidth
                            inputProps={{
                              style: {
                                fontSize: "calc(0.5rem + 0.3vw)",
                              },
                            }}
                          />
                        )
                      ) : (
                        <Typography variant="subtitle1">
                          {field.id === "type" ? (
                            <TypeCell type={value as TypeCellProps} />
                          ) : (
                            value.toString()
                          )}
                        </Typography>
                      )}
                    </TableCell>
                  );
                })}
                <TableCell sx={{ py: 0.5 }}>
                  {/* Always show the delete button */}
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(transaction.transaction_id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  {editId === transaction.transaction_id && (
                    <IconButton
                      color="primary"
                      onClick={() => handleSave(transaction)}
                    >
                      <CheckIcon />
                    </IconButton>
                  )}
                  {editId !== transaction.transaction_id && (
                    <IconButton
                      color="default"
                      onClick={() => handleEdit(transaction.transaction_id)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </S.TransactionTableWrapper>
    </S.TransactionsWrapper>
  );
}
