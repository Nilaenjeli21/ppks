import { Button, Box, Typography } from "@mui/material";
import { PRIMARY } from "@common/constant/Color";
import { ComplaintStatus, Role } from "@common/constant/Enum";
import { Complaint } from "@common/types/Complaint";
import { DataTableColumnProps } from "@components/atoms/Table/DataTable";

// Define the User interface
interface User {
  role: Role;
}

export function column({
  onAccept,
  onReject,
  user,
}: {
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
  user: User; // Use the User interface here
}): DataTableColumnProps<Complaint>[] {
  const columns: DataTableColumnProps<Complaint>[] = [
    {
      id: "id",
      label: "Id Pengaduan",
      value: (data) => `# ${data.id}`,
      headProps: {
        width: "100px",
      },
    },
    {
      id: "name",
      label: "Nama",
      value: (data) => data.name,
      headProps: {
        width: "150px",
      },
    },
    {
      id: "position",
      label: "Jabatan",
      value: (data) => data.position,
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
            }[data.status],
            p: 1,
            borderRadius: "5px",
            textAlign: "center",
            width: "90px",
            color: "white",
          }}
        >
          {
            {
              [ComplaintStatus.OPEN]: "Masuk",
              [ComplaintStatus.CLOSED]: "Rekomendasi Selesai",
              [ComplaintStatus.IN_PROGRESS]: "Proses Investigasi",
              [ComplaintStatus.REJECTED]: "Ditolak",
            }[data.status]
          }
        </Box>
      ),
      headProps: {
        width: "150px",
      },
    },
    {
      id: "recommendation",
      label: "Surat Rekomendasi",
      value: (data) => (
        <Typography
          onClick={() =>
            window.open(
              `http://localhost:3000/img/${data.Recommendation?.[0]?.link}`
            )
          }
          sx={{ cursor: "pointer", color: PRIMARY }}
        >
          {data.Recommendation?.[0]?.originalName}
        </Typography>
      ),
    },
  ];

  if (user.role === Role.ADMIN) {
    columns.push({
      id: "action",
      label: "Aksi",
      value: (data) => (
        <>
          {data.status === ComplaintStatus.IN_PROGRESS && (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => onAccept(data.id)}
                sx={{
                  backgroundColor: "transparent",
                  color: "inherit",
                  fontSize: "0.75rem",
                  textTransform: "capitalize",
                  border: "none",
                  width: "150px",
                }}
              >
                Kasus Valid
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => onReject(data.id)}
                sx={{
                  backgroundColor: "transparent",
                  color: "inherit",
                  fontSize: "0.75rem",
                  textTransform: "capitalize",
                  border: "none",
                  width: "150px",
                }}
              >
                Kasus Tidak Valid
              </Button>
            </>
          )}
        </>
      ),
      headProps: {
        width: "150px",
        align: "center",
      },
    });
  }

  return columns;
}
