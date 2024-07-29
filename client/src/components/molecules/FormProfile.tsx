import apiRoute from "@common/constant/ApiRoute";
import { useUser } from "@context/AppContext";
import { Box, Button, FormLabel, TextField } from "@mui/material";
import { useMutation } from "frhooks";

export default function FormProfile({ onClose }: { onClose: () => void }) {
  const { user, setUser } = useUser();

  const form = useMutation<{ name: string; email: string; phone: string }>({
    defaultValue: {
      email: user.email,
      name: user.name,
      phone: user.phone,
    },
    schema: (yup) =>
      yup.object().shape({
        name: yup.string().required("Kolom ini wajib diisi"),
        email: yup
          .string()
          .required("Kolom ini wajib diisi")
          .email("Format email tidak valid"),
        phone: yup
          .string()
          .required("Kolom ini wajib diisi")
          .typeError("Kolom ini wajib diisi")
          .min(11, "Nomor Hp minimal 11 karakter"),
      }),
  });

  const onSubmit = () => {
    form.put([apiRoute.users.detail, { id: user.id }], {
      validation: true,
      onSuccess: () => {
        setUser({
          name: form.data.name,
          email: form.data.email,
          phone: form.data.phone,
          role: user.role,
          id: user.id,
        });
        onClose();
      },
    });
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box>
        <FormLabel required>Nama</FormLabel>
        <TextField
          fullWidth
          name="name"
          autoComplete="email"
          value={form.data.name}
          onChange={(e) => form.setData({ name: e.currentTarget.value })}
          error={form.error("name")}
          helperText={form.message("name")}
          onBlur={() => form.validate("name")}
        />
      </Box>
      <Box>
        <FormLabel required>Email</FormLabel>
        <TextField
          fullWidth
          name="email"
          autoComplete="email"
          value={form.data.email}
          onChange={(e) => form.setData({ email: e.currentTarget.value })}
          error={form.error("email")}
          helperText={form.message("email")}
          onBlur={() => form.validate("email")}
        />
      </Box>
      <Box>
        <FormLabel required>No Hp</FormLabel>
        <TextField
          fullWidth
          name="phone"
          autoComplete="phone"
          value={form.data.phone}
          onChange={(e) => form.setData({ phone: e.currentTarget.value })}
          error={form.error("phone")}
          helperText={form.message("phone")}
          onBlur={() => form.validate("phone")}
        />
      </Box>
      <Button variant="contained" onClick={onSubmit}>
        Ubah
      </Button>
    </Box>
  );
}
