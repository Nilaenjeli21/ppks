import { Applog } from "@common/types/Applog";
import { DataTableColumnProps } from "@components/atoms/Table/DataTable";
import { Typography } from "@mui/material";
import { format } from "date-fns";

export function column(): DataTableColumnProps<Applog>[] {
  const columns: DataTableColumnProps<Applog>[] = [
    {
      id: "id",
      label: "ID",
      value: (data) => `# ${data.id}`,
      headProps: {
        width: "100px",
      },
    },
    {
      id: "name",
      label: "Nama",
      value: (data) => (
        <>
          <Typography fontWeight="bold">{data.User?.name}</Typography>
          <Typography variant="body2">{data.User?.email}</Typography>
        </>
      ),
      headProps: {
        width: "250px",
      },
    },
    {
      id: "message",
      label: "keterangan",
      value: (data) => data.message,
      headProps: {
        width: "650px",
      },
    },
    {
      id: "time",
      label: "waktu",
      value: (data) =>
        `${format(new Date(data.timestamp), "dd MMMM yyyy HH:mm")}`,
    },
  ];

  return columns;
}
