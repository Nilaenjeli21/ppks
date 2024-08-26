import { RouteObject } from "react-router-dom";
import HomePage from "./page/HomePage";
import AboutPage from "./page/AboutPage";
import ComplaintPage from "./page/ComplaintPage";
import RulesPage from "./page/RulesPage";
import AllComplaintPage from "./page/AllComplaintPage";
import ProofPage from "./page/ProofPage";
import RecommendationPage from "./page/RecommendationPage";
import ApplogPage from "./page/ApplogPage";
import UserPage from "./page/UserPage";
import AdminAuth from "@components/layouts/AdminAuth";

const router: RouteObject[] = [
  {
    element: <HomePage />,
    path: "/",
  },
  {
    element: <AboutPage />,
    path: "/about",
  },
  {
    element: <ComplaintPage />,
    path: "/complaint",
  },
  {
    element: <RulesPage />,
    path: "/rules",
  },
  {
    element: <AdminAuth page={<AllComplaintPage />} />,
    path: "/all-complaint",
  },
  {
    element: <AdminAuth page={<ProofPage />} />,
    path: "/proof",
  },
  {
    element: <AdminAuth page={<RecommendationPage />} />,
    path: "/recommendation",
  },
  {
    element: <AdminAuth page={<ApplogPage />} />,
    path: "/applog",
  },
  {
    element: <AdminAuth page={<UserPage />} />,
    path: "/user",
  },
];

export default router;
