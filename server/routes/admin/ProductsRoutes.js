import { Router } from "express";
const router = Router();
import {
  addProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
  handleImageUpload,
} from "../../controllers/admin/ProductsController.js";
import { upload } from "../../helpers/cloudinary.js";

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get", fetchAllProducts);

export default router;
