// UserContext.tsx
import apiRoute from "@common/constant/ApiRoute";
import { Role } from "@common/constant/Enum";
import { User } from "@common/types/User";
import useLocalStorage from "@hooks/useLocalStorage";
import { api } from "@service/index";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const defaultUser: User = {
  id: 0,
  name: "",
  email: "",
  role: Role.USER,
  phone: "",
};

const UserContext = createContext({
  user: defaultUser,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setUser: (value: User) => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User>(defaultUser);
  const storage = useLocalStorage();
  const navigate = useNavigate();
  const token = storage.getItem("token");

  const fetchData = async () => {
    try {
      if (token) {
        const { data } = await api.get(apiRoute.users.current, {
          headers: {
            Authorization: `token ${token}`,
          },
        });
        if (data) {
          setUserState({
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role,
            phone: data.phone,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, navigate]);

  const setUser = (newUser: User) => {
    setUserState(newUser);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a AppProvider");
  }
  return { user: context.user, setUser: context.setUser };
};
