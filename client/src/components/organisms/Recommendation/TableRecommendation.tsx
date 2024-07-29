import DataTable from "@components/atoms/Table/DataTable";
import { Stack, Typography } from "@mui/material";
import { Complaint } from "@common/types/Complaint";
import { UseTable } from "ezhooks/lib/useTable";
import { column } from "./Column";
import { useUser } from "@context/AppContext";
export default function TableRecommendation({
  table,
  onAccept,
  onReject,
}: {
  table: UseTable<Complaint>;
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
}) {
  const { user } = useUser();
  return (
    <Stack gap={3}>
      <Typography variant="h5" fontWeight={600}>
        List Rekomendasi
      </Typography>
      <DataTable
        columns={column({ onAccept, onReject, user })}
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
