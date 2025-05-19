import { Outlet } from "react-router-dom";
import ShoppingHeader from "@/components/shopping-view/header";
import Footer from "@/components/common/footer";

function ShoppingLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ShoppingHeader />
      <div className="flex-grow">
        <Outlet />
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default ShoppingLayout; 