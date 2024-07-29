import { Role } from "./Enum";

export type Link = {
  label: string;
  path: string;
  canAccess: string[];
};

export default function Menu(): Link[] {
  return [
    {
      label: "Beranda",
      path: "/",
      canAccess: [Role.ADMIN, Role.USER, Role.ADVISER],
    },
    {
      label: "Tentang",
      path: "/about",
      canAccess: [Role.ADMIN, Role.USER, Role.ADVISER],
    },
    {
      label: "Pengaduan",
      path: "/complaint",
      canAccess: [Role.ADMIN, Role.USER, Role.ADVISER],
    },
    {
      label: "Kumpulan peraturan",
      path: "/rules",
      canAccess: [Role.ADMIN, Role.USER, Role.ADVISER],
    },
  ];
}
