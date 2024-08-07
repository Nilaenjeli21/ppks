// Column.tsx
import { DataTableColumnProps } from "@components/atoms/Table/DataTable";
import { ProofType } from "./TableProof";
import { Box, Typography, Button, Stack } from "@mui/material";
import { PRIMARY } from "@common/constant/Color";
import { ComplaintStatus, Role } from "@common/constant/Enum";
import ChronologyDialog from "@components/organisms/Proof/ChronologyDialog"; // Import komponen ChronologyDialog

// Fungsi untuk mendefinisikan kolom tabel
export function column(
  onUpdate: (data: ProofType) => void,
  onDelete: (id: number) => void,
  user: { role: Role } // Parameter user untuk mengecek peran
): DataTableColumnProps<ProofType>[] {
  const userRole = user.role; // Ambil peran pengguna dari parameter

  // Definisikan kolom-kolom tabel
  const columns: DataTableColumnProps<ProofType>[] = [
    {
      id: "id",
      label: "Id Pengaduan",
      value: (data) => `# ${data.Complaint?.id}`,
      headProps: {
        width: "10px",
      },
    },
    {
      id: "name",
      label: "Nama Pelapor",
      value: (data) => data.Complaint?.name,
      headProps: {
        width: "150px",
      },
    },
    {
      id: "status",
      label: "Status",
      value: (data) => (
        <Box
          sx={{
            backgroundColor: {
              [ComplaintStatus.OPEN]: PRIMARY,
              [ComplaintStatus.CLOSED]: "blue",
              [ComplaintStatus.IN_PROGRESS]: "green",
              [ComplaintStatus.REJECTED]: "red",
            }[data.Complaint?.status || ComplaintStatus.OPEN],
            p: 1,
            borderRadius: "5px",
            textAlign: "center",
            width: "60px",
            color: "white",
          }}
        >
          {
            {
              [ComplaintStatus.OPEN]: "Masuk",
              [ComplaintStatus.CLOSED]: "Selesai",
              [ComplaintStatus.IN_PROGRESS]: "Diproses",
              [ComplaintStatus.REJECTED]: "Ditolak",
            }[data.Complaint?.status || ComplaintStatus.OPEN]
          }
        </Box>
      ),
      headProps: {
        width: "150px",
      },
    },
    {
      id: "link",
      label: "Link Bukti",
      value: (data) => (
        <Typography
          onClick={() => window.open(data.link)}
          sx={{ cursor: "pointer", color: PRIMARY }}
        >
          {data.link}
        </Typography>
      ),
      headProps: {
        width: "600px",
      },
    },
    {
      id: "chronology",
      label: "Kronologis",
      value: (data) => {
        const text = data.chronology || "";
        return (
          <ChronologyDialog text={text} />
        );
      },
      headProps: {
        width: "600px",
      },
    },
  ];

  // Tambahkan kolom aksi hanya jika peran pengguna adalah admin
  if (userRole === Role.ADMIN) {
    columns.push({
      id: "action",
      label: "Aksi",
      value: (data) => (
        <Stack
          sx={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={1}
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => onUpdate(data)}
              sx={{
                backgroundColor: "transparent",
                color: "inherit",
                fontSize: "0.75rem",
                textTransform: "capitalize",
                width: "100%",
              }}
            >
              Ubah
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onDelete(data.id)}
              sx={{
                backgroundColor: "transparent",
                color: "inherit",
                fontSize: "0.75rem",
                textTransform: "capitalize",
                width: "100%",
              }}
            >
              Hapus
            </Button>
          </Stack>
        </Stack>
      ),
      headProps: {
        width: "600px",
        align: "center",
      },
    });
  }

  return columns;
}
