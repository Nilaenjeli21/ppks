import apiRoute from "@common/constant/ApiRoute";
import { ComplaintStatus } from "@common/constant/Enum";
import { Complaint } from "@common/types/Complaint";
import FileDialog from "@components/molecules/FileDialog";
import CustomDialog from "@components/organisms/CustomDialog";
import TableRecommendation from "@components/organisms/Recommendation/TableRecommendation";
import MainTemplate from "@components/templates/MainTemplate";
import {
  Box,
  Button,
  FormLabel,
  InputAdornment,
  TextField,
} from "@mui/material";
import { api } from "@service/index";
import useTable, { EventTable } from "ezhooks/lib/useTable";
import { useMutation } from "frhooks";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";

const getProssesComplaints = async (event?: EventTable) => {
  const paramsProps = event?.params || {};
  const { data } = await api.get(apiRoute.complaints.index, {
    params: {
      ...paramsProps,
      arrayStatus: [ComplaintStatus.IN_PROGRESS, ComplaintStatus.CLOSED],
    },
  });

  return data;
};

type RecommendationForm = {
  id: number;
  link: string;
  originalName: string;
};

export function UseUploadFile() {
  const [originalFile, setOrginalFile] = useState<File>();
  const [postFile, setPostFile] = useState<File>();
  const [fileName, setFileName] = useState("");
  const [originalFileName, setOriginalFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const setFile = (
    file: File,
    cb?: (value: { file?: File; fileName?: string; extention?: string }) => void
  ) => {
    const extention = file.name!.split(".").pop();
    const filename = `${Date.now()}.${extention}`;
    const newFile = new File([file], filename, { type: file.type });
    setFileName(filename);
    setOrginalFile(file);
    setOriginalFileName(file.name);
    setPostFile(newFile);
    setFileUrl((file && URL.createObjectURL(file)) || "");

    if (cb) cb({ file, fileName: filename, extention });
  };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", postFile!);
      await api.post(apiRoute.upload.index, formData);
      setFileUrl("");
      setPostFile(undefined);
      setOrginalFile(undefined);
      setFileName("");
      setOriginalFileName("");
    } catch (e) {
      console.log(e);
    }
  };

  return {
    originalFile,
    setFile,
    fileName,
    fileUrl,
    postFile,
    originalFileName,
    upload,
  };
}

export default function RecommendationPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [openFile, setOpenFile] = useState(false);

  const uploadFile = UseUploadFile();

  const form = useMutation<RecommendationForm>({
    defaultValue: {
      id: 0,
      link: "",
      originalName: "",
    },
    schema: (yup) =>
      yup.object().shape({
        link: yup.string().required("Kolom ini wajib diisi"),
        originalName: yup.string().required("Kolom ini wajib diisi"),
      }),
  });

  const table = useTable<Complaint>({
    service: getProssesComplaints,
    selector: (resp) => resp.rows,
    total: (resp) => resp.count,
    pagination: {
      startPage: 0,
      perPage: 5,
    },
  });
  const onAccept = (id: number) => {
    form.setData({ id });
    setIsOpen(true);
  };
  const onReject = async (id: number) => {
    try {
      await api.put(`${apiRoute.complaints.index}/${id}/reject`);
      table.reload();
    } catch (e) {
      console.log(e);
    }
  };
  const onClose = () => {
    setIsOpen(false);
  };
  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    form.put([apiRoute.complaints.close, { id: form.data.id }], {
      validation: true,
      except: ["id"],
      onSuccess: async () => {
        if (uploadFile.postFile) {
          await uploadFile.upload();
        }
        table.reload();
        form.clearData();
        setIsOpen(false);
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
        <TableRecommendation
          table={table}
          onAccept={onAccept}
          onReject={onReject}
        />
      </Box>
      <CustomDialog
        title="Upload Rekomendasi"
        footerAction
        open={isOpen}
        handleClose={onClose}
        size="xs"
        onSubmit={onSubmit}
        isRecommendationPage={true}
      >
        <>
          <FormLabel required>Surat Rekomendasi</FormLabel>
          <TextField
            inputProps={{ accept: "application/pdf" }}
            variant="outlined"
            fullWidth
            margin="normal"
            value={form.data.originalName}
            sx={{ mt: 1 }}
            error={form.error("link")}
            helperText={form.message("link") || form.message("originalName")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ paddingLeft: 0 }}>
                  <Button
                    component="label"
                    focusRipple
                    size="small"
                    key={"Upload"}
                    variant="outlined"
                  >
                    Pilih File
                    <input
                      type="file"
                      hidden
                      accept="application/pdf"
                      onChange={(e) => {
                        const target = e.target as HTMLInputElement;
                        const selectedFile = target.files
                          ? target.files[0]
                          : null;
                        if (selectedFile) {
                          uploadFile.setFile(selectedFile, (v) => {
                            form.setData({
                              link: v.fileName,
                              originalName: v.file?.name,
                            });
                          });
                        }
                      }}
                    />
                  </Button>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="start" sx={{ paddingLeft: 0 }}>
                  {uploadFile.fileUrl && (
                    <Button
                      focusRipple
                      size="small"
                      key={"Preview"}
                      component="span"
                      onClick={() => setOpenFile(true)}
                    >
                      <VisibilityIcon fontSize="small" />
                    </Button>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </>
      </CustomDialog>
      <FileDialog
        open={openFile}
        setOpen={() => setOpenFile(false)}
        fileUrl={uploadFile.fileUrl}
        fileName={uploadFile.originalFileName}
      />
    </MainTemplate>
  );
}
