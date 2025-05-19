import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "../ui/use-toast";
import { Package, Truck, CreditCard, MapPin, User } from "lucide-react";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
          className: "bg-green-500 text-white",
        });
      }
    });
  }

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
    <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-[600px] bg-gradient-to-b from-gray-50 to-white p-0">
      <div className="grid gap-4 p-6">
        {/* Order Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-4 text-white sticky top-0 z-10 -mx-6 -mt-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Order Details</h2>
              <p className="text-purple-100 text-sm">Order #{orderDetails?._id}</p>
            </div>
            <Badge className={`py-1 px-3 ${getStatusColor(orderDetails?.orderStatus)}`}>
              {orderDetails?.orderStatus}
            </Badge>
          </div>
        </div>

        {/* Order Information */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Package className="h-4 w-4" />
                <p className="text-sm font-medium">Order Date</p>
              </div>
              <p className="text-gray-900">{orderDetails?.orderDate.split("T")[0]}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <CreditCard className="h-4 w-4" />
                <p className="text-sm font-medium">Total Amount</p>
              </div>
              <p className="text-gray-900 font-semibold">${orderDetails?.totalAmount}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <CreditCard className="h-4 w-4" />
                <p className="text-sm font-medium">Payment Method</p>
              </div>
              <p className="text-gray-900">{orderDetails?.paymentMethod}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Badge className="h-4 w-4" />
                <p className="text-sm font-medium">Payment Status</p>
              </div>
              <p className="text-gray-900">{orderDetails?.paymentStatus}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-sm font-semibold mb-3 text-gray-800">Order Items</h3>
          <div className="space-y-2">
            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
              ? orderDetails?.cartItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-800">{item.title}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                      <span className="text-sm font-medium text-purple-600">${item.price}</span>
                    </div>
                  </div>
                ))
              : <p className="text-sm text-gray-500 text-center">No items found</p>}
          </div>
        </div>

        {/* Shipping Information */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-4 w-4 text-purple-600" />
            <h3 className="text-sm font-semibold text-gray-800">Shipping Information</h3>
          </div>
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{user.userName}</span>
            </div>
            <p>{orderDetails?.addressInfo?.address}</p>
            <p>{orderDetails?.addressInfo?.city}</p>
            <p>{orderDetails?.addressInfo?.pincode}</p>
            <p>{orderDetails?.addressInfo?.phone}</p>
            {orderDetails?.addressInfo?.notes && (
              <p className="text-xs italic text-gray-500 mt-1">Note: {orderDetails?.addressInfo?.notes}</p>
            )}
          </div>
        </div>

        {/* Update Status Form */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-2 mb-3">
            <Truck className="h-4 w-4 text-purple-600" />
            <h3 className="text-sm font-semibold text-gray-800">Update Order Status</h3>
          </div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText="Update Status"
            onSubmit={handleUpdateStatus}
            buttonClassName="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white shadow-md w-full text-sm"
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;

