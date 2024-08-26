import DataTable from "@components/atoms/Table/DataTable";
import { column } from "./Column";
import { Stack, Typography } from "@mui/material";
import { UseTable } from "ezhooks/lib/useTable";
import { User } from "@common/types/User";

export default function TableUser({ table }: { table: UseTable<User> }) {
  return (
    <Stack gap={3}>
      <Typography variant="h5" fontWeight={600}>
        Daftar User
      </Typography>
      <DataTable
        columns={column()}
        data={table.data}
        page={table.pagination.page}
        setPage={table.pagination.setPage}
        count={table.pagination.lastPage}
        perPage={table.pagination.perPage}
        total={table.pagination.total}
        isLoading={table.loading}
      />
    </Stack>
  );
}
