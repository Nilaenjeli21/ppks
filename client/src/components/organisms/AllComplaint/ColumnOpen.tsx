import { PRIMARY } from "@common/constant/Color";
import { ComplaintStatus, Role } from "@common/constant/Enum";
import { Complaint } from "@common/types/Complaint";
import { DataTableColumnProps } from "@components/atoms/Table/DataTable";
import { Box,Button } from "@mui/material";

interface ColumnProps {
  onDetail: (data: Complaint) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}

export function column({
  onDetail,
  user,
}: ColumnProps): DataTableColumnProps<Complaint>[] {
  const columns: DataTableColumnProps<Complaint>[] = [
    {
      id: "id",
      label: "ID",
      value: (data) => `# ${data.id}`,
      headProps: {
        width: "50px",
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
            backgroundColor: PRIMARY,
            p: 1,
            borderRadius: "5px",
            textAlign: "center",
            width: "60px",
            color: "white",
          }}
        >
          {data.status === ComplaintStatus.OPEN && "Masuk"}
        </Box>
      ),
      headProps: {
        width: "150px",
      },
    },
    {
      id: "description",
      label: "Kronologis",
      value: (data) => data.description,
    },
    {
      id: "action",
      label: "Aksi",
      value: (data) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => onDetail(data)}
          disabled={user.role !== Role.ADMIN}
          sx={{ 
            backgroundColor: "transparent", 
            color: "inherit", 
            fontSize: "0.75rem", 
            textTransform: "capitalize" 
          }}
        >
          Detail
        </Button>
      ),
      headProps: {
        width: "200px",
        align: "center",
      },
    },
  ];

  return columns;
}
