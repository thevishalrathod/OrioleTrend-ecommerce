import React from "react";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItem,
  updateCartQuantity,
} from "@/store/shop/cart-slice/ShoppingCartSlice";
import { toast } from "sonner";

const UserCartItemsContent = ({ cartItem }) => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) toast("Cart item deleted successfuly!");
    });
  }

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction === "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getTotalStock = productList[getCurrentProductIndex].totalStock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;

          if (getQuantity + 1 > getTotalStock) {
            toast(`Only ${getQuantity} quantity can be added for this item`, {
              style: {
                color: "white",
                background: "red",
              },
            });
            return;
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast("Cart item updated successfuly!");
      }
    });
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />

      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-3 mt-1">
          <Button
            variant="outline"
            size="icon"
            className="h-4 w-4 rounded"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <MinusIcon className="w-2 h-2" />
            <span className="sr-only">Decrease</span>
          </Button>

          <span>{cartItem?.quantity}</span>

          <Button
            variant="outline"
            size="icon"
            className="h-4 w-4 rounded"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <PlusIcon className="w-2 h-2" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>

      <div className="felx flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
};

export default UserCartItemsContent;
