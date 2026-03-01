import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "../Admins/components/common/slidebarAdmin"; // Path to your sidebar
import { useSelector } from "react-redux";
import AddUserPage from "../Admins/pages/addUsers";

const AdminLayout = () => {
  const darkMode = useSelector((state) => state.theme.mode === "dark");

  return (
    /* Main wrapper: uses flex to lay out Sidebar and Contents side-by-side */
    <div className={ `flex h-screen w-full overflow-hidden ${
      darkMode ? 'bg-[#020617]' : 'bg-slate-50'
    }`}>
      
      {/* 1. SIDEBAR (Fixed Height, Dynamic Width handled by its own Framer Motion) */}
      <Sidebar />

      {/* 2. MAIN VIEWPORT */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
         <AddUserPage/>

        {/* 3. SCROLLABLE CONTENT AREA */}
        <div className={`flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar`}>
          {/* Outlet renders the AddUserPage, Dashboard, etc. */}
          <Outlet />
        </div>
        
      </div>
    </div>
  );
};

export default AdminLayout;