import ProductReview from "../../models/Review.js";
import Order from "../../models/Order.js";
import Product from "../../models/Product.js";

/**
 * Add Product Review
 */
export const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;

    // console.log(req.body);   

    // console.log("ProductId: ", productId);
    // console.log("UserID: ", userId);
    // console.log("UserName: ", userName);
    // console.log("ReviewMessage: ", reviewMessage);
    // console.log("ReviewValue: ", reviewValue);

    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: "confirmed",
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You need to purchase product to review it.",
      });
    }

    const checkExistingReview = await ProductReview.findOne({
      productId,
      userId,
    });

    if (checkExistingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewd this product!",
      });
    }

    const newReview = new ProductReview({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });

    await newReview.save();

    const reviews = await ProductReview.find({ productId });
    const totalReviewsLength = reviews.length;
    const averageReview =
      reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      totalReviewsLength;
 
    await Product.findByIdAndUpdate(productId, { averageReview });

    res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (error) {
    console.log(
      "ERROR IN addProductReview - ProductReviewController.js: ",
      error
    );
    res.status(500).json({
      success: false,
      message: `Some error occured: ${error.message}`,
    });
  }
};

/**
 * Get Product Review
 */
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await ProductReview.find({ productId });

    if (!reviews) {
      return res.status(404).json({
        success: false,
        message: "No reviews found for this product!",
      });
    }

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.log(
      "ERROR IN getProductReviews - ProductReviewController.js: ",
      error
    );
    res.status(500).json({
      success: false,
      message: `Some error occured: ${error.message}`,
    });
  }
};
