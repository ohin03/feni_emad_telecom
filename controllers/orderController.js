// controllers/orderController.js
import orderModel from "../models/orderModel.js";

// Get user orders
export const getUserOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ user: req.user._id })
      .populate("products.product")
      .populate("user", "name email phone")
      .populate("comments.author", "name email")
      .populate("cancelled.by", "name email")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// Get all orders (Admin only)
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products.product")
      .populate("user", "name email phone")
      .populate("comments.author", "name email")
      .populate("cancelled.by", "name email")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// Update payment status (Admin only)
export const updatePaymentStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentStatus } = req.body;

    const order = await orderModel
      .findByIdAndUpdate(
        orderId,
        { paymentStatus },
        { new: true }
      )
      .populate("products.product")
      .populate("user", "name email phone");

    res.status(200).send({
      success: true,
      message: "Payment status updated successfully..",
      order,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// Update order status (Admin only)
export const updateOrderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    )
      .populate("products.product")
      .populate("user", "name email phone");

    res.status(200).send({
      success: true,
      message: "Order status updated successfully..",
      order,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// user cancel own order (allowed when not shipped/delivered)
export const cancelOrderByUserController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { reason } = req.body;
    const trimmed = String(reason || "").trim();
    if (!trimmed) return res.status(400).send({ success: false, message: "Cancellation reason is required" });

    const order = await orderModel.findOne({ _id: orderId, user: req.user._id });
    if (!order) return res.status(404).send({ success: false, message: "Order not found" });

    if (["Shipped", "Delivered"].includes(order.orderStatus)) {
      return res.status(400).send({ success: false, message: "Cannot cancel a shipped or delivered order" });
    }

    order.orderStatus = "Cancelled ";
    order.cancelled = { by: req.user._id, role: "user", reason: trimmed, at: new Date() };
    await order.save();

    res.status(200).send({ success: true, message: "Order cancelled", order });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// admin cancel any order
export const cancelOrderByAdminController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { reason } = req.body;
    const trimmed = String(reason || "").trim();
    if (!trimmed) return res.status(400).send({ success: false, message: "Cancellation reason is required" });

    const order = await orderModel.findById(orderId);
    if (!order) return res.status(404).send({ success: false, message: "Order not found" });

    if (["Delivered"].includes(order.orderStatus)) {
      return res.status(400).send({ success: false, message: "Cannot cancel a delivered order" });
    }

    order.orderStatus = "Cancelled";
    order.cancelled = { by: req.user._id, role: "admin", reason: trimmed, at: new Date() };
    await order.save();

    res.status(200).send({ success: true, message: "Order cancelled by admin", order });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// add a comment (user or admin)
export const addOrderCommentController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { text } = req.body;
    const trimmed = String(text || "").trim();
    if (!trimmed) return res.status(400).send({ success: false, message: "Comment text required" });

    const order = await orderModel.findById(orderId);
    if (!order) return res.status(404).send({ success: false, message: "Order not found" });

    const role = req.user && req.user._id ? (req.user.role === 1 ? "admin" : "user") : "user";

    order.comments = order.comments || [];
    order.comments.push({ text: trimmed, author: req.user._id, role, createdAt: new Date() });
    await order.save();

    const populated = await orderModel
      .findById(orderId)
      .populate("comments.author", "name email");

    res.status(200).send({ success: true, message: "Comment added", order: populated });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// Update shipping tracking (Admin only)
export const updateShippingTrackingController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { trackingNumber, courierService } = req.body;

    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { trackingNumber, courierService, orderStatus: "Shipped" },
      { new: true }
    )
      .populate("products.product")
      .populate("user", "name email phone");

    res.status(200).send({
      success: true,
      message: "Shipping tracking updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

export const placeOrderController = async (req, res) => {
  try {
    const {
      products,
      paymentMethod,
      trxId,
      address,
      totalAmount,
      comment,
    } = req.body;

    // Format products properly: [{product: productId, quantity: 1}]
    const formattedProducts = (products || []).map((item) => ({
      product: item._id || item.product,
      quantity: item.quantity || 1,
    }));

    const orderData = {
      user: req.user._id,
      products: formattedProducts,
      paymentMethod,
      paymentStatus: "Pending",
      address,
      totalAmount,
    };

    // Set transaction ID based on payment method
    if (paymentMethod === "BKASH") {
      orderData.bkashTrxId = trxId || null;
    } else if (paymentMethod === "NAGAD") {
      orderData.nagadTrxId = trxId || null;
    }

    // optional initial comment from user at order time
    if (comment && String(comment).trim().length > 0) {
      orderData.comments = [
        {
          text: String(comment).trim(),
          author: req.user._id,
          role: "user",
          createdAt: new Date(),
        },
      ];
    }

    const order = new orderModel(orderData);
    await order.save();

    res.status(201).send({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
