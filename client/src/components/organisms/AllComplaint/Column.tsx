import { PRIMARY } from "@common/constant/Color";
import { ComplaintStatus, Role } from "@common/constant/Enum";
import { Complaint } from "@common/types/Complaint";
import { DataTableColumnProps } from "@components/atoms/Table/DataTable";
import { Box, Button, Stack } from "@mui/material";

interface ColumnProps {
  onDelete: (id: number) => void;
  onDetail: (data: Complaint) => void;
  user: { role: Role }; 
  onProofDetail: (data: Complaint) => void;
}

export function column({
  onDelete,
  onDetail,
  user,
  onProofDetail,
}: ColumnProps): DataTableColumnProps<Complaint>[] {
  const columns: DataTableColumnProps<Complaint>[] = [
    {
      id: "id",
      label: "ID",
      value: (data: Complaint) => `# ${data.id}`,
      headProps: {
        width: "50px",
      },
    },
    {
      id: "name",
      label: "Nama",
      value: (data: Complaint) => data.name,
      headProps: {
        width: "150px",
      },
    },
    {
      id: "position",
      label: "Jabatan",
      value: (data: Complaint) => data.position,
      headProps: {
        width: "150px",
      },
    },
    {
      id: "status",
      label: "Status",
      value: (data: Complaint) => (
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
            width: {
              xs: "auto", // full width on small screens
              sm: "60px", // 60px on medium and larger screens
            },
            color: "white",
          }}
        >
          {
            {
              [ComplaintStatus.OPEN]: "Masuk",
              [ComplaintStatus.CLOSED]: "Selesai",
              [ComplaintStatus.IN_PROGRESS]: "Diproses",
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
      id: "description",
      label: "Kronologis",
      value: (data: Complaint) => {
        const description = data.description;
        return description.length > 150
          ? description.slice(0, 150) + "..."
          : description;
      },
    },
    {
      id: "action",
      label: "Aksi",
      value: (data: Complaint) => (
        <Stack
          direction={{
            xs: "column", // vertical stack on small screens
            sm: "row", // horizontal stack on medium and larger screens
          }}
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => onDetail(data)}
            sx={{
              backgroundColor: "transparent",
              color: "inherit",
              fontSize: "0.75rem",
              textTransform: "capitalize",
              width: "100%", // full width on small screens
            }}
          >
            Detail
          </Button>
          {user.role !== Role.ADVISER && (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => onProofDetail(data)}
                sx={{
                  backgroundColor: "transparent",
                  color: "inherit",
                  fontSize: "0.75rem",
                  textTransform: "capitalize",
                  width: "100%",
                }}
              >
                Tambah Bukti
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => onDelete(data.id)}
                disabled={user.role !== Role.ADMIN}
                sx={{
                  backgroundColor: "transparent",
                  color: "inherit",
                  fontSize: "0.75rem",
                  textTransform: "capitalize",
                  width: "100%", // full width on small screens
                }}
              >
                Hapus
              </Button>
            </>
          )}
        </Stack>
      ),
      headProps: {
        width: "200px",
        align: "center" as const,
      },
    },
  ];

  return columns;
}
