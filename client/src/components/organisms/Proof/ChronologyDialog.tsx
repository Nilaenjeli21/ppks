// ChronologyDialog.tsx
import React, { useState } from 'react';
import { Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

interface ChronologyDialogProps {
  text: string;
}

const ChronologyDialog: React.FC<ChronologyDialogProps> = ({ text }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Typography
        sx={{ whiteSpace: 'pre-wrap' }}
      >
        {text.length > 150 ? text.substring(0, 150) + "..." : text}
      </Typography>
      {text.length > 150 && (
        <Button
          variant="text"
          color="primary"
          onClick={handleClickOpen}
          sx={{ mt: 1 }}
        >
          Lihat Selengkapnya
        </Button>
      )}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Kronologis Lengkap</DialogTitle>
        <DialogContent>
          <Typography
            sx={{ whiteSpace: 'pre-wrap' }}
          >
            {text}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChronologyDialog;
