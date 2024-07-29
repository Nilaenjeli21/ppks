import DataTable from "@components/atoms/Table/DataTable";
import {
  Autocomplete,
  Box,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { column } from "./Column";
import { Complaint } from "@common/types/Complaint";
import { UseTable } from "ezhooks/lib/useTable";
import { useState } from "react";
import { ComplaintStatus } from "@common/constant/Enum";
import { useUser } from "@context/AppContext";

export default function TableAllComplaint({
  onDetail,
  onDelete,
  onProofDetail,
  table,
}: {
  onDetail: (data: Complaint) => void;
  onProofDetail: (data: Complaint) => void;
  onDelete: (id: number) => void;
  table: UseTable<Complaint>;
}) {
  const [status, setStatus] = useState<string | null>(null);
  const { user } = useUser();
  return (
    <Box>
      <Stack gap={1} direction="row">
        <TextField
          label="Cari ID"
          onChange={(e) => table.setQuery({ id: e.target.value })}
          sx={{ mb: 1 }}
        />
        <TextField
          label="Cari Nama"
          onChange={(e) => table.setQuery({ name: e.target.value })}
          sx={{ mb: 1 }}
        />
        <Autocomplete
          disablePortal
          id="program"
          options={["OPEN", "IN_PROGRESS", "CLOSED", "REJECTED"]}
          value={
            status &&
            {
              [ComplaintStatus.OPEN]: "Masuk",
              [ComplaintStatus.CLOSED]: "Selesai",
              [ComplaintStatus.IN_PROGRESS]: "Diproses",
              [ComplaintStatus.REJECTED]: "Ditolak",
            }[status]
          }
          onChange={(e, value) => {
            table.setQuery({ status: value });
            setStatus(value);
          }}
          renderInput={(params) => (
            <TextField {...params} sx={{ width: 200 }} label="Cari Status" />
          )}
          renderOption={(props, option) => (
            <li {...props}>
              <Grid container alignItems="center">
                <Grid item sx={{ width: "100%" }}>
                  <Typography variant="body1">
                    {option &&
                      {
                        [ComplaintStatus.OPEN]: "Masuk",
                        [ComplaintStatus.CLOSED]: "Selesai",
                        [ComplaintStatus.IN_PROGRESS]: "Diproses",
                        [ComplaintStatus.REJECTED]: "Ditolak",
                      }[option]}
                  </Typography>
                </Grid>
              </Grid>
            </li>
          )}
        />
      </Stack>
      <DataTable
        columns={column({ onDetail, onDelete, user, onProofDetail })}
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