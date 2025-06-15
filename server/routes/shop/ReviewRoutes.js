import { Router } from "express";
import {
  addProductReview,
  getProductReviews,
} from "../../controllers/shop/ProductReviewController.js";
const router = Router();

router.post("/add", addProductReview);
router.get("/:productId", getProductReviews);

export default router;
