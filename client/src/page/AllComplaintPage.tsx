import apiRoute from "@common/constant/ApiRoute";
import { PRIMARY } from "@common/constant/Color";
import { ComplaintStatus } from "@common/constant/Enum";
import { Complaint } from "@common/types/Complaint";
import TableAllComplaint from "@components/organisms/AllComplaint/TableAllComplaint";
import TableOpenComplaint from "@components/organisms/AllComplaint/TableOpenComplaint";
import CustomDialog from "@components/organisms/CustomDialog";
import PointsCard, { poinType } from "@components/organisms/PointsCard";
import { ProofType } from "@components/organisms/Proof/TableProof";
import MainTemplate from "@components/templates/MainTemplate";
import {
  Box,
  Button,
  Stack,
  Tab,
  Tabs,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormLabel,
  TextField,
} from "@mui/material";
import { api } from "@service/index";
import { EventTable } from "ezhooks";
import useFetch from "ezhooks/lib/useFetch";
import useTable from "ezhooks/lib/useTable";
import { useMutation } from "frhooks";
import { useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const getAllComplaints = async (event: EventTable) => {
  const { params: paramsProps } = event;
  const { data } = await api.get(apiRoute.complaints.index, {
    params: { ...paramsProps },
  });

  return data;
};

const getComplaints = async (event: EventTable) => {
  const { params: paramsProps } = event;
  const { data } = await api.get(apiRoute.complaints.index, {
    params: { ...paramsProps, status: ComplaintStatus.OPEN },
  });

  return data;
};

export default function AllComplaintPage() {
  const [value, setTab] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isProof, setIsProof] = useState(false);
  const [data, setData] = useState<Complaint>();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const form = useMutation<ProofType>({
    defaultValue: {
      id: 0,
      link: "",
      ComplaintId: 0,
      chronology: "",
    },
    schema: (yup) =>
      yup.object().shape({
        link: yup
          .string()
          .test(
            "url",
            "Format link tidak valid",
            (value) => !value || /^https?:\/\//.test(value)
          )
          .required("Kolom ini wajib diisi"),
        ComplaintId: yup.number().required("Kolom ini wajib diisi"),
      }),
  });

  const table = useTable<Complaint>({
    service: getAllComplaints,
    selector: (resp) => resp.rows,
    total: (resp) => resp.count,
    pagination: {
      startPage: 0,
      perPage: 5,
    },
  });

  const tableOpen = useTable<Complaint>({
    service: getComplaints,
    selector: (resp) => resp.rows,
    total: (resp) => resp.count,
    pagination: {
      startPage: 0,
      perPage: 5,
    },
  });

  const points = useFetch<poinType>({
    service: async () => (await api.get(apiRoute.complaints.status)).data,
    selector: (resp) => resp.data,
  });

  const onDetail = (data: Complaint) => {
    setIsOpen(true);
    setData(data);
  };
  const onProofDetail = (data: Complaint) => {
    setIsProof(true);
    form.setData({
      ComplaintId: data.id,
    });
  };
  const onClose = () => {
    setIsOpen(false);
    setIsProof(false);
  };

  const onConfirm = async () => {
    try {
      await api.put(`${apiRoute.complaints.index}/${data?.id}/confirm`);
      table.reload();
      tableOpen.reload();
      points.refresh();
      setIsOpen(false);
    } catch (e) {
      console.log(e);
    }
  };
  const onDelete = async (id: number) => {
    console.log(id);
    try {
      await api.delete(`${apiRoute.complaints.index}/${id}`);
      table.reload();
      points.refresh();
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    form.post(apiRoute.proof.index, {
      except: ["id"],
      validation: true,
      onSuccess: async () => {
        table.reload();
        form.clearData();
        setIsOpen(false);
        setIsProof(false);
      },
    });
  };

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
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              sx={{ textTransform: "none", fontWeight: 600 }}
              value={1}
              label="Seluruh Pengaduan"
            />
            <Tab
              sx={{ textTransform: "none", fontWeight: 600 }}
              value={2}
              label={
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyItems: "center",
                  }}
                >
                  <Typography
                    sx={{ textTransform: "none", fontWeight: 600, mr: 1 }}
                  >
                    Pengaduan Baru
                  </Typography>
                  <Box
                    sx={{
                      pt: 0.4,
                      backgroundColor: PRIMARY,
                      color: "white",
                      borderRadius: "100%",
                      width: "22px",
                      height: "20px",
                    }}
                  >
                    {tableOpen.pagination.total}
                  </Box>
                </Box>
              }
              // label={`Pengaduan Baru ${tableOpen.pagination.total}`}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={1}>
          <Stack gap={2}>
            <PointsCard points={points} />
            <TableAllComplaint
              onDetail={onDetail}
              onProofDetail={onProofDetail}
              table={table}
              onDelete={onDelete}
            />
          </Stack>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <TableOpenComplaint onDetail={onDetail} table={tableOpen} />
        </CustomTabPanel>
      </Box>
      <CustomDialog
        title={isOpen ? "Detail Pengaduan" : "Tambah Bukti"}
        open={isOpen || isProof}
        handleClose={onClose}
        size={isOpen ? "md" : "xs"}
        footerAction={isOpen ? false : true}
        onSubmit={onSubmit}
      >
        <>
          {isOpen && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                p: 3,
                alignItems: "center",
              }}
            >
              <TableContainer component={Paper} sx={{ width: "100%" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        <Typography variant="h6">Detail Pengaduan</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data && (
                      <>
                        {[
                          { label: "Nama", value: data.name },
                          { label: "Jurusan", value: data.major },
                          { label: "Prodi", value: data.program },
                          { label: "Jabatan", value: data.position },
                          { label: "Status Pelapor", value: data.reporter },
                          { label: "Kronologis", value: data.description },
                          { label: "No. Hp/ Wa", value: data.contact },
                        ].map(({ label, value }) => (
                          <TableRow key={label}>
                            <TableCell
                              sx={{ width: "20%", padding: "1px 2px" }}
                            >
                              <Typography variant="body2" fontWeight={600}>
                                {label}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ width: "1%", padding: "4px 8px" }}>
                              <Typography variant="body2" fontWeight={600}>
                                :
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ padding: "4px 8px" }}>
                              {label === "Kronologis" ? (
                                <Typography
                                  variant="body2"
                                  sx={{ textAlign: "justify" }}
                                >
                                  {value}
                                </Typography>
                              ) : (
                                <Typography variant="body2">{value}</Typography>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                        {data.link && (
                          <TableRow>
                            <TableCell
                              sx={{ width: "10%", padding: "2px 4px" }}
                            >
                              <Typography variant="body2" fontWeight={600}>
                                Link Bukti
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ width: "1%", padding: "4px 8px" }}>
                              <Typography variant="body2" fontWeight={600}>
                                :
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ padding: "4px 8px" }}>
                              <Typography
                                variant="body2"
                                sx={{ color: "blue", cursor: "pointer" }}
                                onClick={() => window.open(data.link)}
                              >
                                {data.link}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {data?.status === ComplaintStatus.OPEN && (
                <Button
                  variant="contained"
                  color="success"
                  onClick={onConfirm}
                  sx={{ alignSelf: "center", mt: 2 }}
                >
                  Terima
                </Button>
              )}
            </Box>
          )}
          {isProof && (
            <Stack spacing={2}>
              <FormLabel required>Id Pengaduan</FormLabel>
              <TextField
                id="ID Pengaduan"
                name="Id Pengaduan"
                value={`# ${form.data.ComplaintId}`}
                fullWidth
                disabled={true}
              />
              <FormLabel required>Kronologis</FormLabel>
              <TextField
                id="chronology"
                name="kronologis"
                fullWidth
                multiline
                value={form.data.chronology}
                rows={6}
                onChange={(e) =>
                  form.setData({ chronology: e.currentTarget.value })
                }
                error={form.error("chronology")}
                helperText={form.message("chronology")}
                onBlur={() => form.validate("chronology")}
              />
              <FormLabel required>Link Bukti</FormLabel>
              <TextField
                id="link"
                name="link"
                fullWidth
                onChange={(e) => form.setData({ link: e.currentTarget.value })}
                error={form.error("link")}
                helperText={form.message("link")}
                onBlur={() => form.validate("link")}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={onSubmit}
                sx={{ width: "100px" }}
              >
                Kirim
              </Button>
            </Stack>
          )}
        </>
      </CustomDialog>
    </MainTemplate>
  );
}
