import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { BiMenu } from "react-icons/bi";

const DashMain = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Sidebar open={open} />
      <main
        className={`min-h-screen w-[cal(100%-176px)] bg-gray-50 md:w-[cal(100%-240px)] lg:w-[cal(100%-256px)] ${
          open ? "ml-44 md:ml-60 lg:ml-64" : "ml-0"
        }`}
      >
        <div className="flex items-center gap-2 bg-white px-4 py-4 shadow-md shadow-black/5">
          <button type="button" className="text-lg text-gray-600">
            <BiMenu
              size={24}
              onClick={() => {
                setOpen(!open);
              }}
            />
          </button>
          <ul className="flex items-center">
            <li>
              <a href="#" className="text-primary text-lg">
                Dashboard
              </a>
            </li>
          </ul>
        </div>
        <div className="p-6">
          <h2 className="section-title">Main Dashboard</h2>
        </div>
      </main>
    </>
  );
};

export default DashMain;
