import * as React from "react";
import { v4 as uuid } from "uuid";
import {
  Button,
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
import { deletePortfolioTransaction, getPortfolioTransactions, insertPortfolioTransaction } from "../request";

interface Field {
  id: string;
  label: string;
  type: "text" | "number" | "select" | "date";
  options?: string[];
}

const fields: Field[] = [
  { id: "transaction_date", label: "Date", type: "date" },
  { id: "ticker", label: "Ticker", type: "text" },
  { id: "type", label: "Type", type: "select", options: ["Buy", "Sell"] },
  { id: "execution_price", label: "Exec Price", type: "number" },
  { id: "units", label: "Units", type: "number" },
  { id: "fee", label: "Fee", type: "number" },
  { id: "assetType", label: "Asset Type", type: "text" },
  { id: "broker", label: "Broker", type: "text" },
  { id: "remarks", label: "Remarks", type: "text" },
];

interface TransactionsTableProps {
  portfolioId: string
}

const formatString = (value: any, field: string) => {
  return (field === 'transaction_date') ? value.toLocaleString() : value
}

export default function TransactionsTable(props: TransactionsTableProps) {
  const [transactions, setTransactions] = React.useState<TransactionEntry[]>([]);
  const [editId, setEditId] = React.useState<string | null>(null);

  React.useEffect(() => {
    getPortfolioTransactions(props.portfolioId).then((res) => {
      setTransactions(res.data)
    })
  }, [])

  const hasUnconfirmedTransaction = transactions.some((transaction) =>
    transaction.transaction_id?.startsWith("temp-")
  );

  const handleAdd = () => {
    if (hasUnconfirmedTransaction) {
      alert("Please confirm the current transaction before adding a new one.");
      return;
    }
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
  };

  const handleChange = (id: string, field: string, value: any) => {
    setTransactions(
      transactions.map((t) => (t.transaction_id === id ? { ...t, [field]: value } : t))
    );
  };

  const handleDelete = (id: string) => {
    setTransactions(transactions.filter((t) => t.transaction_id !== id));
    if (editId === id) setEditId(null);
    deletePortfolioTransaction(id)
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

    const updatedTransactions = transactions.map((t) => {
      if (t.transaction_id === transaction.transaction_id) {
        return { ...t, id: `confirmed-${new Date().getTime()}` };
      }
      return t;
    });
    setTransactions(updatedTransactions);
    setEditId(null);
    // Insert Transaction
    insertPortfolioTransaction(props.portfolioId, transaction)
  };

  const handleEdit = (id: string) => {
    setEditId(id);
  };

  return (
    <div>
      <Button
        startIcon={<AddBoxIcon />}
        onClick={handleAdd}
        variant="contained"
        color="primary"
        style={{ marginBottom: "20px" }}
        disabled={hasUnconfirmedTransaction}
      >
        <Typography variant="subtitle1">Add Transaction</Typography>
      </Button>

      <Table size="small" sx={{ tableLayout: "fixed", width: "100%" }}>
        <TableHead>
          <TableRow>
            {fields.map((field) => (
              <TableCell
                key={field.id}
                sx={{
                  py: 0.5,
                  width: field.id === "remarks" || field.id === "transactionDate" ? "15%" : "10%",
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                }}
              >
                <Typography variant="subtitle1">{field.label}</Typography>
              </TableCell>
            ))}
            <TableCell sx={{ py: 0.5, width: "15%" }}></TableCell>
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
                        value = {formatString(transaction[field.id as keyof TransactionEntry], field.id)}
                        onChange={(e) =>
                          handleChange(transaction.transaction_id, field.id, e.target.value)
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
                        value={transaction[field.id as keyof TransactionEntry]}
                        onChange={(e) =>
                          handleChange(transaction.transaction_id, field.id, e.target.value)
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
                      {transaction[
                        field.id as keyof TransactionEntry
                      ]?.toString()}
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
    </div>
  );
}
