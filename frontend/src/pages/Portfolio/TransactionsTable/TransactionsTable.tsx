import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, Button, IconButton, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import AddBoxIcon from '@mui/icons-material/AddBox';

type TransactionEntry = {
  id: string;
  ticker: string;
  transactionFee: number;
  broker: string;
  assetType: string;
  executionPrice: number;
  type: 'long' | 'short';
  units: number;
  remarks: string;
};

const fields = [
  { id: 'ticker', label: 'Ticker', type: 'text' },
  { id: 'transactionFee', label: 'Transaction Fee', type: 'float' },
  { id: 'broker', label: 'Broker', type: 'text' },
  { id: 'assetType', label: 'Asset Type', type: 'text' },
  { id: 'executionPrice', label: 'Execution Price', type: 'float' },
  { id: 'type', label: 'Type', type: 'select', options: ['long', 'short'] },
  { id: 'units', label: 'Units', type: 'integer' },
  { id: 'remarks', label: 'Remarks', type: 'text' },
];

const TransactionsTable: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionEntry[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  // Determine if there's an unconfirmed transaction
  const hasUnconfirmedTransaction = transactions.some(transaction => transaction.id?.startsWith('temp-'));

  const handleAdd = () => {
    if (hasUnconfirmedTransaction) {
      alert('Please confirm the current transaction before adding a new one.');
      return; // Prevent adding new transaction if there's an unconfirmed transaction
    }

    const newTransaction: TransactionEntry = {
      id: `temp-${new Date().getTime()}`, // Temporary ID
      ticker: '',
      transactionFee: 0,
      broker: '',
      assetType: '',
      executionPrice: 0,
      type: 'long', // Default value
      units: 0,
      remarks: '',
    };
    setTransactions([newTransaction, ...transactions]);
    setEditId(newTransaction.id);
  };

  const handleChange = (id: string, field: string, value: any) => {
    setTransactions(transactions.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleDelete = async (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
    if (editId === id) setEditId(null); // Reset editId if the deleted transaction was being edited
  };

  const handleSave = async (transaction: TransactionEntry) => {
    // Here you would typically send the transaction to your backend for saving
    // For demonstration, replace the temporary ID with a unique identifier
    const updatedTransactions = transactions.map(t => {
      if (t.id === transaction.id) {
        // Simulate a save operation by changing its ID
        return { ...t, id: `confirmed-${new Date().getTime()}` };
      }
      return t;
    });
    setTransactions(updatedTransactions);
    setEditId(null); // Exit edit mode
  };

  return (
    <div>
      <Button startIcon={<AddBoxIcon />} onClick={handleAdd} variant="contained" color="primary" style={{ marginBottom: '20px' }}
        disabled={hasUnconfirmedTransaction} // Disable button if there's an unconfirmed transaction
      >
        Add Transaction
      </Button>

      <Table size="small">
        <TableHead>
          <TableRow>
            {fields.map(field => (
              <TableCell key={field.id} sx={{ py: 0.5 }}>{field.label}</TableCell>
            ))}
            <TableCell sx={{ py: 0.5 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow key={transaction.id || index}>
              {fields.map(field => (
                <TableCell key={field.id} sx={{ py: 0.5 }}>
                  {editId === transaction.id ? (
                    field.type === 'select' ? (
                      <Select
                        value={transaction[field.id as keyof TransactionEntry]}
                        onChange={(e) => handleChange(transaction.id || '', field.id, e.target.value)}
                        fullWidth
                        size="small"
                      >
                        {field.options?.map(option => (
                          <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                      </Select>
                    ) : (
                      <TextField
                        type={field.type === 'integer' || field.type === 'float' ? 'number' : 'text'}
                        value={transaction[field.id as keyof TransactionEntry]}
                        onChange={(e) => handleChange(transaction.id || '', field.id, e.target.value)}
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    )
                  ) : (
                    transaction[field.id as keyof TransactionEntry]?.toString()
                  )}
                </TableCell>
              ))}
              <TableCell sx={{ py: 0.5 }}>
                {editId === transaction.id ? (
                  <IconButton color="primary" onClick={() => handleSave(transaction)}>
                    <CheckIcon />
                  </IconButton>
                ) : (
                  <IconButton color="secondary" onClick={() => handleDelete(transaction.id || '')}>
                    <DeleteIcon />
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
