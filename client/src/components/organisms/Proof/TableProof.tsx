import DataTable from "@components/atoms/Table/DataTable";
import { Box, Button, Stack, Typography } from "@mui/material";
import { column } from "./Column";
import { UseTable } from "ezhooks/lib/useTable";
import { Complaint } from "@common/types/Complaint";
import { useUser } from "@context/AppContext";
import { Role } from "@common/constant/Enum";

export type ProofType = {
  id: number;
  link: string;
  ComplaintId?: number;
  Complaint?: Complaint;
  chronology: string;
};

export default function TableProof({
  table,
  onAdd,
  onUpdate,
  onDelete,
}: {
  table: UseTable<ProofType>;
  onAdd: () => void;
  onUpdate: (data: ProofType) => void;
  onDelete: (id: number) => void;
}) {
  const { user } = useUser();

  // Pastikan user dan user.role ada sebelum digunakan
  if (!user || user.role === undefined) {
    return <div>Loading...</div>; // Atau tampilkan pesan kesalahan jika diperlukan
  }

  return (
    <Stack gap={3}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" fontWeight={600}>
          List Bukti
        </Typography>
        {user.role === Role.ADMIN && (
          <Button variant="contained" onClick={onAdd}>
            Tambah Bukti
          </Button>
        )}
      </Box>
      <DataTable
        columns={column(onUpdate, onDelete, { role: user.role })}  
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
