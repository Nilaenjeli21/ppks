import createTheme from "@mui/material/styles/createTheme";
import { PRIMARY } from "./Color";

const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY,
    },
    background: {
      default: "#f5f5f5",
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "contained" },
          style: { color: "white" },
        },
      ],
    },
  },
});

export default theme;
