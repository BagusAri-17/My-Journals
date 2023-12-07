import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "../pages/home-pages";
import Login from "../pages/auth-pages/Login";
import DashMain from "../pages/dashboard-pages/DashMain";
import DashForm from "../pages/dashboard-pages/DashForm";
import DashTable from "../pages/dashboard-pages/DashTable";
import NotFound from "../pages/error-pages/NotFound";
import { PrivateRoute } from "./PrivateRoute";
import { ProtectRoute } from "./ProtectRoute";
import JournalPages from "../pages/journal-pages";

const SetupRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/daftar-jurnal" element={<JournalPages />} />

          <Route path="/" element={<PrivateRoute />}>
            <Route path="/dashboard/utama" element={<DashMain />} />
            <Route path="/dashboard/unggah-jurnal" element={<DashForm />} />
            <Route path="/dashboard/list-jurnal" element={<DashTable />} />
          </Route>

          <Route path="/" element={<ProtectRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default SetupRoutes;
