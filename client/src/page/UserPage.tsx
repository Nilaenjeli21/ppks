import apiRoute from "@common/constant/ApiRoute";
import { User } from "@common/types/User";
import TableUser from "@components/organisms/User/TableUser";
import MainTemplate from "@components/templates/MainTemplate";
import { Box } from "@mui/material";
import { api } from "@service/index";
import { EventTable } from "ezhooks";
import useTable from "ezhooks/lib/useTable";

const getUsers = async (event?: EventTable) => {
  const paramsProps = event?.params || {};
  const { data } = await api.get(apiRoute.users.index, {
    params: {
      ...paramsProps,
    },
  });

  console.log(data);
  return data;
};


export default function UserPage() {
  const table = useTable<User>({
    service: getUsers,
    selector: (resp) => resp.rows,
    total: (resp) => resp.count,
    pagination: {
      startPage: 0,
      perPage: 10,
    },
  });

  return (
    <MainTemplate>
      <Box
        sx={{
          p: 3,
          m: 3,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
        }}
      >
        <TableUser table={table} />
      </Box>
    </MainTemplate>
  );
}
