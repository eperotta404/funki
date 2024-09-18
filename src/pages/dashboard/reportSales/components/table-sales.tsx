import React, { useState } from 'react';

import {
  Table, Paper, TableRow, TableBody, TableCell, TableHead, TextField, TableContainer, TableSortLabel
} from '@mui/material';

// Definición de tipos para los datos
interface DataItem {
  id: number;
  status: string;
  name: string;
  email: string;
  phone: string;
}

type SortConfig = {
  key: keyof DataItem;
  direction: 'asc' | 'desc';
} | null;

const TableSales: React.FC = () => {
  // Datos de prueba
  const initialData: DataItem[] = [
    { id: 1, status: 'Active', name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, status: 'Inactive', name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
    { id: 3, status: 'Active', name: 'Alice Johnson', email: 'alice@example.com', phone: '555-555-5555' },
    { id: 4, status: 'Inactive', name: 'Bob Brown', email: 'bob@example.com', phone: '444-444-4444' },
    { id: 5, status: 'Active', name: 'Charlie Green', email: 'charlie@example.com', phone: '333-333-3333' },
  ];

  const [data, setData] = useState<DataItem[]>(initialData);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [filterText, setFilterText] = useState<string>('');

  // Función para ordenar datos
  const sortData = (key: keyof DataItem) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
  };

  // Función para filtrar datos
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  return (
    <>
      <TextField
        label="Filter"
        variant="outlined"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        style={{ marginBottom: '20px' }}
        fullWidth
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {['id', 'status', 'name', 'email', 'phone'].map((column) => (
                <TableCell key={column}>
                  <TableSortLabel
                    active={sortConfig?.key === column}
                    direction={sortConfig?.key === column ? sortConfig.direction : 'asc'}
                    onClick={() => sortData(column as keyof DataItem)}
                  >
                    {column.charAt(0).toUpperCase() + column.slice(1)}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableSales;
