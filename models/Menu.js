import { Schema, model, models } from "mongoose";

const menuSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    location: { type: String },
    image: { type: String },
    category: { type: String },
    vendor: { type: String },
    sizes: { type: Array },
  },
  { timestamps: true }
);

export const Menu = models?.menu || model("menu", menuSchema);
