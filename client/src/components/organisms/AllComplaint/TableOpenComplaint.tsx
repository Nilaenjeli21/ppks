import DataTable from "@components/atoms/Table/DataTable";
import { Box } from "@mui/material";
import { column } from "./ColumnOpen";
import { UseTable } from "ezhooks/lib/useTable";
import { Complaint } from "@common/types/Complaint";
import { useUser } from "@context/AppContext";

export default function TableOpenComplaint({
  onDetail,
  table,
}: {
  onDetail: (data: Complaint) => void;
  table: UseTable<Complaint>;
}) {
  const { user } = useUser();
  return (
    <Box>
      <DataTable
        columns={column({ onDetail, user })}
        data={table.data}
        page={table.pagination.page}
        setPage={table.pagination.setPage}
        count={table.pagination.lastPage}
        perPage={table.pagination.perPage}
        total={table.pagination.total}
        isLoading={table.loading}
      />
    </Box>
  );
}
