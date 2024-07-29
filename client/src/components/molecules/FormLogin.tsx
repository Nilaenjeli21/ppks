import InputPassword from "@components/atoms/ImputPassword";
import { Box, Button, TextField, Typography } from "@mui/material";
import { UserLogin } from "./Header";

interface FormLoginProps {
  form: FRHooks.UseMutation<UserLogin>;
  onSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  errorMessage: string;  // Tambahkan errorMessage ke dalam props
}

export default function FormLogin({ form, onSubmit, errorMessage }: FormLoginProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        required
        fullWidth
        label="Email"
        name="email"
        autoComplete="email"
        onChange={(e) => {
          form.setData({ email: e.currentTarget.value });
        }}
        error={form.error("email")}
        helperText={form.message("email")}
        onBlur={() => form.validate("email")}
      />
      <InputPassword
        fullWidth
        required
        id="password"
        name="password"
        label="Kata Sandi"
        onChange={(e) => {
          form.setData({ password: e.currentTarget.value });
        }}
        error={form.error("password")}
        helperText={form.message("password")}
        onBlur={() => {
          form.validate("password");
        }}
      />
      {errorMessage && (  // Tampilkan pesan kesalahan jika ada
        <Typography color="error" variant="body2">
          {errorMessage}
        </Typography>
      )}
      <Button variant="contained" onClick={onSubmit}>
        Masuk
      </Button>
    </Box>
  );
}
