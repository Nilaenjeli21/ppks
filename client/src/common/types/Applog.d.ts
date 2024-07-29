import { User } from "./User";

export interface Applog {
  id: number;
  UserId: number;
  User?: User;
  message?: string;
  timestamp: date;
}
