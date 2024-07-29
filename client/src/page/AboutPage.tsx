import { PRIMARY } from "@common/constant/Color";
import MainTemplate from "@components/templates/MainTemplate";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import pnp from "@common/img/struktursatgas.jpg";

const list = [
  {
    poin: "Tugas Satgas PPKS",
    subPoin: [
      "Membantu Direktur menyusun pedoman Pencegahan dan Penanganan Kekerasan Seksual di Lingkungan Politeknik Negeri Padang",
      "Melakukan survei Kekerasan Seksual paling sedikit 1 (satu) kali dalam 6 (enam) bulan pada Lingkungan Politeknik Negeri Padang",
      "Menyampaikan hasil survei sebagaimana dimaksud dalam huruf b kepada Direktur Politeknik Negeri Padang",
      "Menyosialisasikan pendidikan kesetaraan gender, kesetaraan disabilitas, pendidikan kesehatan seksual dan reproduksi, serta Pencegahan dan Penanganan Kekerasan Seksual bagi warga kampus",
      "Menindaklanjuti Kekerasan Seksual berdasarkan laporan",
      "Melakukan koordinasi dengan unit yang menangani layanan disabilitas, apabila laporan menyangkut korban, saksi, pelapor, dan/atau Terlapor dengan disabilitas",
      "Melakukan koordinasi dengan instansi terkait dalam pemberian perlindungan kepada Korban dan Saksi",
      "Memantau pelaksanaan rekomendasi dari Satuan Tugas oleh Direktur, dan",
      "Menyampaikan laporan kegiatan Pencegahan dan Penanganan Kekerasan Seksual kepada Rektor paling sedikit 1 (satu) kali dalam 6 (enam) bulan.",
    ],
  },
  {
    poin: "Dalam melaksanakan tugas sebagaimana dimaksud pada ayat (1), Satuan Tugas berwewenang:",
    subPoin: [
      "Memanggil dan meminta keterangan korban, saksi, terlapor, pendamping, dan/ atau ahli",
      "Meminta bantuan rektor untuk menghadirkan saksi, terlapor, pendamping, dan/ atau ahli dalam pemeriksaan",
      "Melakukan konsultasi terkait pencegahan dan penanganan kekerasan seksual dengan pihak terkait dengan mempertimbangkan kondisi, keamanan dan kenyamanan korban",
    ],
  },
];

export default function AboutPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <MainTemplate>
      <Stack gap={4}>
        <Typography
          sx={{ mx: 3, textAlign: 'center' }}
          variant="h6"
          fontWeight={600}
          fontSize={isMobile ? '1.5rem' : '2rem'}
        >
          Struktur Organisasi SATGAS PPKS PNP
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            overflow: 'hidden',
            maxHeight: isMobile ? '400px' : '1200px'
          }}
        >
          <img
            src={pnp}
            alt="Struktur Satgas"
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </Box>
        <Box sx={{ px: 3 }}>
          <Typography
            textAlign="center"
            variant="body1"
            fontWeight={600}
            color={PRIMARY}
            sx={{ mb: 2 }}
          >
            TUGAS DAN WEWENANG
          </Typography>
          <Typography
            textAlign="center"
            variant="body1"
            fontWeight={600}
            color={PRIMARY}
            sx={{ mb: 4 }}
          >
            SATGAS PPKS
          </Typography>
          <ol style={{ margin: 0, paddingLeft: '20px' }}>
            {list.map((item, index) => (
              <li key={index} style={{ fontWeight: 600, marginBottom: '20px' }}>
                <Typography variant="body1" fontWeight={600} sx={{ my: 1 }}>
                  {item.poin}
                </Typography>
                <ol style={{ listStyleType: 'lower-alpha', paddingLeft: '30px' }}>
                  {item.subPoin.map((subItem, subIndex) => (
                    <li key={subIndex} style={{ marginBottom: '5px', textAlign: 'justify' }}>
                      <Typography variant="body1">
                        {subItem}
                      </Typography>
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ol>
        </Box>
      </Stack>
    </MainTemplate>
  );
}
