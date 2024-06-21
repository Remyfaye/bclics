const { Schema, models, model } = require("mongoose");

const vendorSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    bio: { type: String },
    location: { type: String },
  },
  { timestamps: true }
);

export const Vendor = models?.vendor || model("vendor", vendorSchema);
