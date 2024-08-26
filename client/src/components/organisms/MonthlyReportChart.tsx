import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from "chart.js";
import { Box, Typography } from "@mui/material";

// Register ChartJS components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

interface MonthlyReportChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      borderWidth?: number;
    }[];
  };
}

const MonthlyReportChart: React.FC<MonthlyReportChartProps> = ({ data }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Grafik Laporan Bulanan
      </Typography>
      <Line
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top" as const,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${context.dataset.label}: ${context.raw}`;
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Bulan",
              },
            },
            y: {
              title: {
                display: true,
                text: "Jumlah Pengaduan",
              },
              beginAtZero: true,
            },
          },
        }}
      />
    </Box>
  );
};

export default MonthlyReportChart;
