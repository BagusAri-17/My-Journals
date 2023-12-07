import { useNavigate } from "react-router-dom";
import { BiSolidDashboard, BiBookAdd, BiTable, BiLogOut } from "react-icons/bi";
import authService from "../../services/authService";

const Sidebar = ({ open }) => {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await authService.logOut();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <aside
        className={`fixed left-0 top-0 h-full w-44 bg-darkBlue p-4 md:w-60 lg:w-64 ${
          open ? "-translate-x-0" : "-translate-x-full"
        }`}
      >
        <a
          href="#"
          className="flex items-center border-b border-b-gray-400 pb-4"
        >
          {/* <img className="mx-auto w-40" src={Logo} alt="" /> */}
        </a>
        <ul className="mt-4">
          <li className="mb-2">
            <a href="/dashboard/utama" className="sidebar-item">
              <BiSolidDashboard />
              <span>Dashboard</span>
            </a>
          </li>
          <li className="mb-2">
            <a href="/dashboard/unggah-jurnal" className="sidebar-item">
              <BiBookAdd />
              <span>Unggah Jurnal</span>
            </a>
          </li>
          <li className="mb-2">
            <a href="/dashboard/list-jurnal" className="sidebar-item">
              <BiTable />
              <span>List Jurnal</span>
            </a>
          </li>
          <li className="mb-2">
            <button onClick={handleLogOut} className="sidebar-item w-full">
              <BiLogOut />
              <span>Keluar</span>
            </button>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
