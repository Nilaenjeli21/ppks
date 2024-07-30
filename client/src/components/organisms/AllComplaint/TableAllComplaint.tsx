import DataTable from "@components/atoms/Table/DataTable";
import {
  Autocomplete,
  Box,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { column } from "./Column";
import { Complaint } from "@common/types/Complaint";
import { UseTable } from "ezhooks/lib/useTable";
import { useState, useRef } from "react";
import { ComplaintStatus, Role } from "@common/constant/Enum";
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
  const [month, setMonth] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);
  const { user } = useUser();
  const componentRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const filteredData = table.data.filter((item) => {
    const itemDate = new Date(item.reportDate);
    const itemMonth = (itemDate.getMonth() + 1).toString();
    const itemYear = itemDate.getFullYear().toString();
    return (!month || itemMonth === month) && (!year || itemYear === year);
  });

  return (
    <Box>
      <Stack
        gap={2}
        direction={isMobile ? "column" : "row"}
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Stack direction={isMobile ? "column" : "row"} gap={2} sx={{ flexWrap: "wrap" }}>
          <TextField
            label="Cari Id"
            onChange={(e) => table.setQuery({ id: e.target.value })}
            sx={{ mb: 1, width: isMobile ? "100%" : 120 }}
          />
          <TextField
            label="Cari Nama"
            onChange={(e) => table.setQuery({ name: e.target.value })}
            sx={{ mb: 1, width: isMobile ? "100%" : 120 }}
          />
          <Autocomplete
            disablePortal
            id="status"
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
              <TextField {...params} sx={{ width: isMobile ? "100%" : 150 }} label="Cari Status" />
            )}
            renderOption={(props, option) => (
              <li {...props}>
                <Typography variant="body1">
                  {option &&
                    {
                      [ComplaintStatus.OPEN]: "Masuk",
                      [ComplaintStatus.CLOSED]: "Selesai",
                      [ComplaintStatus.IN_PROGRESS]: "Diproses",
                      [ComplaintStatus.REJECTED]: "Ditolak",
                    }[option]}
                </Typography>
              </li>
            )}
          />
          <Autocomplete
            disablePortal
            id="bulan"
            options={Array.from({ length: 12 }, (_, i) => (i + 1).toString())}
            value={month}
            onChange={(e, value) => setMonth(value)}
            renderInput={(params) => (
              <TextField {...params} sx={{ width: isMobile ? "100%" : 120 }} label="Bulan" />
            )}
          />
          <Autocomplete
            disablePortal
            id="tahun"
            options={Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - i).toString())}
            value={year}
            onChange={(e, value) => setYear(value)}
            renderInput={(params) => (
              <TextField {...params} sx={{ width: isMobile ? "100%" : 120 }} label="Tahun" />
            )}
          />
        </Stack>
      </Stack>

      <div ref={componentRef}>
        <DataTable
          columns={column({
            onDetail,
            onDelete,
            user: { role: user?.role ?? Role.USER },
            onProofDetail,
          })}
          data={filteredData}
          page={table.pagination.page}
          setPage={table.pagination.setPage}
          count={table.pagination.lastPage}
          perPage={table.pagination.perPage}
          total={table.pagination.total}
          isLoading={table.loading}
        />
      </div>
    </Box>
  );
}
