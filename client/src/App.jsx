import { Route, Routes } from "react-router-dom";
import { Button } from "./components/ui/button";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdmnLayout from "./components/admin-view/AdminLayout";
import AdminDashboard from "./pages/admin-view/AdminDashboard";
import AdminProducts from "./pages/admin-view/AdminProducts";
import AdminOrders from "./pages/admin-view/AdminOrders";
import AdminFeatures from "./pages/admin-view/AdminFeatures";
import ShoppingLayout from "./components/shopping-view/ShoppingLayout";
import NotFound from "./pages/not-found/NotFound";
import ShoppingHome from "./pages/shopping-view/ShoppingHome";
import ShoppingListing from "./pages/shopping-view/ShoppingListing";
import ShoppingCheckout from "./pages/shopping-view/ShoppingCheckout";
import ShoppingAccount from "./pages/shopping-view/ShoppingAccount";
import CheckAuth from "./components/common/CheckAuth";
import UnauthPage from "./pages/unauth-page/UnauthPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "./components/ui/skeleton";
import PaypalReturnPage from "./pages/shopping-view/PaypalReturnPage";
import PaymentSuccessPage from "./pages/shopping-view/PaymentSuccessPage";
import SearchProducts from "./pages/shopping-view/SearchProducts";
import PaypalDemo from "./pages/shopping-view/PaypalDemo";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading)
    return (
      <Skeleton className="lg:h-[500px] md:h-[300px] sm:h-screen w-[] m-4 bg-slate-300 flex items-center justify-center" />
    );

  console.log("APP.JSX");
  return (
    <>
      <div className="flex flex-col overflow-hidden bg-white">
        {/* common components */}
        {/* <h1>Header Component</h1> */}

        <Routes>
          <Route
            path="/"
            element={
              <CheckAuth
                isAuthenticated={isAuthenticated}
                user={user}
              ></CheckAuth>
            }
          />

          {/* Auth Routes */}
          <Route
            path="/auth"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AuthLayout />
              </CheckAuth>
            }
          >
            <Route path="login" element={<AuthLogin />} />
            <Route path="register" element={<AuthRegister />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AdmnLayout />
              </CheckAuth>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="features" element={<AdminFeatures />} />
          </Route>

          {/* Shopping Routes */}
          <Route path="/shop" element={<ShoppingLayout />}>
            <Route path="home" element={<ShoppingHome />} />
            <Route path="listing" element={<ShoppingListing />} />
            <Route path="search" element={<SearchProducts />} />
            <Route
              path="checkout"
              element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <ShoppingCheckout />
                </CheckAuth>
              }
            />
            <Route
              path="account"
              element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <ShoppingAccount />
                </CheckAuth>
              }
            />
            <Route path="paypal-return" element={<PaypalReturnPage />} />
            <Route path="payment-success" element={<PaymentSuccessPage />} />
            <Route path="/paypal-demo" element={<PaypalDemo />} />
          </Route>

          {/* Page not found route */}
          <Route path="*" element={<NotFound />} />
          <Route path="/unauth-page" element={<UnauthPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
