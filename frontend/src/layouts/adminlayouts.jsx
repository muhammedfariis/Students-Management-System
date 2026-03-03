import { Outlet } from "react-router-dom";
import Sidebar from "../Admins/components/common/slidebarAdmin"; 
import { useSelector } from "react-redux";

const AdminLayout = () => {
  const darkMode = useSelector((state) => state.theme.mode === "dark");

  return (
    <div className={`flex h-screen w-full overflow-hidden ${
      darkMode ? 'bg-[#020617]' : 'bg-slate-50'
    }`}>
      
      {/* 1. SIDEBAR - Stays visible on all admin pages */}
      <Sidebar />

      {/* 2. MAIN VIEWPORT */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* 3. SCROLLABLE CONTENT AREA */}
        <div className={`flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar`}>
          {/* This Outlet is crucial: it renders the child routes */}
          <Outlet />
        </div>
        
      </div>
    </div>
  );
};

export default AdminLayout;