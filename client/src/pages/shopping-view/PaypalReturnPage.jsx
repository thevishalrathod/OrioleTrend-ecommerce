import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice/ShoppingOrderSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const PaypalReturnPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  console.log("PAYMENT ID: ", paymentId);
  console.log("PAYER ID: ", payerId);

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

      dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
        console.log("DATA IN capturePayment: ", data);
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = `${
            import.meta.env.CLIENT_API_URL
          }/shop/payment-success`;
        }
      });
    }
  }, [paymentId, payerId, dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment... Please Wait</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default PaypalReturnPage;
