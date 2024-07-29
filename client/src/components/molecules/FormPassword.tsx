import apiRoute from "@common/constant/ApiRoute";
import InputPassword from "@components/atoms/ImputPassword";
import { useUser } from "@context/AppContext";
import { Box, Button, FormLabel } from "@mui/material";
import { useMutation } from "frhooks";

export default function FormPassword({ onClose }: { onClose: () => void }) {
  const { user } = useUser();

  const form = useMutation<{
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    defaultValue: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    schema: (yup) =>
      yup.object().shape({
        currentPassword: yup
          .string()
          .required("Kolom ini wajib diisi")
          .min(8, "Password minimal 8 karakter"),
        newPassword: yup
          .string()
          .required("Kolom ini wajib diisi")
          .min(8, "Password minimal 8 karakter"),
        confirmPassword: yup
          .string()
          .required("Kolom ini wajib diisi")
          .oneOf([yup.ref("newPassword")], "Konfirmasi password tidak sama."),
      }),
    scenario: {
      password: ["currentPassword", "newPassword", "confirmPassword"],
    },
  });
  const onSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    form.put([apiRoute.users.password, { id: user.id }], {
      options: {
        data: {
          password: form.data.newPassword,
          currentPassword: form.data.currentPassword,
        },
      },
      validation: true,
      onSuccess: async () => {
        form.clearError();
        form.clearData();
        onClose();
      },
      onError: (e) => {
        const msg = e.response?.data.message;
        if (msg === "User Atau Password Tidak Valid") {
          form.setError({ currentPassword: "Password yang dimasukkan salah" });
        } else {
          console.log(e);
        }
      },
    });
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box>
        <FormLabel required>Password Sekarang</FormLabel>
        <InputPassword
          fullWidth
          id="password"
          name="password"
          onChange={(e) =>
            form.setData({ currentPassword: e.currentTarget.value })
          }
          error={form.error("currentPassword")}
          helperText={form.message("currentPassword")}
          onBlur={() => form.validate("currentPassword")}
        />
      </Box>
      <Box>
        <FormLabel required>Password Baru</FormLabel>
        <InputPassword
          fullWidth
          id="password"
          name="password"
          onChange={(e) => form.setData({ newPassword: e.currentTarget.value })}
          error={form.error("newPassword")}
          helperText={form.message("newPassword")}
          onBlur={() => form.validate("newPassword")}
        />
      </Box>
      <Box>
        <FormLabel required>Konfirmasi Password</FormLabel>
        <InputPassword
          fullWidth
          id="password"
          name="password"
          onChange={(e) =>
            form.setData({ confirmPassword: e.currentTarget.value })
          }
          error={form.error("confirmPassword")}
          helperText={form.message("confirmPassword")}
          onBlur={() => form.validate("confirmPassword")}
        />
      </Box>
      <Button variant="contained" onClick={onSubmit}>
        Ubah
      </Button>
    </Box>
  );
}
