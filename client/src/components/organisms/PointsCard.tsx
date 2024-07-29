import { PRIMARY } from "@common/constant/Color";
import { Card, Stack, Typography } from "@mui/material";
import { UseFetch } from "ezhooks/lib/useFetch";

export type poinType = {
  open: number;
  inProgress: number;
  closed: number;
};

export default function PointsCard({ points }: { points: UseFetch<poinType> }) {
  const { open, inProgress, closed } = points.data;

  const cards = [
    {
      point: open || 0,
      title: "Kasus Masuk",
    },
    {
      point: inProgress || 0,
      title: "Kasus Diproses",
    },
    {
      point: closed || 0,
      title: "Kasus Selesai",
    },
  ];

  return (
    <Stack
      direction={"row"}
      gap={2}
      justifyContent="center"
      alignItems="center"
      sx={{ height: '30vh' }} 
    >
      {cards.map((card, i) => (
        <Card
          key={i}
          sx={{
            width: "310px",
            display: "flex",
            px: 2,
            py: 3.5,
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: PRIMARY,
          }}
        >
          <Typography variant="h3" fontWeight={600} color="white">
            {card.point}
          </Typography>
          <Typography variant="body1" fontWeight={500} color="white">
            {card.title}
          </Typography>
        </Card>
      ))}
    </Stack>
  );
}
