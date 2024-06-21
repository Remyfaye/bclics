import { Schema, model, models } from "mongoose";

const orderSchema = new Schema(
  {
    totalPrice: { type: String, required: true },
    cart: { type: Array },
    buyerId: { type: String },
  },
  { timestamps: true }
);

export const Order = models?.order || model("order", orderSchema);
