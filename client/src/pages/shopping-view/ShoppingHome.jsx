import ShoppingProductTile from "@/components/shopping-view/ShoppingProductTile";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/product-slice/ShoppingProductsSlice";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import kid from "../../assets/images/categories/kid.jpeg";
import men from "../../assets/images/categories/men.jpeg";
import shoe from "../../assets/images/categories/shoe.jpeg";
import women from "../../assets/images/categories/women.jpeg";
import watch from "../../assets/images/categories/wtach.jpeg";
import adidas from "../../assets/images/temp/adidas.png";
import hm from "../../assets/images/temp/hm.png";
import levi from "../../assets/images/temp/levi.png";
import nike from "../../assets/images/temp/nike.png";
import puma from "../../assets/images/temp/puma.png";
import zara from "../../assets/images/temp/zara.png";
// import { fetchAllProducts } from "@/store/admin/products-slice/AdminProductsSlice";
import {
  addToCart,
  fetchCartItems,
} from "@/store/shop/cart-slice/ShoppingCartSlice";
import { toast } from "sonner";
import ProductDetailsDialog from "@/components/shopping-view/ProductDetailsDialog";
import { getFeatureImages } from "@/store/common-slice";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: men },
  { id: "women", label: "Women", icon: women },
  { id: "kids", label: "Kids", icon: kid },
  { id: "accessories", label: "Accessories", icon: watch },
  { id: "footwear", label: "Footwear", icon: shoe },
];

const brandsWithIcons = [
  { id: "nike", label: "Nike", icon: nike },
  { id: "adidas", label: "Adidas", icon: adidas },
  { id: "puma", label: "Puma", icon: puma },
  { id: "levi", label: "Levi's", icon: levi },
  { id: "zara", label: "Zara", icon: zara },
  { id: "h&m", label: "H&M", icon: hm },
];

const ShoppingHome = () => {
  // const slides = [bannerOne, bannerTwo, bannerThree];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [currentSlide, setCurrentSlide] = useState(0);

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");

    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    // console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddToCart(getCurrentProductId) {
    if (!user) {
      toast("Please login to add items to cart");
      navigate("/auth/login");
      return;
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast("Product added to cart!");
      }
    });
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log("Product list: ", productList);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[550px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide.image}
                key={index}
                className={` ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
                alt=""
              />
            ))
          : null}

        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
        >
          <ChevronLeftIcon className="w-4 h-4 " />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
        >
          <ChevronRightIcon className="w-4 h-4 " />
        </Button>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  {/* <categoryItem.icon className="w-12 h-12 mb-4 text-primary" /> */}
                  <img
                    src={categoryItem.icon}
                    alt=""
                    width={150}
                    height={150}
                    className="rounded-lg mb-4 object-fill flex items-center justify-center"
                  />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by popular brands
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcons.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow bg-white"
              >
                <CardContent className="flex flex-col items-center justify-center p-6 bg-white">
                  <img
                    src={brandItem.icon}
                    alt=""
                    width={50}
                    height={50}
                    className="rounded-lg mb-4 object-fill flex items-center justify-center"
                  />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddToCart={handleAddToCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default ShoppingHome;
