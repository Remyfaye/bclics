import { Schema, model, models } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const Category = models?.category || model("category", categorySchema);
