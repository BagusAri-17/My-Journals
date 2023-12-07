import { Navigate, Outlet } from "react-router-dom";
import authService from "../services/authService";

export function ProtectRoute() {
  if (authService.isAuthenticated()) return <Navigate to="/dashboard/utama" />;
  return <Outlet />;
}
