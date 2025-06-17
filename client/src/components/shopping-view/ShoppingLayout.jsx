import React from "react";
import { Outlet } from "react-router-dom";
import ShoppingHeader from "./ShoppingHeader";
import ShoppingFooter from "./ShoppingFooter";

const ShoppingLayout = () => {
  return (
    <div className="flex flex-col bg-white overflow-hidden ">
      {/* Common header components of shopping view */}
      <ShoppingHeader />

      <main className="flex flex-col w-full ">
        <Outlet />
      </main>
      <ShoppingFooter />
    </div>
  );
};

export default ShoppingLayout;
