import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import React from "react";
import Loader from "./Loader";
export interface Column<T> {
  key: keyof T | string;
  header: string;
  width?: string | number;
  render?: (row: T) => React.ReactNode;
}

interface Props<T extends { id: string | number }> {
  title?: string;
  rows: T[];
  columns: Column<T>[];
  emptyMessage?: string;
  onDelete?: (row: T) => void;
  loading?: boolean;
}

function DataTable<T extends { id: string | number }>({
  title,
  rows,
  columns,
  emptyMessage = "No data found",
  onDelete,
  loading,
}: Props<T>) {
  const fullColSpan = columns.length + (onDelete ? 1 : 0);
  return (
    <Paper sx={{ p: 2 }}>
      {title && (
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          {title}
        </Typography>
      )}

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={String(col.key)}
                  sx={{ width: col.width, fontWeight: 600 }}
                >
                  {col.header}
                </TableCell>
              ))}

              {onDelete && (
                <TableCell align="right" sx={{ fontWeight: 600 }}>
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          {loading && (
            <TableRow>
              <TableCell colSpan={fullColSpan} align="center">
                <Loader />
              </TableCell>
            </TableRow>
          )}
          <TableBody>
            {!loading && rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  sx={{ py: 3 }}
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((col) => (
                    <TableCell key={String(col.key)}>
                      {col.render
                        ? col.render(row)
                        : (row[col.key as keyof T] as any)}
                    </TableCell>
                  ))}
                  {onDelete && (
                    <TableCell align="right">
                      <Button
                        color="error"
                        variant="outlined"
                        size="small"
                        onClick={() => onDelete(row)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default DataTable;
