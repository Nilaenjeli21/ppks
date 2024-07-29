import { Role } from "@common/constant/Enum";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role?: Role;

  password?: string;
}
