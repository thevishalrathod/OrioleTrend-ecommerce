import { Router } from "express";
import {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  UpdateOrderStatus,
} from "../../controllers/admin/OrdersController.js";
const router = Router();

router.get("/get", getAllOrdersOfAllUsers);
router.get("/details/:id", getOrderDetailsForAdmin);
router.put("/update/:id", UpdateOrderStatus);

export default router;
