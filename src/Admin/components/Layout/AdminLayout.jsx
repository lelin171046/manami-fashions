import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import Breadcrumb from "./Breadcrumb.jsx";
import useContactRealtime from "../../../hooks/useContactRealtime.js";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useContactRealtime();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:ml-64">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 lg:p-6">
          <Breadcrumb />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
