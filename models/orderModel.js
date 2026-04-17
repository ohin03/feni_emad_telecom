// models/orderModel.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        // reference Products model so populate works
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
        quantity: Number,
      },
    ],

    paymentMethod: {
      type: String,
      enum: ["COD", "BKASH", "NAGAD"],
      required: true,
    },

    paymentStatus: {
      type: String,
      default: "Pending", // Pending | Paid
    },

    bkashTrxId: {
      type: String,
    },
    nagadTrxId: {
      type: String,
    },

    orderStatus: {
      type: String,
      default: "Processing", // Processing , Shipped , Delivered , Cancelled
    },

    // If cancelled, capture reason and who cancelled
    cancelled: {
      by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      role: { type: String, enum: ["user", "admin"] },
      reason: { type: String },
      at: { type: Date },
    },

    // Shipping tracking 
    trackingNumber: {
      type: String,
    },
    courierService: {
      type: String,
    },

    // Comments/Notes: both user and admin can leave notes on order
    comments: [
      {
        text: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        role: { type: String, enum: ["user", "admin"], required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    totalAmount: Number,
    address: String,
  },
  { timestamps: true },
  
);

export default mongoose.model("orders", orderSchema);
