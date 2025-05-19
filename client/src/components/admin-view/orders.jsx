import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, deleteOrder } from "@/store/admin/order-slice";
import AdminOrderDetailsView from "./order-details";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { useToast } from "../ui/use-toast";

function AdminOrdersView() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { orderList } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  const handleDeleteOrder = async (orderId) => {
    try {
      const result = await dispatch(deleteOrder(orderId)).unwrap();
      if (result.success) {
        dispatch(getAllOrdersForAdmin());
        toast({
          title: "Order deleted successfully",
          className: "bg-green-500 text-white",
        });
      } else {
        toast({
          title: result.message || "Failed to delete order",
          className: "bg-red-500 text-white",
        });
      }
    } catch (error) {
      toast({
        title: error.message || "Failed to delete order",
        className: "bg-red-500 text-white",
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
      case "delivered":
        return "bg-green-500 hover:bg-green-600";
      case "rejected":
        return "bg-red-600 hover:bg-red-700";
      case "inProcess":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "inShipping":
        return "bg-blue-500 hover:bg-blue-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Orders</h1>
      <div className="grid gap-4 md:gap-6">
        {orderList && orderList.length > 0 ? (
          orderList.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Order #{order._id}</p>
                  <p className="font-medium text-lg">${order.totalAmount}</p>
                  <p className="text-sm text-gray-500">
                    {order.orderDate.split("T")[0]}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <Badge className={`py-1 px-3 ${getStatusColor(order.orderStatus)}`}>
                    {order.orderStatus}
                  </Badge>
                  <div className="flex items-center gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-sm text-blue-600 hover:text-blue-700 px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
                        >
                          View Details
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-[600px] bg-gradient-to-b from-gray-50 to-white p-0">
                        {selectedOrder && (
                          <AdminOrderDetailsView orderDetails={selectedOrder} />
                        )}
                      </DialogContent>
                    </Dialog>
                    <button
                      onClick={() => handleDeleteOrder(order._id)}
                      className="text-sm text-red-600 hover:text-red-700 px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrdersView;
