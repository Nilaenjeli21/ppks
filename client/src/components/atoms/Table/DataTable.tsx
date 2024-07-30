import {
  Box,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TablePagination from "./TablePagination";
import { ReactNode } from "react";
import RowLoading from "./RowLoading";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.text.primary,
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export type DataTableColumnProps<T> = {
  id: string;
  label: string;
  value: (data: T, index?: number) => number | ReactNode;
  headProps?: {
    width?: string;
    align?:
      | "start"
      | "end"
      | "left"
      | "right"
      | "center"
      | "justify"
      | "match-parent";
    className?: string;
  };
};

export interface DataTableProps<T> {
  removePagination?: boolean;
  selectionMode?: boolean;
  data: T[];
  columns: DataTableColumnProps<T>[];
  isLoading?: boolean;
  page: number;
  setPage: (page: number) => void;
  total?: number;
  count: number;
  perPage: number;
}

export default function DataTable<T>({
  removePagination = false,
  data,
  page,
  perPage,
  total,
  count,
  columns,
  isLoading,
  setPage,
  ...props
}: DataTableProps<T>) {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((cell) => (
                <StyledTableCell
                key={cell.id}
                sx={{
                  width: cell.headProps?.width,
                  textAlign: cell.headProps?.align,
                }}
                className={cell.id === "action" ? "hide-column-on-print" : ""} // Terapkan kelas CSS
              >
                {cell.label}
              </StyledTableCell>
              
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!data.length && (
              <TableRow>
                <TableCell
                  variant="body"
                  colSpan={columns.length}
                  align="center"
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="350px"
                  >
                    <Typography variant="h5">Tidak ada data</Typography>
                    <Typography variant="caption">
                      Tidak ada data yang bisa ditampilkan saat ini.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
            {isLoading ? (
              <RowLoading count={columns.length} />
            ) : (
              data.map((row, i) => (
                <TableRow key={i}>
                  {columns.map(({ value, ...col }) => (
                    <TableCell
                      component="th"
                      scope="row"
                      key={col.id}
                      sx={{ textAlign: col.headProps?.align }}
                    >
                      {value(row, perPage * (page - 1) + (i + 1))}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {(total !== 0 || removePagination) && (
        <TablePagination
          total={total}
          count={count}
          page={page}
          onPageChange={(page) => {
            console.log(page);
            setPage(page - 1);
          }}
          {...props}
        />
      )}
    </Paper>
  );
}
