import { PRIMARY } from "@common/constant/Color";
import MainTemplate from "@components/templates/MainTemplate";
import {
  Box,
  Button,
  Divider,
  FormLabel,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import pdf from "@common/img/Pdf.png";
import satgas from "@common/img/satgas.jpg";
import { Rule } from "@common/types/Rule";
import useTable, { EventTable } from "ezhooks/lib/useTable";
import { api } from "@service/index";
import apiRoute from "@common/constant/ApiRoute";
import ThreeDotsMenu from "@components/atoms/ThreeDotsMenu";
import { useUser } from "@context/AppContext";
import { Role } from "@common/constant/Enum";
import { UseUploadFile } from "./RecommendationPage";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CustomDialog from "@components/organisms/CustomDialog";
import { useMutation } from "frhooks";
import FileDialog from "@components/molecules/FileDialog";
import { useState } from "react";

const getRules = async (event?: EventTable) => {
  const paramsProps = event?.params || {};
  const { data } = await api.get(apiRoute.rule.index, {
    params: {
      ...paramsProps,
    },
  });

  return data;
};

export default function RulesPage() {
  const { user } = useUser();
  const uploadFile = UseUploadFile();
  const [isOpen, setIsOpen] = useState(false);
  const [openFile, setOpenFile] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const rules = useTable<Rule>({
    service: getRules,
    selector: (resp) => resp.rows,
    total: (resp) => resp.count,
    pagination: {
      startPage: 0,
      perPage: 5,
    },
  });

  const form = useMutation<Rule>({
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

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    console.log(form.data);

    form.post(apiRoute.rule.index, {
      validation: true,
      except: ["id"],
      onSuccess: async () => {
        if (uploadFile.postFile) {
          uploadFile.upload();
        }
        rules.reload();
        form.clearData();
        setIsOpen(false);
      },
    });
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onDelete = (id: number) => {
    form.destroy([apiRoute.rule.detail, { id }], {
      onSuccess: async () => {
        rules.reload();
      },
    });
  };

  return (
    <MainTemplate>
      <Stack gap={4}>
        <Stack sx={{ mx: 3 }}>
          <Typography
            variant="h6"
            fontWeight={600}
            textAlign="center"
            fontSize={isMobile ? '1.5rem' : '2rem'}
          >
            SATGAS PPKS PNP SIAP MEMBANTU MELINDUNGI KORBAN
          </Typography>
          <Typography
            variant="body1"
            fontWeight={600}
            textAlign="center"
            fontSize={isMobile ? '0.875rem' : '1rem'}
          >
            Kerahasiaan akan terjamin
          </Typography>
        </Stack>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            overflow: 'hidden',
            maxHeight: isMobile ? '300px' : '1200px',
          }}
        >
          <img
            src={satgas}
            alt="Satgas"
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </Box>
        <Box>
          <Typography
            textAlign="center"
            variant="body1"
            fontWeight={600}
            color={PRIMARY}
            fontSize={isTablet ? '1rem' : '1.25rem'}
          >
            Kumpulan Peraturan
          </Typography>
          <Typography
            textAlign="center"
            variant="body1"
            fontWeight={600}
            color={PRIMARY}
            fontSize={isTablet ? '1rem' : '1.25rem'}
          >
            SATGAS PPKS
          </Typography>
        </Box>
        {user?.role === Role.ADMIN && (
          <>
            <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2 }}>
              <Button variant="contained" onClick={() => setIsOpen(true)}>
                Tambah Data
              </Button>
            </Box>
            <CustomDialog
              title="Form Peraturan"
              footerAction
              open={isOpen}
              handleClose={onClose}
              size="xs"
              onSubmit={onSubmit}
              isRecommendationPage={true}
            >
              <>
                <FormLabel required>Peraturan</FormLabel>
                <TextField
                  inputProps={{ accept: "application/pdf" }}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={form.data.originalName}
                  sx={{ mt: 1 }}
                  error={form.error("link")}
                  helperText={
                    form.message("link") || form.message("originalName")
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ paddingLeft: 0 }}>
                        <Button
                          component="label"
                          focusRipple
                          size="small"
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
          </>
        )}
        <Box sx={{ maxHeight: isMobile ? "200px" : "300px", overflow: "auto" }}>
          {rules.data.map((rule, i) => (
            <Box key={i} sx={{ mb: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    gap: 2,
                  }}
                  onClick={() => {
                    window.open(`http://localhost:3000/img/${rule.link}`);
                  }}
                >
                  <img src={pdf} alt="PDF Icon" style={{ width: isMobile ? "40px" : "50px" }} />
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    color="#837C7C"
                    fontSize={isMobile ? '0.875rem' : '1rem'}
                  >
                    {rule.originalName}
                  </Typography>
                </Box>
                {user?.role === Role.ADMIN && (
                  <Box>
                    <ThreeDotsMenu
                      menu={[
                        {
                          label: "Delete",
                          onClick: () => {
                            onDelete(rule.id);
                          },
                        },
                      ]}
                    />
                  </Box>
                )}
              </Box>
              <Divider />
            </Box>
          ))}
        </Box>
      </Stack>
    </MainTemplate>
  );
}
