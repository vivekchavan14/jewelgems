import express from "express";
import { addToCart, getCartProducts, removeAllFromCart, updateQuantity } from "../controllers/cart.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { getUserWithCart } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", protectRoute, getCartProducts);
router.post("/", protectRoute, addToCart);
router.delete("/", protectRoute, removeAllFromCart);
router.put("/:id", protectRoute, updateQuantity);
router.get("/orders/:userId",protectRoute,adminRoute,getUserWithCart)

export default router;
