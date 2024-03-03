import React, { useState } from "react";
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

interface Field {
  id: string;
  label: string;
  type: "text" | "float" | "integer" | "select";
  options?: string[];
}

const fields: Field[] = [
  { id: "ticker", label: "Ticker", type: "text" },
  { id: "fee", label: "Fee", type: "float" },
  { id: "broker", label: "Broker", type: "text" },
  { id: "assetType", label: "Asset Type", type: "text" },
  { id: "executionPrice", label: "Exec Price", type: "float" },
  { id: "type", label: "Type", type: "select", options: ["long", "short"] },
  { id: "units", label: "Units", type: "integer" },
  { id: "remarks", label: "Remarks", type: "text" },
];

const TransactionsTable: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionEntry[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  const hasUnconfirmedTransaction = transactions.some((transaction) =>
    transaction.id?.startsWith("temp-")
  );

  const handleAdd = () => {
    if (hasUnconfirmedTransaction) {
      alert("Please confirm the current transaction before adding a new one.");
      return;
    }

    const newTransaction: TransactionEntry = {
      id: `temp-${new Date().getTime()}`,
      ticker: "",
      fee: 0,
      broker: "",
      assetType: "",
      executionPrice: 0,
      type: "long",
      units: 0,
      remarks: "",
    };
    setTransactions([newTransaction, ...transactions]);
    setEditId(newTransaction.id);
  };

  const handleChange = (id: string, field: string, value: any) => {
    setTransactions(
      transactions.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const handleDelete = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
    if (editId === id) setEditId(null);
  };

  const handleSave = (transaction: TransactionEntry) => {
    if (
      transaction.units === 0 ||
      transaction.executionPrice === 0 ||
      transaction.ticker === ""
    ) {
      alert(
        "Please ensure units and execution price are not 0, and ticker is not empty."
      );
      return; // Stop the save operation if conditions are not met
    }

    const updatedTransactions = transactions.map((t) => {
      if (t.id === transaction.id) {
        return { ...t, id: `confirmed-${new Date().getTime()}` };
      }
      return t;
    });
    setTransactions(updatedTransactions);
    setEditId(null);
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
        <Typography variant="subtitle1">
          Add Transaction
        </Typography>
      </Button>

      <Table size="small" sx={{ tableLayout: "fixed", width: "100%" }}>
        <TableHead>
          <TableRow>
            {fields.map((field) => (
              <TableCell
                key={field.id}
                sx={{
                  py: 0.5,
                  width: field.id === "remarks" ? "20%" : "10%",
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
            <TableRow key={transaction.id}>
              {fields.map((field) => (
                <TableCell key={field.id} sx={{ py: 0.5 }}>
                  {editId === transaction.id ? (
                    field.type === "select" ? (
                      <Select
                        value={transaction[field.id as keyof TransactionEntry]}
                        onChange={(e) =>
                          handleChange(transaction.id, field.id, e.target.value)
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
                        type={
                          field.type === "integer" || field.type === "float"
                            ? "number"
                            : "text"
                        }
                        value={transaction[field.id as keyof TransactionEntry]}
                        onChange={(e) =>
                          handleChange(transaction.id, field.id, e.target.value)
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
                  onClick={() => handleDelete(transaction.id)}
                >
                  <DeleteIcon />
                </IconButton>
                {editId === transaction.id && (
                  <IconButton
                    color="primary"
                    onClick={() => handleSave(transaction)}
                  >
                    <CheckIcon />
                  </IconButton>
                )}
                {editId !== transaction.id && (
                  <IconButton
                    color="default"
                    onClick={() => handleEdit(transaction.id)}
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
};

export default TransactionsTable;
