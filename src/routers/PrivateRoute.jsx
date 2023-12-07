import Unauthorized from "../pages/error-pages/Unauthorized";
import authService from "../services/authService";
import { Outlet } from "react-router-dom";

export function PrivateRoute() {
  if (!authService.isAuthenticated()) {
    return <Unauthorized />;
  }
  return <Outlet />;
}
