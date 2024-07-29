import Footer from "@components/molecules/Footer";
import Header from "@components/molecules/Header";
import { Box } from "@mui/material";

export default function MainTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Box sx={{ mt: 16 }}>{children}</Box>
      <Footer />
    </>
  );
}
