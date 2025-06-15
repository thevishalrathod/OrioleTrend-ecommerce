import React, { useState } from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "../common/CommonForm";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice/AdminOrdersSlice";
import { toast } from "sonner";

const initialFormData = {
  status: "",
};

const AdminOrderDetailsView = ({ orderDetails }) => {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleUpdateStatus(event) {
    event.preventDefault();
    // console.log("Formdata: ", formData);

    const { status } = formData;
    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast(data?.payload?.message, {
          style: {
            color: "white",
            background: "green",
          },
        });
      }
    });
  }

  // console.log("orderDetails: ", orderDetails?.id);

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[550px] overflow-auto">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between mt-6">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "delivered"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "pending"
                    ? "bg-orange-500"
                    : orderDetails?.orderStatus === "inProcess"
                    ? "bg-yellow-500"
                    : orderDetails?.orderStatus === "inShipping"
                    ? "bg-blue-500"
                    : "bg-red-500"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
          <div className="flex items-center justify-between mt-6">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>

          <div className="flex items-center justify-between mt-6">
            <p className="font-medium">Payment Method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>

          <div className="flex items-center justify-between mt-6">
            <p className="font-medium">Payment Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.paymentStatus === "paid"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              >
                {orderDetails?.paymentStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li className="flex items-center justify-between">
                      <span>Title:{item?.title}</span>
                      <span>Quantity:{item?.quantity}</span>
                      <span>Price:${item?.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5">
              <span className="font-semibold">
                Username:
                <span className="text-muted-foreground"> {user?.userName}</span>
              </span>
              <span className="font-semibold">
                Address:{" "}
                <span className="text-muted-foreground">
                  {orderDetails?.addressInfo?.address}
                </span>
              </span>
              <span className="font-semibold">
                City:
                <span className="text-muted-foreground">
                  {orderDetails?.addressInfo?.city}
                </span>
              </span>
              <span className="font-semibold">
                Pincode:
                <span className="text-muted-foreground">
                  {orderDetails?.addressInfo?.pincode}
                </span>
              </span>
              <span className="font-semibold">
                Phone:
                <span className="text-muted-foreground">
                  {orderDetails?.addressInfo?.phone}
                </span>
              </span>
              <span className="font-semibold">
                Notes:
                <span className="text-muted-foreground">
                  {orderDetails?.addressInfo?.notes}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div>
          <CommonForm
            formControls={[
              {
                label: "Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                  { id: "confirmed", label: "Confirmed" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetailsView;
