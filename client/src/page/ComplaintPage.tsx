import MainTemplate from "@components/templates/MainTemplate";
import img from "@common/img/Complaint.png";
import { Box, Button, Stack, Typography } from "@mui/material";
import CustomDialog from "@components/organisms/CustomDialog";
import { useState } from "react";
import FormComplaint, { SelectedComplaint } from "@components/organisms/Complaint/FormComplaint";
import { PRIMARY } from "@common/constant/Color";
import { useMutation } from "frhooks";
import apiRoute from "@common/constant/ApiRoute";
import * as yup from "yup";

// Buat schema validasi menggunakan yup
const validationSchema = yup.object().shape({
  name: yup.string().required("Kolom ini wajib diisi"),
  major: yup.string().required("Kolom ini wajib diisi"),
  program: yup.string().required("Kolom ini wajib diisi"),
  position: yup.string().required("Kolom ini wajib diisi"),
  reporter: yup.string().required("Kolom ini wajib diisi"),
  description: yup.string().required("Kolom ini wajib diisi"),
  contact: yup.string().required("Kolom ini wajib diisi"),
  reportDate: yup.date().required("Kolom ini wajib diisi"),
  email: yup.string().email("Format email tidak valid").optional(),
  incidentDate: yup.date().required("Kolom ini wajib diisi"),
  incidentLocation: yup.string().required("Kolom ini wajib diisi"),
  perpetrator: yup.string().required("Kolom ini wajib diisi"),
  link: yup
    .string()
    .test("url", "Format link tidak valid", (value) => !value || /^https?:\/\//.test(value))
    .optional(),
});

export default function ComplaintPage() {
  const [isOpen, setIsOpen] = useState(false);

  const form = useMutation<SelectedComplaint>({
    defaultValue: {
      id: 0,
      name: "",
      major: "",
      program: "",
      position: "mahasiswa",
      reporter: "korban",
      description: "",
      contact: "",
      email: "",
      incidentDate: new Date(),
      incidentLocation: "",
      perpetrator: "",
      reportDate: new Date(),
    },
  });

  const onClose = () => {
    setIsOpen(false);
    form.clearData();
    form.clearError();
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const onSubmit = async () => {
    try {
      // Validasi data secara manual menggunakan schema yup
      await validationSchema.validate(form.data, { abortEarly: false });
      form.post(apiRoute.complaints.create, {
        validation: true,
        except: ["id"],
        onSuccess: () => {
          form.clearData();
          form.clearError();
          setIsOpen(false);
        },
        onError: (e) => {
          console.log(e.response?.data.message);
        },
      });
    } catch (validationErrors) {
      console.log(validationErrors); // Log validation errors
    }
  };

  return (
    <MainTemplate>
      <Stack gap={2}>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "end",
            mx: 6,
          }}
        >
          <Button variant="contained" sx={{ py: 1.5 }} onClick={onOpen}>
            Buat Pelaporan
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h6"
            fontWeight={600}
            textAlign="center"
            sx={{ mb: 1.5 }}
            color={PRIMARY}
          >
            Jangan Takut Bersuara
          </Typography>
          <img src={img} alt="" />
        </Box>
      </Stack>
      <CustomDialog
        title="Formulir Pengaduan"
        footerAction
        open={isOpen}
        handleClose={onClose}
        size="xs"
        onSubmit={onSubmit}
      >
        <FormComplaint
          form={{
            ...form,
            submit: onSubmit,
            dialogOpen: isOpen,
            setDialogOpen: setIsOpen,
          }}
        />
      </CustomDialog>
    </MainTemplate>
  );
}
