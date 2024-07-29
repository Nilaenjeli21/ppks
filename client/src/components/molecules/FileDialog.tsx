import React, { FC, useState, useEffect, useCallback } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";

interface FileDialogProps {
  title?: string;
  fileUrl: string;
  fileName: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FileDialog: FC<FileDialogProps> = (props) => {
  const { title, fileName, fileUrl, open, setOpen } = props;
  const ext = fileName ? fileName.split(".").pop() : "";

  const [loading, setLoading] = useState<boolean>(false);
  const [currentFile, setCurrentFile] = useState<string>("");

  const fetchFile = useCallback(async () => {
    if (!fileName || !fileUrl) {
      return;
    }

    if (!open) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(fileUrl);
      const blob = await response.blob();

      const blobUrl = URL.createObjectURL(blob);
      setCurrentFile(blobUrl);
    } catch (error) {
      console.clear();
      console.log(error);
    }

    setLoading(false);
  }, [open, fileName, fileUrl]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = currentFile;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchFile();
  }, [fetchFile]);

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="md">
        {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
        <DialogContent>
          {loading ? (
            <DialogContentText
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress color="primary" />
            </DialogContentText>
          ) : ext === "pdf" && currentFile ? (
            <DialogContentText
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <iframe
                title="file"
                style={{ width: "100%", minHeight: "500px" }}
                src={currentFile}
              ></iframe>
            </DialogContentText>
          ) : currentFile ? (
            <DialogContentText
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <img
                src={currentFile}
                alt=""
                style={{
                  maxWidth: "80%",
                  margin: "auto 0",
                }}
              />
            </DialogContentText>
          ) : (
            <DialogContentText>-</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Tutup
          </Button>
          <Button onClick={handleDownload} color="primary" variant="contained">
            Unduh
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FileDialog;
