import { AppBar, Box, Button, IconButton, Stack, Tab, Tabs, Toolbar, Typography, Avatar, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import logo from "@common/img/Logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import Menu from "@common/constant/Menu";
import { Role } from "@common/constant/Enum";
import CustomDialog from "@components/organisms/CustomDialog";
import { useState } from "react";
import { useMutation } from "frhooks";
import { User } from "@common/types/User";
import apiRoute from "@common/constant/ApiRoute";
import FormLogin from "./FormLogin";
import useLocalStorage from "@hooks/useLocalStorage";
import { useUser } from "@context/AppContext";
import ThreeDotsMenu from "@components/atoms/ThreeDotsMenu";
import { PRIMARY } from "@common/constant/Color";
import FormProfile from "./FormProfile";
import FormPassword from "./FormPassword";
import { useMediaQuery, useTheme } from "@mui/material";

export type UserLogin = Pick<User, "email" | "password">;

export default function Header() {
  const menu = Menu();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const userRole = user.role || Role.USER;
  const ListMenu = menu.filter((item) => item.canAccess.includes(userRole));
  const [isOpen, setIsOpen] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // State untuk Drawer
  const [errorMessage, setErrorMessage] = useState(""); // Mendeklarasikan state untuk errorMessage
  const storage = useLocalStorage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const buttons = [
    { label: 'Seluruh Pengaduan', path: '/all-complaint' },
    { label: 'Bukti', path: '/proof' },
    { label: 'Rekomendasi', path: '/recommendation' },
    ...(userRole === Role.ADMIN ? [{ label: 'AppLog', path: '/applog' }] : []),
    ...(userRole === Role.ADMIN ? [{ label: 'User', path: '/user' }] : []),
  ];
  

  const form = useMutation<UserLogin>({
    defaultValue: {
      email: "",
      password: "",
    },
    schema: (yup) =>
      yup.object().shape({
        email: yup
          .string()
          .required("Kolom ini wajib diisi")
          .email("Format email tidak valid"),
        password: yup
          .string()
          .required("Kolom ini wajib diisi")
          .min(8, "Password minimal 8 karakter"),
      }),
    scenario: {
      islogin: ["email", "password"],
    },
  });

  const onClose = () => {
    setIsOpen(false);
    setIsProfile(false);
    setIsPassword(false);
    form.clearData();
    form.clearError();
    setErrorMessage(""); // Reset errorMessage saat dialog ditutup
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  const onSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    form.post(apiRoute.users.login, {
      validation: true,
      scenario: "islogin",
      onSuccess: (data) => {
        storage.setItem("token", data.token);
        setIsOpen(false);
        navigate("/all-complaint");
      },
      onError: () => {
        setErrorMessage("Email/Password salah");
      },
    });
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        {ListMenu.map((item) => (
          <ListItem button key={item.label} onClick={() => navigate(item.path)}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        {userRole !== Role.USER && buttons.map((button) => (
          <ListItem button key={button.path} onClick={() => navigate(button.path)}>
            <ListItemText primary={button.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ p: 1, backgroundColor: "white", justifyContent: "center" }}>
        <Toolbar>
          {isMobile ? (
            <>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawer}
              </Drawer>
            </>
          ) : (
            <IconButton size="large" edge="start" color="inherit" aria-label="menu">
              <img src={logo} alt="logo" style={{ width: "70px" }} />
            </IconButton>
          )}
          <Stack sx={{ flexGrow: 1, color: "black" }}>
            <Typography variant="body1" component="div" fontWeight={600}>
              SATGAS PPKS
            </Typography>
            <Typography variant="body1" component="div" fontWeight={600}>
              POLITEKNIK NEGERI PADANG
            </Typography>
          </Stack>
          {!isMobile && (
            <Tabs value={location.pathname} onChange={handleChange} aria-label="basic tabs example">
              {ListMenu.map((item) => (
                <Tab sx={{ textTransform: "none", fontWeight: 600 }} value={item.path} key={item.label} label={item.label} />
              ))}
            </Tabs>
          )}
          {userRole === Role.USER ? (
            <Button variant="text" sx={{ textTransform: "none", color: "black" }} onClick={() => setIsOpen(true)}>
              Masuk
            </Button>
          ) : (
            <>
              {!isMobile && buttons.map((button) => (
                <Button
                  key={button.path}
                  color="inherit"
                  onClick={() => navigate(button.path)}
                  sx={{
                    p: 0.5,
                    color: location.pathname === button.path ? 'orange' : 'grey',
                    fontSize: '0.8rem',
                    textTransform: 'capitalize',
                    fontWeight: 790,
                    position: 'relative',
                    ...(location.pathname === button.path && {
                      '::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -4,
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: 'orange',
                      },
                    }),
                  }}
                >
                  {button.label}
                </Button>
              ))}
              <ThreeDotsMenu
                icon={
                  <Avatar sx={{ width: 32, height: 32, backgroundColor: PRIMARY }}>
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                }
                menu={[
                  {
                    label: "Pengaturan Profil",
                    onClick: () => {
                      setIsProfile(true);
                    },
                  },
                  {
                    label: "Ganti Password",
                    onClick: () => {
                      setIsPassword(true);
                    },
                  },
                  {
                    label: "Keluar",
                    onClick: () => {
                      storage.removeItem("token");
                      window.location.reload();
                      navigate("/");
                    },
                  },
                ]}
              />
            </>
          )}
        </Toolbar>
      </AppBar>
      <CustomDialog open={isOpen || isProfile || isPassword} handleClose={onClose} size="xs">
        <>
          {isOpen && <FormLogin form={form} onSubmit={onSubmit} errorMessage={errorMessage} />}
          {isProfile && <FormProfile onClose={onClose} />}
          {isPassword && <FormPassword onClose={onClose} />}
        </>
      </CustomDialog>
    </Box>
  );
}
