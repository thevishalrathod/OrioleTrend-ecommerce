import { Router } from "express";
import { searchProducts } from "../../controllers/shop/SearchController.js";
const router = Router();

router.get("/:keyword", searchProducts);

export default router;
