import {
  TextFieldProps,
  FormControl,
  InputLabel,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import FileDialog from "@components/molecules/FileDialog";
type InputFileProps = TextFieldProps & {
  inputLabel?: string;
  subLabel?: string;
  fileUrl?: string;
  setValue?: (name: string, file: File) => void;
  setError?: (msg: string) => void;
};
const InputFile = ({
  inputLabel,
  subLabel,
  setValue,
  setError,
  fileUrl,
  ...props
}: InputFileProps) => {
  const [currentFile, setCurrentFile] = useState(fileUrl || "");
  const [currentFileName, setCurrentFileName] = useState("");
  const [openFile, setOpenFile] = useState(false);

  return (
    <FormControl fullWidth sx={{ pl: 0 }}>
      {inputLabel && (
        <InputLabel
          id="file-label"
          sx={{
            position: "relative",
            marginBottom: "5px",
            left: "-15px",
            whiteSpace: "break-spaces",
          }}
        >
          {inputLabel}
          {subLabel && (
            <small style={{ display: "block", color: "#979797" }}>
              <i>{subLabel}</i>
            </small>
          )}
        </InputLabel>
      )}
      <input
        style={{ display: "none" }}
        id={`button-file-${props.name}`}
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
          if (ev.target.files && ev.target.files[0] && setError && setValue) {
            const file = ev.target.files[0];
            const size = Math.trunc(file.size / 1024);
            const originalname = file.name;
            if (originalname) {
              const ext = originalname.split(".").pop();
              if (["pdf", "png", "jpg", "jpeg"].includes(ext as string)) {
                if (size > 10000) {
                  setError("Ukuran file tidak sesuai");
                  return;
                } else {
                  setValue(originalname, file);
                  setCurrentFile(window.URL.createObjectURL(file));
                  setCurrentFileName(originalname);
                }
              } else {
                setError("File tidak diperbolehkan");
                return;
              }
            }
          }
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        {...props}
        InputProps={{
          disabled: true,
          startAdornment: (
            <InputAdornment position="start" sx={{ paddingLeft: 0 }}>
              <label
                htmlFor={`button-file-${props.name}`}
                style={{ textAlign: "center", cursor: "pointer" }}
              >
                <Button
                  focusRipple
                  size="small"
                  key={"Upload"}
                  component="span"
                  variant="outlined"
                >
                  Pilih File
                </Button>
              </label>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="start" sx={{ paddingLeft: 0 }}>
              {currentFile && (
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
      <FileDialog
        open={openFile}
        setOpen={() => setOpenFile(false)}
        fileUrl={currentFile}
        fileName={currentFileName}
      />
    </FormControl>
  );
};
export default InputFile;
