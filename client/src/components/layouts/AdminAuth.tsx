import { Navigate, useLocation } from "react-router-dom";
import useLocalStorage from "@hooks/useLocalStorage";
import { useUser } from "@context/AppContext";
import { Role } from "@common/constant/Enum";

const AdminAuth = ({ page }: { page: JSX.Element }) => {
  const location = useLocation();
  const storage = useLocalStorage();
  const { user } = useUser();

  if (!storage.hasItem("token") && user.role !== (Role.ADMIN || Role.ADVISER)) {
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }

  return page;
};

export default AdminAuth;
