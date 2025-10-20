'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Column {
  key: string;
  label: string;
  width?: string;
  render?: (value: any, row: any) => ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onRowClick?: (row: any) => void;
}

const TableWrapper = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadiusLg};
  box-shadow: ${props => props.theme.shadows.small};
  overflow: hidden;
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background: ${props => props.theme.colors.secondary};
  border-bottom: 2px solid ${props => props.theme.colors.border};
`;

const TableRow = styled(motion.tr)<{ $clickable?: boolean }>`
  border-bottom: 1px solid ${props => props.theme.colors.border};
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};
  transition: background 0.2s ease;

  &:hover {
    background: ${props => props.$clickable ? props.theme.colors.secondary : 'transparent'};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableHeader = styled.th<{ $width?: string }>`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  text-align: left;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  width: ${props => props.$width || 'auto'};
`;

const TableCell = styled.td`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.text};
`;

const EmptyState = styled.div`
  padding: ${props => props.theme.spacing['2xl']};
  text-align: center;
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.fontSizes.md};
`;

export const DataTable: React.FC<DataTableProps> = ({ columns, data, onRowClick }) => {
  if (data.length === 0) {
    return (
      <TableWrapper>
        <EmptyState>No data available</EmptyState>
      </TableWrapper>
    );
  }

  return (
    <TableWrapper>
      <TableContainer>
        <Table>
          <TableHead>
            <tr>
              {columns.map(column => (
                <TableHeader key={column.key} $width={column.width}>
                  {column.label}
                </TableHeader>
              ))}
            </tr>
          </TableHead>
          <tbody>
            {data.map((row, index) => (
              <TableRow
                key={row.id || index}
                onClick={() => onRowClick?.(row)}
                $clickable={!!onRowClick}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {columns.map(column => (
                  <TableCell key={column.key}>
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </TableWrapper>
  );
};

