import { PRIMARY } from "@common/constant/Color";
import { Box, Divider, Stack, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ p: 3, pb: 12, mt: 4, backgroundColor: PRIMARY }}>
      <Stack gap={3} direction={"row"}>
        <Stack sx={{ width: "50%" }} gap={2}>
          <Typography variant="body1" textAlign="center" fontWeight={600}>
            SATGAS PPKS PNP
          </Typography>
          <Divider />
          <Typography variant="body2">
            Lt 1 Gedung Akademik, Kampus Politeknik Negeri Padang, Limau Manis,
            Kecamatan Pauh, Kota Padang 25164, Provinsi Sumatera Barat
          </Typography>
        </Stack>
        <Stack sx={{ width: "50%" }} gap={2}>
          <Typography variant="body1" textAlign="center" fontWeight={600}>
            SATGAS PPKS PNP
          </Typography>
          <Divider />
          <Box>
  <table>
    <tbody>
      <tr>
        <td><Typography variant="body2"><b>Hotline</b></Typography></td>
        <td><Typography variant="body2"><b>:</b></Typography></td>
        <td><Typography variant="body2">+62813-7448-8435</Typography></td>
      </tr>
      <tr>
        <td><Typography variant="body2"><b>Instagram</b></Typography></td>
        <td><Typography variant="body2"><b>:</b></Typography></td>
        <td><Typography variant="body2">@satgasppkspoltekpadang</Typography></td>
      </tr>
      <tr>
        <td><Typography variant="body2"><b>Facebook</b></Typography></td>
        <td><Typography variant="body2"><b>:</b></Typography></td>
        <td><Typography variant="body2">@satgasppkspoltekpadang</Typography></td>
      </tr>
      <tr>
        <td><Typography variant="body2"><b>TikTok</b></Typography></td>
        <td><Typography variant="body2"><b>:</b></Typography></td>
        <td><Typography variant="body2">@satgasppkspoltekpadang</Typography></td>
      </tr>
    </tbody>
  </table>
</Box>

        </Stack>
      </Stack>
    </Box>
  );
}
