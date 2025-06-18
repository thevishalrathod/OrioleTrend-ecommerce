import React from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

const ShoppingOrderDetailsView = ({ orderDetails }) => {
  const { user } = useSelector((state) => state.auth);

  // console.log("user: ", user);

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
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "delivered"
                    ? "bg-yellow-500"
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
                {orderDetails?.orderStatus}
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
      </div>
    </DialogContent>
  );
};

export default ShoppingOrderDetailsView;
