import React, { useState } from 'react';

import {
  Table,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  TableContainer,
  TableSortLabel,
} from '@mui/material';

interface DataItem {
  orderNumber: string;
  purchaseDate: string;
  event: string;
  sector: string;
  tribune: string;
  type: string;
  seat: string;
  paymentMethod: string;
  salesChannel: string;
  checkoutStatus: string;
  fanName: string;
  fanPhone: string;
  fanDocument: string;
  fanEmail: string;
  fanBirthDate: string;
  advisorId: string;
  advisorEmail: string;
  discountCode: string;
  price: number;
  discountApplied: number;
  itemsQuantity: number;
  totalAmount: number;
  checkoutId: string;
}

type SortConfig = {
  key: keyof DataItem;
  direction: 'asc' | 'desc';
} | null;

const TableSales: React.FC = () => {
  const initialData: DataItem[] = [
    {
      orderNumber: '1',
      purchaseDate: '2023-01-01',
      event: 'Concierto A',
      sector: 'VIP',
      tribune: 'Norte',
      type: 'Entrada',
      seat: 'A1',
      paymentMethod: 'Tarjeta',
      salesChannel: 'Online',
      checkoutStatus: 'Completado',
      fanName: 'Juan Pérez',
      fanPhone: '1234567890',
      fanDocument: '1234567',
      fanEmail: 'juan@example.com',
      fanBirthDate: '1990-01-01',
      advisorId: 'AS001',
      advisorEmail: 'asesor@example.com',
      discountCode: 'DESC10',
      price: 100,
      discountApplied: 10,
      itemsQuantity: 1,
      totalAmount: 90,
      checkoutId: 'CHK001',
    },
    {
      orderNumber: '2',
      purchaseDate: '2023-02-01',
      event: 'Concierto B',
      sector: 'General',
      tribune: 'Sur',
      type: 'Entrada',
      seat: 'B2',
      paymentMethod: 'Efectivo',
      salesChannel: 'Taquilla',
      checkoutStatus: 'Pendiente',
      fanName: 'Ana García',
      fanPhone: '0987654321',
      fanDocument: '7654321',
      fanEmail: 'ana@example.com',
      fanBirthDate: '1985-05-15',
      advisorId: 'AS002',
      advisorEmail: 'asesor2@example.com',
      discountCode: 'DESC20',
      price: 80,
      discountApplied: 20,
      itemsQuantity: 2,
      totalAmount: 120,
      checkoutId: 'CHK002',
    },
    {
      orderNumber: '3',
      purchaseDate: '2023-03-01',
      event: 'Concierto C',
      sector: 'Preferencial',
      tribune: 'Este',
      type: 'Entrada',
      seat: 'C3',
      paymentMethod: 'Tarjeta',
      salesChannel: 'Online',
      checkoutStatus: 'Cancelado',
      fanName: 'Carlos López',
      fanPhone: '1122334455',
      fanDocument: '112233',
      fanEmail: 'carlos@example.com',
      fanBirthDate: '1992-10-30',
      advisorId: 'AS003',
      advisorEmail: 'asesor3@example.com',
      discountCode: 'DESC30',
      price: 150,
      discountApplied: 30,
      itemsQuantity: 1,
      totalAmount: 120,
      checkoutId: 'CHK003',
    },
  ];

  const [data, setData] = useState<DataItem[]>(initialData);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [filterText, setFilterText] = useState<string>('');

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

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  return (
    <div>
      <TextField
        label="Filter"
        variant="outlined"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        style={{ marginBottom: '20px' }}
        size='small'
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                'orderNumber',
                'purchaseDate',
                'event',
                'sector',
                'tribune',
                'type',
                'seat',
                'paymentMethod',
                'salesChannel',
                'checkoutStatus',
                'fanName',
                'fanPhone',
                'fanDocument',
                'fanEmail',
                'fanBirthDate',
                'advisorId',
                'advisorEmail',
                'discountCode',
                'price',
                'discountApplied',
                'itemsQuantity',
                'totalAmount',
                'checkoutId',
              ].map((column) => (
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
              <TableRow key={item.orderNumber}>
                <TableCell>{item.orderNumber}</TableCell>
                <TableCell>{item.purchaseDate}</TableCell>
                <TableCell>{item.event}</TableCell>
                <TableCell>{item.sector}</TableCell>
                <TableCell>{item.tribune}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.seat}</TableCell>
                <TableCell>{item.paymentMethod}</TableCell>
                <TableCell>{item.salesChannel}</TableCell>
                <TableCell>{item.checkoutStatus}</TableCell>
                <TableCell>{item.fanName}</TableCell>
                <TableCell>{item.fanPhone}</TableCell>
                <TableCell>{item.fanDocument}</TableCell>
                <TableCell>{item.fanEmail}</TableCell>
                <TableCell>{item.fanBirthDate}</TableCell>
                <TableCell>{item.advisorId}</TableCell>
                <TableCell>{item.advisorEmail}</TableCell>
                <TableCell>{item.discountCode}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.discountApplied}</TableCell>
                <TableCell>{item.itemsQuantity}</TableCell>
                <TableCell>{item.totalAmount}</TableCell>
                <TableCell>{item.checkoutId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableSales;
