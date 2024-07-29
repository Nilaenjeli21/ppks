import React, { useState, useEffect } from 'react';
import { Complaint } from "@common/types/Complaint";
import {
  Autocomplete,
  Box,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Button,
  FormHelperText,
} from "@mui/material";
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from '@components/organisms/Complaint/CaptchaEngine';
import { UseMutation } from 'frhooks';

const major = [
  "Teknik Mesin",
  "Teknik Sipil",
  "Teknik Elektro",
  "Akutansi",
  "Teknologi Informasi",
  "Administrasi Niaga",
  "Bahasa Inggris",
];

export type SelectedComplaint = Pick<
  Complaint,
  | "id"
  | "name"
  | "contact"
  | "description"
  | "position"
  | "reporter"
  | "major"
  | "program"
  | "link"
>;

interface FormComplaintProps {
  form: UseMutation<SelectedComplaint> & {
    submit: () => void;
    dialogOpen: boolean;
    setDialogOpen: (open: boolean) => void;
  };
}

export default function FormComplaint({ form }: FormComplaintProps) {
  const [captchaInput, setCaptchaInput] = useState('');
  const [isCaptchaValid, setIsCaptchaValid] = useState(true);
  const [captchaError, setCaptchaError] = useState('');
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    major?: string;
    program?: string;
    reporter?: string;
    position?: string;
    description?: string;
    contact?: string;
  }>({});

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setCaptchaInput(userInput);
    const isValid = validateCaptcha(userInput, false);
    setIsCaptchaValid(isValid);
    setCaptchaError(isValid ? '' : 'Captcha tidak valid, coba lagi.');
  };

  const handleSubmit = () => {
    const errors: {
      name?: string;
      major?: string;
      program?: string;
      reporter?: string;
      position?: string;
      description?: string;
      contact?: string;
    } = {};

    if (!form.data.name) errors.name = 'Nama wajib diisi.';
    if (!form.data.major) errors.major = 'Jurusan wajib diisi.';
    if (!form.data.program) errors.program = 'Prodi wajib diisi.';
    if (!form.data.reporter) errors.reporter = 'Status Pelapor wajib diisi.';
    if (!form.data.position) errors.position = 'Jabatan wajib diisi.';
    if (!form.data.description) errors.description = 'Kronologis kejadian wajib diisi.';
    if (!form.data.contact) errors.contact = 'Nomor Hp/Wa wajib diisi.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (!validateCaptcha(captchaInput)) {
      setCaptchaError('Captcha salah, coba lagi.');
      setIsCaptchaValid(false);
      return;
    }

    setIsCaptchaValid(true);
    setCaptchaError('');
    setFormErrors({});
    form.submit(); 
  };

  const program = form.data.major === "Teknik Mesin"
    ? [
        "Teknik Mesin (D3)",
        "Teknik Alat Berat (D3)",
        "Teknik Manufaktur (Sarjana Terapan / D4)",
        "Rekayasa Perancangan Mekanik (Sarjana Terapan / D4)",
      ]
    : form.data.major === "Teknik Sipil"
    ? [
        "Teknik Sipil (D3)",
        "Teknologi Sipil (D3) PSDKU Tanah Datar",
        "Teknik Perancangan Irigasi dan Rawa (Sarjana Terapan / D4)",
        "Perancangan Jalan dan Jembatan (Sarjana Terapan / D4)",
        "Manajemen Rekayasa Kontruksi (Sarjana Terapan / D4)",
        "Rekayasa Perawatan dan Restorasi Jembatan (Magister Terapan / S2)",
      ]
    : form.data.major === "Teknik Elektro"
    ? [
        "Instalasi dan Pemeliharaan Kabel Bertenaga Rendah ( D2 Jalur Cepat / Fast Track)",
        "Teknik Listrik (D3)",
        "Teknik Listrik (D3) PSDKU Pelalawan",
        "Teknik Elekronika (D3)",
        "Teknik Telekomunikasi (D3)",
        "Teknik Telekomunika Industri (Sarjana Terapan / D4)",
        "Teknik Telekomunikasi (Sarjana Terapan / D4)",
        "Teknik Rekayasa Instalasi Listrik (Sarjana Terapan / D4)",
      ]
    : form.data.major === "Akutansi"
    ? [
        "Akutansi (D3)",
        "Akutansi (D3) PSDKU Solok Selatan",
        "Akutansi (Sarjana Terapan / D4)",
        "Sistem Informasi Akutansi (Magister Terapan / S2)",
      ]
    : form.data.major === "Teknologi Informasi"
    ? [
        "Administrasi Jaringan Komputer ( D2 Jalur Cepat / Fast Track)",
        "Teknik Komputer (D3)",
        "Teknik Komputer (D3) PSDKU Solok Selatan",
        "Manajemen Informatika (D3)",
        "Manajemen Informatika (D3) PSDKU Pelalawan",
        "Sistem Informasi (D3) PSDKU Tanah Datar",
        "Teknologi Rekayasa Perangkat Lunak (Sarjana Terapan / D4)",
        "Animasi (Sarjana Terapan / D4)",
      ]
    : form.data.major === "Administrasi Niaga"
    ? [
        "Administrasi Bisnis (D3)",
        "Destinasi Parawisata (Sarjana Terapan / D4)",
        "Usaha Perjalanan Wisata (Sarjana Terapan / D4)",
        "Bisnis Digital (Sarjana Terapan / D4)",
        "Logistik Perdaganan Internasional (Sarjana Terapan / D4)",
      ]
    : [
        "Bahasa Inggris (D3)",
        "Bahasa Inggris Untuk Komunikasi Bisnis dan Profesional (Sarjana Terapan / D4)",
      ];

  return (
    <>
      <Stack gap={2}>
        <FormLabel required>Nama</FormLabel>
        <TextField
          required
          fullWidth
          value={form.data.name}
          onChange={(e) => form.setData({ ...form.data, name: e.target.value })}
          error={!!formErrors.name}
          helperText={formErrors.name}
        />
        <FormLabel required>Jurusan</FormLabel>
        <Autocomplete
          disablePortal
          id="major"
          options={major}
          fullWidth
          value={form.data.major}
          onChange={(e, value) => {
            form.setData({ ...form.data, major: value || "", program: "" });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              error={!!formErrors.major}
              helperText={formErrors.major}
            />
          )}
        />
        <FormLabel required>Prodi</FormLabel>
        <Autocomplete
          disablePortal
          id="program"
          options={program || []}
          fullWidth
          value={form.data.program}
          onChange={(e, value) => form.setData({ ...form.data, program: value || "" })}
          renderInput={(params) => (
            <TextField
              {...params}
              error={!!formErrors.program}
              helperText={formErrors.program}
            />
          )}
        />
        <Box>
          <FormLabel required>Status Pelapor</FormLabel>
          <RadioGroup
            value={form.data.reporter}
            name="reporterStatus"
            onChange={(e) => form.setData({ ...form.data, reporter: e.target.value })}
          >
            <FormControlLabel value="korban" control={<Radio />} label="Korban" />
            <FormControlLabel value="saksi" control={<Radio />} label="Saksi" />
          </RadioGroup>
          <FormHelperText error={!!formErrors.reporter}>
            {formErrors.reporter}
          </FormHelperText>
        </Box>
        <Box>
          <FormLabel required>Jabatan</FormLabel>
          <RadioGroup
            value={form.data.position}
            name="position"
            onChange={(e) => form.setData({ ...form.data, position: e.target.value })}
          >
            <FormControlLabel value="mahasiswa" control={<Radio />} label="Mahasiswa" />
            <FormControlLabel value="dosen" control={<Radio />} label="Dosen" />
            <FormControlLabel value="tenaga pendidik" control={<Radio />} label="Tenaga Pendidik" />
            <FormControlLabel value="alumni" control={<Radio />} label="Alumni" />
            <FormControlLabel value="lainya" control={<Radio />} label="Lainya" />
          </RadioGroup>
          <FormHelperText error={!!formErrors.position}>
            {formErrors.position}
          </FormHelperText>
        </Box>
        <FormLabel required>
          Kronologis Singkat Kejadian Kekerasan Seksual yang Anda alami atau Anda ketahui
        </FormLabel>
        <TextField
          required
          fullWidth
          rows={4}
          multiline
          value={form.data.description}
          onChange={(e) => form.setData({ ...form.data, description: e.target.value })}
          error={!!formErrors.description}
          helperText={formErrors.description}
        />
        <FormLabel required>Nomor Hp/Wa yang dapat dihubungi</FormLabel>
        <TextField
          required
          fullWidth
          value={form.data.contact}
          onChange={(e) => form.setData({ ...form.data, contact: e.target.value })}
          error={!!formErrors.contact}
          helperText={formErrors.contact}
        />
        <FormLabel>Link Bukti (jika ada)</FormLabel>
        <TextField
          fullWidth
          value={form.data.link}
          onChange={(e) => form.setData({ ...form.data, link: e.target.value })}
        />
        <FormLabel>Captcha</FormLabel>
        <LoadCanvasTemplate />
        <TextField
          required
          fullWidth
          value={captchaInput}
          onChange={handleCaptchaChange}
          error={!isCaptchaValid}
          helperText={captchaError}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
        >
          Kirim
        </Button>
      </Stack>
    </>
  );
}
