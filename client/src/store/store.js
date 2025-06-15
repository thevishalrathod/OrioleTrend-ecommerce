import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index.js";
import adminProductsSlice from "./admin/products-slice/AdminProductsSlice.js";
import adminOrderSlice from "./admin/order-slice/AdminOrdersSlice.js";
import shopProductsSlice from "./shop/product-slice/ShoppingProductsSlice.js";
import shopCartSlice from "./shop/cart-slice/ShoppingCartSlice.js";
import shopAddressSlice from "./shop/address-slice/ShoppingAddressSlice.js";
import shopOrderSlice from "./shop/order-slice/ShoppingOrderSlice.js";
import shopSearchSlice from "./shop/search-slice/SearchSlice.js";
import shopReviewSlice from "./shop/review-slice/ReviewSlice.js";
import commonFeatureSlice from "./common-slice/index.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
    adminOrder: adminOrderSlice,
    shopProducts: shopProductsSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
    shopSearch: shopSearchSlice,
    shopReview: shopReviewSlice,
    commonFeature: commonFeatureSlice,
  },
});

export default store;
