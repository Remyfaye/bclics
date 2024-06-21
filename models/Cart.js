import { Schema, model, models } from "mongoose";

const cartSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    image: { type: String },
    category: { type: String },
    vendor: { type: String },
    sizes: { type: Array },
  },
  { timestamps: true }
);

export const Cart = models?.cart || model("cart", cartSchema);
