import mongoose from "mongoose";
import { Vendor } from "../../../models/Vendor";

export async function POST(req) {
  mongoose.connect(process.env.MONGODB_URL);

  const data = await req.json();
  await Vendor.create(data);

  return Response.json(true);
}

export async function GET(req) {
  mongoose.connect(process.env.MONGODB_URL);

  return Response.json(await Vendor.find());
}
