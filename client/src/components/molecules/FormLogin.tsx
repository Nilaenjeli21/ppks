import { useState } from "react";
import InputPassword from "@components/atoms/ImputPassword";
import { Box, Button, TextField, Typography } from "@mui/material";
import { UserLogin } from "./Header";

interface FormLoginProps {
  form: FRHooks.UseMutation<UserLogin>;
  onSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
  errorMessage: string;  
}

export default function FormLogin({ form, onSubmit, errorMessage }: FormLoginProps) {
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    try {
      await onSubmit(event);
      if (!form.error("email") && !form.error("password")) {
        setIsLoginSuccessful(true);
      }
    } catch (error) {
      setIsLoginSuccessful(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {isLoginSuccessful ? (
        <Typography color="success" variant="body1">
          Anda berhasil login!
        </Typography>
      ) : (
        <>
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
          {errorMessage && (
            <Typography color="error" variant="body2">
              {errorMessage}
            </Typography>
          )}
          <Button variant="contained" onClick={handleSubmit}>
            Masuk
          </Button>
        </>
      )}
    </Box>
  );
}
