import { User } from "@common/types/User";
import { DataTableColumnProps } from "@components/atoms/Table/DataTable";
import { Typography } from "@mui/material";

export function column(): DataTableColumnProps<User>[] {
  const columns: DataTableColumnProps<User>[] = [
    {
      id: "name",
      label: "Nama",
      value: (data) => (
        <>
          <Typography fontWeight="bold">{data.name}</Typography>
        </>
      ),
      headProps: {
        width: "250px",
      },
    },
    {
      id: "email",
      label: "Email",
      value: (data) => data.email,
      headProps: {
        width: "200px",
      },
    },
    {
      id: "phone",
      label: "Telepon",
      value: (data) => data.phone,
      headProps: {
        width: "200px",
      },
    },
    {
      id: "role",
      label: "Peran",
      value: (data) => data.role || "N/A",
      headProps: {
        width: "150px",
      },
    },
  ];

  return columns; 
}
