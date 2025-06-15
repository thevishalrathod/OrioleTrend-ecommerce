import { Router } from "express";
import * as UserController from "../../controllers/auth/AuthController.js";

const router = Router();

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post("/logout", UserController.logoutUser);
router.get("/check-auth", UserController.authMiddleware, (req, res) => {
  const user = req.user;

  // console.log("User: ", user);

  res.status(200).json({
    success: true,
    message: "Authenticated User",
    user,
  });
});

export default router;
