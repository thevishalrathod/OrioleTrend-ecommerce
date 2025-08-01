import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./UserCartItemsContent";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const UserCartWrapper = ({ cartItems, setOpenCartSheet }) => {
  const navigate = useNavigate();
  //   console.log(cartItems, " :cartitems userCartWrapper");

  const totalCartAmmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md overflow-auto">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>

      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => <UserCartItemsContent cartItem={item} />)
          : null}
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmmount}</span>
        </div>
      </div>

      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6  "
      >
        Checkout
      </Button>
    </SheetContent>
  );
};

export default UserCartWrapper;
