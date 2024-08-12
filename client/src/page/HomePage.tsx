import apiRoute from "@common/constant/ApiRoute";
import PointsCard, { poinType } from "@components/organisms/PointsCard";
import MainTemplate from "@components/templates/MainTemplate";
import { Stack, Typography, IconButton } from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp'; 
import { api } from "@service/index";
import useFetch from "ezhooks/lib/useFetch";
import pnp from "@common/img/satgasppks.png";
import satgas from "@common/img/penilaian.jpg";

export default function HomePage() {
  const points = useFetch<poinType>({
    service: async () => (await api.get(apiRoute.complaints.status)).data,
    selector: (resp) => resp.data,
  });

  return (
    <MainTemplate>
      <Stack gap={4} sx={{ px: { xs: 2, sm: 3 }, py: { xs: 3, sm: 4 } }}>
        <Stack sx={{ textAlign: 'center' }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
            SATGAS PPKS PNP SIAP MEMBANTU MELINDUNGI KORBAN
          </Typography>
          <Typography variant="body1" fontWeight={600} color={'primary.light'}>
            Kerahasiaan akan terjamin
          </Typography>
        </Stack>
        <div style={{ position: 'relative', width: '100%', height: 'auto', maxHeight: '467px' }}>
          <img
            src={pnp}
            alt="Pangkalan Data"
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
          <a
            href="https://wa.me/6285182056839" 
            style={{ position: 'absolute', bottom: '10px', right: '10px' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton
              color="primary"
              sx={{
                backgroundColor: 'white',
                '&:hover': {
                  backgroundColor: 'lightgray',
                },
                borderRadius: '50%',
                padding: 1,
              }}
            >
              <WhatsAppIcon sx={{ fontSize: 40, color: 'green' }} />
            </IconButton>
          </a>
        </div>
        <PointsCard points={points} />
        <img
          src={satgas}
          alt="Penilaian Satgas"
          style={{ width: "100%", height: "auto", maxHeight: "800px", objectFit: "cover" }}
        />
      </Stack>
    </MainTemplate>
  );
}
