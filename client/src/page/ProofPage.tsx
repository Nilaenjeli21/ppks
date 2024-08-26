import React, { useState } from "react";
import { Box, FormLabel, Stack, TextField, Autocomplete } from "@mui/material";
import CustomDialog from "@components/organisms/CustomDialog";
import MainTemplate from "@components/templates/MainTemplate";
import TableProof, { ProofType } from "@components/organisms/Proof/TableProof";
import useFetch from "ezhooks/lib/useFetch";
import useTable, { EventTable } from "ezhooks/lib/useTable";
import { useMutation } from "frhooks";
import apiRoute from "@common/constant/ApiRoute";
import { ComplaintStatus } from "@common/constant/Enum";
import { api } from "@service/index";
import { Complaint } from "@common/types/Complaint";
import { useSnackbar } from "notistack";

const getProofs = async (event?: EventTable) => {
  if (!event) return [];
  const { params: paramsProps } = event;
  const { data } = await api.get(apiRoute.proof.index, {
    params: {
      ...paramsProps,
    },
  });

  return data;
};

export default function ProofPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<Complaint | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const table = useTable<ProofType>({
    service: getProofs,
    selector: (resp) => resp.rows,
    total: (resp) => resp.count,
    pagination: {
      startPage: 0,
      perPage: 5,
    },
  });

  const proofData = useFetch<Complaint[]>({
    service: async () =>
      await api.get(apiRoute.complaints.index, {
        params: {
          status: ComplaintStatus.IN_PROGRESS,
        },
      }),
    selector: (resp) => resp.data.rows,
    defaultValue: [],
  });

  const form = useMutation<ProofType>({
    defaultValue: {
      id: 0,
      link: "",
      ComplaintId: 0,
      chronology: "",
    },
    isNewRecord: (data) => data.id === 0,
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
        chronology: yup.string().required("Kolom ini wajib diisi"),
      }),
  });

  const onClose = () => {
    form.clearError();
    form.clearData();
    setData(null);
    setIsOpen(false);
  };

  const onSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    console.log(form.data);

    const url = form.isNewRecord
      ? apiRoute.proof.index
      : `${apiRoute.proof.index}/${form.data.id}`;

    form.post(url, {
      method: form.isNewRecord ? "post" : "put",
      except: ["id"],
      validation: true,
      onSuccess: async () => {
        table.reload();
        form.clearData();
        setData(null);
        setIsOpen(false);
      },
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onUpdate = async (data: any) => {
    console.log(data);
    setData(data);
    form.setData({
      ComplaintId: data.ComplaintId,
      chronology: data.chronology,
      link: data.link,
      id: data.id,
    });
    setIsOpen(true);

    // try {
    //   const updatedProof = {
    //     ...data,
    //     link: "new_link",
    //     chronology: "new_chronology",
    //   };
    //   await axios.put(`/api/proofs/${data.id}`, updatedProof);
    //   enqueueSnackbar("Update successful", { variant: "success" });
    //   table.reload();
    // } catch (error) {
    //   enqueueSnackbar("Update failed", { variant: "error" });
    // }
  };

  const onDelete = async (id: number) => {
    console.log(id);
    try {
      await api.delete(`${apiRoute.proof.index}/${id}`);
      table.reload();
      enqueueSnackbar("Delete successful", { variant: "success" });
    } catch (e) {
      enqueueSnackbar("Delete failed", { variant: "error" });
    }
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
        <TableProof
          table={table}
          onAdd={() => setIsOpen(true)}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      </Box>
      <CustomDialog
        title="Formulir Bukti"
        footerAction
        open={isOpen}
        handleClose={onClose}
        size="xs"
        onSubmit={onSubmit}
        isRecommendationPage={true}
      >
        <Stack spacing={2}>
          <FormLabel required>Id Pengaduan</FormLabel>
          <Autocomplete
            disablePortal
            id="link"
            getOptionLabel={(option) => `#${option.id}`}
            options={proofData.data}
            fullWidth
            value={data}
            onChange={(e, value) => {
              form.setData({ ComplaintId: value?.id });
              setData(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                error={form.error("ComplaintId")}
                helperText={form.message("ComplaintId")}
                onBlur={() => form.validate("ComplaintId")}
              />
            )}
          />
          <FormLabel required>Keterangan</FormLabel>
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
            value={form.data.link}
            onChange={(e) => form.setData({ link: e.currentTarget.value })}
            error={form.error("link")}
            helperText={form.message("link")}
            onBlur={() => form.validate("link")}
          />
        </Stack>
      </CustomDialog>
    </MainTemplate>
  );
}