import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
    color: "from-blue-500 to-blue-600",
    hoverColor: "hover:from-blue-600 hover:to-blue-700",
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
    color: "from-green-500 to-green-600",
    hoverColor: "hover:from-green-600 hover:to-green-700",
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
    color: "from-purple-500 to-purple-600",
    hoverColor: "hover:from-purple-600 hover:to-purple-700",
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false); // Close the sidebar after navigation
  };

  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => {
        const isActive = location.pathname === menuItem.path;
        return (
          <div
            key={menuItem.id}
            onClick={() => handleNavigation(menuItem.path)}
            className={`flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2.5 transition-all duration-200 ${
              isActive
                ? `bg-gradient-to-r ${menuItem.color} text-white shadow-md`
                : `text-gray-600 hover:bg-gradient-to-r ${menuItem.hoverColor} hover:text-white hover:shadow-md`
            }`}
          >
            {menuItem.icon}
            <span className="font-medium">{menuItem.label}</span>
          </div>
        );
      })}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 bg-gradient-to-b from-gray-50 to-white">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b border-gray-200">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
                  <ChartNoAxesCombined size={24} className="text-white" />
                </div>
                <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Admin Panel
                </h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-gradient-to-b from-gray-50 to-white p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2 mb-8"
        >
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
            <ChartNoAxesCombined size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Admin Panel
          </h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
