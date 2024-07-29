import apiRoute from "@common/constant/ApiRoute";
import { Applog } from "@common/types/Applog";
import TableApplog from "@components/organisms/Applog/TableApplog";
import MainTemplate from "@components/templates/MainTemplate";
import { Box } from "@mui/material";
import { api } from "@service/index";
import { EventTable } from "ezhooks";
import useTable from "ezhooks/lib/useTable";

const getApplogs = async (event?: EventTable) => {
  const paramsProps = event?.params || {};
  const { data } = await api.get(apiRoute.applog.index, {
    params: {
      ...paramsProps,
    },
  });

  return data;
};

export default function ApplogPage() {
  const table = useTable<Applog>({
    service: getApplogs,
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
        <TableApplog table={table} />
      </Box>
    </MainTemplate>
  );
}
