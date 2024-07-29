import { useRoutes } from "react-router-dom";
import router from "./Router";
import { ThemeProvider } from "@mui/material";
import theme from "@common/constant/Theme";
import { UserProvider } from "@context/AppContext";
import { HookProvider } from "frhooks";
import { api } from "./services";
import apiRoute from "@common/constant/ApiRoute";

export default function App() {
  const element = useRoutes(router);

  return (
    <UserProvider>
      <HookProvider client={api} route={apiRoute}>
        <ThemeProvider theme={theme}>{element}</ThemeProvider>
      </HookProvider>
    </UserProvider>
  );
}
