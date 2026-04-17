import express from "express";
import { requireSignin, isAdmin } from "../middlewares/authMiddleware.js";
import {
  placeOrderController,
  getUserOrdersController,
  getAllOrdersController,
  updateOrderStatusController,
  updatePaymentStatusController,
  updateShippingTrackingController,
  cancelOrderByUserController,
  cancelOrderByAdminController,
  addOrderCommentController,
} from "../controllers/orderController.js";

const router = express.Router();

// Place order
router.post("/place-order", requireSignin, placeOrderController);

// Get user orders
router.get("/user-orders", requireSignin, getUserOrdersController);

// Get all orders (Admin only)
router.get("/all-orders", requireSignin, isAdmin, getAllOrdersController);

// Update payment status - Admin only

router.put(
  "/payment-status/:orderId",
  requireSignin,
  isAdmin,
  updatePaymentStatusController
);

// Update order status - Admin only
router.put("/order-status/:orderId", requireSignin, isAdmin, updateOrderStatusController);

// Update shipping tracking - Admin only
router.put("/shipping-tracking/:orderId", requireSignin, isAdmin, updateShippingTrackingController);

// Cancel order (user)
router.put("/cancel/:orderId", requireSignin, cancelOrderByUserController);

// Cancel order (admin)
router.put("/admin/cancel/:orderId", requireSignin, isAdmin, cancelOrderByAdminController);

// Add order comment (user or admin)
router.post("/comment/:orderId", requireSignin, addOrderCommentController);

export default router;
