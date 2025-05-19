import { Outlet, useLocation } from "react-router-dom";
import AdminSideBar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";

function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const location = useLocation();

  // Function to determine background color based on current route
  const getBackgroundColor = () => {
    const path = location.pathname;
    if (path.includes('/admin/dashboard')) return 'bg-blue-50';
    if (path.includes('/admin/products')) return 'bg-green-50';
    if (path.includes('/admin/orders')) return 'bg-purple-50';
    if (path.includes('/admin/features')) return 'bg-yellow-50';
    return 'bg-gray-50';
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* admin sidebar */}
      <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />
      <div className="flex flex-1 flex-col">
        {/* admin header */}
        <AdminHeader setOpen={setOpenSidebar} />
        <main className={`flex-1 flex-col flex ${getBackgroundColor()} p-4 md:p-6 transition-colors duration-300`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
