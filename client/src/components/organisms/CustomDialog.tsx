import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export interface CustomDialogProps {
  children: JSX.Element;
  open: boolean;
  handleClose: () => void;
  title?: string;
  footerAction?: boolean;
  onSubmit?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  isRecommendationPage?: boolean;  // Tambahkan prop ini
}

export default function CustomDialog({
  children,
  open,
  handleClose,
  title,
  footerAction = false,
  onSubmit,
  size = "md",
  isRecommendationPage = false,  // Tambahkan default value untuk prop ini
}: CustomDialogProps) {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={size}>
      {title && (
        <>
          <DialogTitle sx={{ p: "16px" }}>
            <Typography
              fontSize={20}
              sx={{ flex: 1, fontWeight: "600", position: "relative" }}
              component="div"
            >
              {title}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 30,
                top: 10,
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider />
        </>
      )}
      <DialogContent
        sx={{
          px: "28px",
        }}
      >
        {children}
      </DialogContent>
      {footerAction && isRecommendationPage && (
  <DialogActions sx={{ justifyContent: "start", px: "28px", py: "10px" }}>
    <Box display="flex" gap={2} sx={{ width: "100%" }}>
      <Button
        id="CustomDialog-Submit"
        color="primary"
        size="large"
        variant="contained"
        onClick={onSubmit}
      >
        Kirim
      </Button>
    </Box>
  </DialogActions>
)}

    </Dialog>
  );
}
