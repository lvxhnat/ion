import * as React from "react";
import * as S from "./style";
import { v4 as uuid } from "uuid";
import {
  Button,
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

import { TransactionEntry } from "./type"; // Ensure this import matches your type definition
import {
  deletePortfolioTransaction,
  getPortfolioTransactions,
  insertPortfolioTransaction,
} from "../request";
import moment from "moment";

interface Field {
  id: string;
  label: string;
  type: "text" | "number" | "select" | "date";
  options?: string[];
}

const fields: Field[] = [
  { id: "transaction_date", label: "Date", type: "date" },
  { id: "ticker", label: "Ticker", type: "text" },
  { id: "type", label: "Type", type: "select", options: ["Buy", "Sell", "Dividend"] },
  { id: "execution_price", label: "Exec Price", type: "number" },
  { id: "units", label: "Units", type: "number" },
  { id: "fees", label: "Fee", type: "number" },
  { id: "broker", label: "Broker", type: "text" },
  { id: "remarks", label: "Remarks", type: "text" },
];

interface TransactionsTableProps {
  portfolioId: string;
}

export default function TransactionsTable(props: TransactionsTableProps) {
  const [rowActive, setRowActive] = React.useState<boolean>(false);
  const [transactions, setTransactions] = React.useState<TransactionEntry[]>(
    []
  );
  const [editId, setEditId] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Get the transactions existing in the portfolio
    getPortfolioTransactions(props.portfolioId).then((res) => {
      setTransactions(
        res.data.map((t) => {
          return {
            ...t,
            transaction_date: new Date(t["transaction_date"]),
          };
        })
      );
    });
  }, []);

  const handleAdd = () => {
    const newTransaction: TransactionEntry = {
      transaction_id: uuid(),
      portfolio_id: props.portfolioId,
      transaction_date: new Date(),
      ticker: "",
      fees: 0,
      broker: "",
      execution_price: 0,
      type: "Buy",
      units: 0,
      remarks: "",
    };
    setTransactions([newTransaction, ...transactions]);
    setEditId(newTransaction.transaction_id);
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

  const handleSave = (transaction: TransactionEntry) => {
    if (
      transaction.units === 0 ||
      transaction.execution_price === 0 ||
      transaction.ticker === ""
    ) {
      alert(
        "Please ensure units and execution price are not 0, and ticker is not empty."
      );
      return; // Stop the save operation if conditions are not met
    }

    setEditId(null);
    const newTransactions = transactions.map((t) =>
      t.transaction_id === transaction.transaction_id ? transaction : t
    );
    insertPortfolioTransaction(props.portfolioId, transaction);
    setTransactions(newTransactions);
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
        <Table
          stickyHeader
          size="small"
          sx={{ tableLayout: "fixed", width: "100%", height: "100%" }}
        >
          <TableHead>
            <TableRow>
              {fields.map((field) => (
                <TableCell
                  key={field.id}
                  sx={{
                    py: 0.5,
                    width:
                      field.id === "remarks" || field.id === "transaction_date"
                        ? "15%"
                        : "10%",
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
                {fields.map((field) => (
                  <TableCell key={field.id} sx={{ py: 0.5 }}>
                    {editId === transaction.transaction_id ? (
                      field.type === "select" ? (
                        <Select
                          value={
                            transaction[field.id as keyof TransactionEntry]
                          }
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
                          value={transaction[
                            field.id as keyof TransactionEntry
                          ].toString()}
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
                        {field.id === 'transaction_date' ? moment( transaction[
                            field.id as keyof TransactionEntry
                          ]).format("YYYY-MM-DD") : transaction[
                            field.id as keyof TransactionEntry
                          ].toString()}
                      </Typography>
                    )}
                  </TableCell>
                ))}
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
